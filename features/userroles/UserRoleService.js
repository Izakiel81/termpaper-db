import UserRoleModel from "../../lib/models/UserRoleModel.js";

class UserRoleService {
  static async getRolesByUserId(userId) {
    try {
      const roles = await UserRoleModel.findRolesByUserId(userId);
      return { roles };
    } catch (error) {
      console.error("Service Error in getRolesByUserId:", error.message);
      throw error;
    }
  }

  static async assignRole(userId, roleId) {
    try {
      const result = await UserRoleModel.assignRole(userId, roleId);
      return { message: `Role ${roleId} assigned to User ${userId}.`, result };
    } catch (error) {
      console.error("Service Error in assignRole:", error.message);
      throw error;
    }
  }

  static async removeRoleFromUser(userId, roleId) {
    try {
      const result = await UserRoleModel.removeRoleFromUser(userId, roleId);
      return result;
    } catch (error) {
      console.error("Service Error in removeRoleFromUser:", error.message);
      throw error;
    }
  }
}

export default UserRoleService;

