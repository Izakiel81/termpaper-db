import UserModel from "../../lib/models/UserModel.js";

class UserService {
  static async getAllUsers() {
    try {
      const users = await UserModel.findAll();
      return { users };
    } catch (error) {
      console.error("Service Error in getAllUsers:", error.message);
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return { user };
    } catch (error) {
      console.error("Service Error in getUserById:", error.message);
      throw error;
    }
  }

  static async createUser(username, email, password) {
    try {
      const userId = await UserModel.create(username, email, password);
      return { userId, message: "User created successfully" };
    } catch (error) {
      console.error("Service Error in createUser:", error.message);
      throw error;
    }
  }

  static async updateUser(userId, username, email, password) {
    try {
      await UserModel.update(userId, username, email, password);
      return { message: "User updated successfully" };
    } catch (error) {
      console.error("Service Error in updateUser:", error.message);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      await UserModel.delete(userId);
      return { message: `User ${userId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteUser:", error.message);
      throw error;
    }
  }

  static async resetPassword(userId, newPassword) {
    try {
      await UserModel.reset_password(userId, newPassword);
      return { message: "Password reset successfully" };
    } catch (error) {
      console.error("Service Error in resetPassword:", error.message);
      throw error;
    }
  }

  static async getUserData(userId) {
    try {
      const userData = await UserModel.getUserData(userId);
      return { userData };
    } catch (error) {
      console.error("Service Error in getUserData:", error.message);
      throw error;
    }
  }
}

export default UserService;

