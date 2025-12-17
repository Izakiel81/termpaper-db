import pool from "../../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ACCESS_TOKEN_EXPIRES = "1h";
const REFRESH_TOKEN_EXPIRES = "7d";

class AuthService {
  static async login(username, email, password) {
    // Accept either username or email - require at least one
    if (!username && !email) throw new Error('username or email required');
    if (!password) throw new Error('password required');

    // Build query dynamically so we don't compare against NULL accidentally
    let query = "SELECT user_id, username, email, password FROM users WHERE ";
    const params = [];
    if (username && email) {
      query += "username = $1 OR email = $2";
      params.push(username, email);
    } else if (username) {
      query += "username = $1";
      params.push(username);
    } else {
      query += "email = $1";
      params.push(email);
    }
    const result = await pool.query(query, params);
    console.log(result);

    if (result.rowCount === 0) throw new Error("Invalid credentials");

    const user = result.rows[0];
    // Ensure password exists in DB
    if (!user.password) throw new Error('Invalid credentials');
    console.log('passed user lookup');

    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, user.password);
    } catch (e) {
      // hide bcrypt internal errors
      throw new Error('Invalid credentials');
    }
    console.log('passed user lookup2');

    if (!isValid) throw new Error("Invalid credentials");
    console.log('passed user lookup3');

    // try to get roles if your schema supports it (rows may be empty)
    let roles = [];
    try {
      const rolesResult = await pool.query(
        `SELECT role_name FROM user_roles WHERE user_id = $1`,
        [result.rows[0].user_id],
      );
      roles = rolesResult.rows ? rolesResult.rows.map(r => r.role_name) : [];
    } catch (e) {
      // ignore missing roles table
      roles = [];
    }

    const payload = { userId: result.rows[0].user_id, username: result.rows[0].username, email: result.rows[0].email, roles };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
    const refreshToken = jwt.sign({ userId: payload.userId }, process.env.REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES,
    });

    return { accessToken, refreshToken, roles, user: { id: payload.userId, username: payload.username } };
  }

  static refreshToken(oldToken) {
    try {
      const payload = jwt.verify(oldToken, process.env.REFRESH_SECRET);
      if (!payload || !payload.userId) throw new Error('Invalid refresh token payload');

      const accessToken = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
      return accessToken;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}

export default AuthService;
