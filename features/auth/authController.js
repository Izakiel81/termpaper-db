import authService from "./authService";
class AuthController {
  async login(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const tokens = await authService.login(username, email, password);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken: oldToken } = req.body;
      const newAccessToken = authService.refreshToken(oldToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default new AuthController();
