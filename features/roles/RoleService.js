import RolesModel from "../../lib/models/RoleModel.js";

class RoleService {
  static async getAllRoles() {
    try {
      const roles = await RolesModel.findAll();
      return { roles };
    } catch (error) {
      console.error("Service Error in getAllRoles:", error.message);
      throw error;
    }
  }

  static async getRoleById(roleId) {
    try {
      const role = await RolesModel.findById(roleId);
      if (!role) {
        throw new Error(`Role with ID ${roleId} not found`);
      }
      return { role };
    } catch (error) {
      console.error("Service Error in getRoleById:", error.message);
      throw error;
    }
  }

  static async createRole(roleName) {
    try {
      const role = await RolesModel.create(roleName);
      return { role, message: "Role created successfully" };
    } catch (error) {
      console.error("Service Error in createRole:", error.message);
      throw error;
    }
  }

  static async updateRole(roleId, roleName) {
    try {
      const role = await RolesModel.update(roleId, roleName);
      return { role, message: "Role updated successfully" };
    } catch (error) {
      console.error("Service Error in updateRole:", error.message);
      throw error;
    }
  }

  static async deleteRole(roleId) {
    try {
      const result = await RolesModel.delete(roleId);
      return result;
    } catch (error) {
      console.error("Service Error in deleteRole:", error.message);
      throw error;
    }
  }
}

export default RoleService;

