import pool from "../../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ACCESS_TOKEN_EXPIRES = "1h";
const REFRESH_TOKEN_EXPIRES = "7d";

class AuthService {
  static async login(username, email, password) {
    // Accept either username or email - require at least one
    if (!username && !email) throw new Error("username or email required");
    if (!password) throw new Error("password required");

    // Use DB-side login function to validate credentials (crypt-based).
    // Prefer calling proc_login_user directly, falling back to fn_login_user if available.
    const loginIdent = username || email;
    let dbUser = null;
    try {
      // Try direct function (you confirmed proc_login_user exists)
      const dbRes = await pool.query('SELECT * FROM proc_login_user($1, $2)', [loginIdent, password]);
      if (dbRes.rowCount === 0) throw new Error('Invalid credentials');
      dbUser = dbRes.rows[0];
    } catch (err) {
      // If direct call failed because proc isn't callable, try wrapper fn_login_user
      if (err.code === '42883' || err.message?.includes('does not exist')) {
        const dbRes2 = await pool.query('SELECT * FROM proc_login_user($1, $2)', [loginIdent, password]);
        if (dbRes2.rowCount === 0) throw new Error('Invalid credentials');
        dbUser = dbRes2.rows[0];
      } else {
        // rethrow DB auth-related errors (like invalid credentials) to be handled by caller
        throw err;
      }
    }

    // fetch roles if available
    let roles = [];
    try {
      const rolesResult = await pool.query(`SELECT role_name FROM user_roles WHERE user_id = $1`, [dbUser.user_id]);
      roles = rolesResult.rows ? rolesResult.rows.map((r) => r.role_name) : [];
    } catch (e) {
      roles = [];
    }

    const payload = {
      userId: dbUser.user_id,
      username: dbUser.username,
      email: dbUser.email,
      roles,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
    const refreshToken = jwt.sign(
      { userId: payload.userId },
      process.env.REFRESH_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      },
    );

    return {
      accessToken,
      refreshToken,
      roles,
      user: { id: payload.userId, username: payload.username },
    };
  }

  static async register(username, email, password) {
    if (!username) throw new Error('username required');
    if (!email) throw new Error('email required');
    if (!password) throw new Error('password required');

    try {
      // Call server-side wrapper that executes proc_register_user as guest_user
      const res = await pool.query('SELECT fn_register_user($1, $2, $3) AS new_id', [username, email, password]);
      if (res.rowCount === 0) throw new Error('Registration failed');
      const newId = res.rows[0].new_id;

      // Build token payload and return tokens (auto-login)
      const payload = { userId: newId, username, email, roles: ['student'] };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
      const refreshToken = jwt.sign({ userId: payload.userId }, process.env.REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });

      return { accessToken, refreshToken, roles: payload.roles, user: { id: payload.userId, username } };
    } catch (error) {
      // Propagate DB errors (unique violations etc.) to controller
      throw error;
    }
  }

  static refreshToken(oldToken) {
    try {
      const payload = jwt.verify(oldToken, process.env.REFRESH_SECRET);
      if (!payload || !payload.userId)
        throw new Error("Invalid refresh token payload");

      const accessToken = jwt.sign(
        { userId: payload.userId },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
      );
      return accessToken;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}

export default AuthService;
