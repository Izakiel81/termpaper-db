import authService from "./authService.js";
class AuthController {
  static async login(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error:
            "Missing JSON body. Ensure Content-Type: application/json and a valid JSON payload are sent.",
        });
      }

      const { username, email, password, role } = req.body || {};
      if (!username && !email)
        return res.status(400).json({ error: "username or email required" });
      if (!password)
        return res.status(400).json({ error: "password required" });

      const tokens = await authService.login(username, email, password, role);
      res.json(tokens);
    } catch (error) {
      if (error.message && error.message.toLowerCase().includes("required")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(401).json({ error: error.message });
    }
  }

  static async refresh(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error:
            "Missing JSON body. Ensure Content-Type: application/json and a valid JSON payload are sent.",
        });
      }
      const { refreshToken: oldToken } = req.body || {};
      if (!oldToken) {
        console.warn("[auth] refresh called without token from", req.ip);
        return res.status(401).json({ error: "Missing refresh token" });
      }
      const newAccessToken = await authService.refreshToken(oldToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.warn("[auth] refresh failed:", error.message);
      res.status(401).json({ error: error.message });
    }
  }

  static async me(req, res) {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const id = req.user.userId ?? req.user.id ?? req.user.sub ?? null;
    const role = req.user.role ?? null;
    if (!id) return res.status(400).json({ error: "User id missing in token" });
    if (!role)
      return res.status(400).json({ error: "User role missing in token" });
    res.json({ user: { id, role } });
  }

  static async register(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error:
            "Missing JSON body. Ensure Content-Type: application/json and a valid JSON payload are sent.",
        });
      }
      const { username, email, password, role } = req.body || {};
      if (!username)
        return res.status(400).json({ error: "username required" });
      if (!email) return res.status(400).json({ error: "email required" });
      if (!password)
        return res.status(400).json({ error: "password required" });
      if (!role) return res.status(400).json({ error: "role is required" });

      const tokens = await authService.register(
        username,
        email,
        password,
        role,
      );
      res.status(201).json(tokens);
    } catch (error) {
      if (error.code === "23505") {
        // unique_violation
        return res.status(409).json({ error: error.message });
      }
      if (error.message && error.message.toLowerCase().includes("required")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController;
