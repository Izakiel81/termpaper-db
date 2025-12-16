import RoleService from "./RoleService.js";

class RoleController {
  static async getAllRoles(req, res, next) {
    try {
      const result = await RoleService.getAllRoles();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getRoleById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Role ID is required" });
      }

      const result = await RoleService.getRoleById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createRole(req, res, next) {
    try {
      const { roleName } = req.body;

      if (!roleName) {
        return res.status(400).json({ error: "roleName is required" });
      }

      const result = await RoleService.createRole(roleName);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateRole(req, res, next) {
    try {
      const { id } = req.params;
      const { roleName } = req.body;

      if (!id || !roleName) {
        return res
          .status(400)
          .json({ error: "id and roleName are required" });
      }

      const result = await RoleService.updateRole(id, roleName);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteRole(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Role ID is required" });
      }

      const result = await RoleService.deleteRole(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default RoleController;

