import pool from "../../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ACCESS_TOKEN_EXPIRES = "1h";
const REFRESH_TOKEN_EXPIRES = "7d";

class AuthService {
  async login(username, email, password) {
    const result = await pool.query(
      "SELECT username, password FROM users WHERE username = $1 OR email = $2",
      [username, email],
    );

    if (result.rowCount === 0) throw new Error("Invalid credentials");

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const rolesResult = await pool.query(
      `
      SELECT r.rolname AS role
      FROM pg_roles r
      JOIN pg_auth_members m ON r.oid = m.roleid
      JOIN pg_user u ON u.usesysid = m.member
      WHERE u.username = $1
      `,
      [username],
    );

    const roles = rolesResult.map((r) => r.role);

    const accessToken = jwt.sign({ username, roles }, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
    const refreshToken = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES,
    });

    return { accessToken, refreshToken, roles };
  }

  refreshToken(oldToken) {
    try {
      const payload = jwt.verify(oldToken, process.env.REFRESH_SECRET);

      const accessToken = jwt.sign(
        { username: payload.username },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
      );
      return accessToken;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}

export default new AuthService();
