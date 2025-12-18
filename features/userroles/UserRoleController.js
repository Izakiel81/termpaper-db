import UserRoleService from "./UserRoleService.js";

class UserRoleController {
  static async getRolesByUserId(req, res, next) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const roles = await UserRoleService.getRolesByUserId(userId);
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async assignRole(req, res, next) {
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        return res
          .status(400)
          .json({ error: "userId and roleId are required" });
      }

      const result = await UserRoleService.assignRole(userId, roleId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async removeRoleFromUser(req, res, next) {
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        return res
          .status(400)
          .json({ error: "userId and roleId are required" });
      }

      const result = await UserRoleService.removeRoleFromUser(userId, roleId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserRole(req, res, next) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const role = await UserRoleService.getUserRole(userId);
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UserRoleController;

