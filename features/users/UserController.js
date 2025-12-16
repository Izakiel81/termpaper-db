import UserService from "./UserService.js";

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await UserService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await UserService.getUserById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "username, email, and password are required" });
      }

      const result = await UserService.createUser(username, email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      if (!id || !username || !email || !password) {
        return res.status(400).json({
          error: "id, username, email, and password are required",
        });
      }

      const result = await UserService.updateUser(id, username, email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await UserService.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { userId, newPassword } = req.body;

      if (!userId || !newPassword) {
        return res
          .status(400)
          .json({ error: "userId and newPassword are required" });
      }

      const result = await UserService.resetPassword(userId, newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;

