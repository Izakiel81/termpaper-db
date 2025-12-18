import authService from "./authService.js";
class AuthController {
  static async login(req, res, next) {
    try {
      // Guard: req.body may be undefined if Content-Type header is missing or body is invalid JSON
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Missing JSON body. Ensure Content-Type: application/json and a valid JSON payload are sent.' });
      }

      const { username, email, password } = req.body || {};
      if (!username && !email) return res.status(400).json({ error: 'username or email required' });
      if (!password) return res.status(400).json({ error: 'password required' });

      const tokens = await authService.login(username, email, password);
      res.json(tokens);
    } catch (error) {
      // If input validation triggered, pass its status
      if (error.message && error.message.toLowerCase().includes('required')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(401).json({ error: error.message });
    }
  }

  static async refresh(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Missing JSON body. Ensure Content-Type: application/json and a valid JSON payload are sent.' });
      }
      const { refreshToken: oldToken } = req.body || {};
      if (!oldToken) {
        console.warn('[auth] refresh called without token from', req.ip);
        return res.status(401).json({ error: 'Missing refresh token' });
      }
      // authService.refreshToken is synchronous but keep await in case it becomes async
      const newAccessToken = await authService.refreshToken(oldToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.warn('[auth] refresh failed:', error.message);
      res.status(401).json({ error: error.message });
    }
  }

  static async me(req, res) {
    // authenticateJWT attaches req.user
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    // return only the user id (normalize common claim names)
    const id = req.user.userId ?? req.user.id ?? req.user.sub ?? null;
    if (!id) return res.status(400).json({ error: 'User id missing in token' });
    res.json({ user: { id } });
  }
}

export default AuthController;
