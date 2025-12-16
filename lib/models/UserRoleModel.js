import pool from "../db.js";

class UserRoleModel {
  static async findRolesByUserId(userId) {
    const query = `SELECT role_id FROM userrole WHERE user_id = $1`;
    const values = [userId];
    try {
      const result = await pool(query, values);
      return result.rows;
    } catch (error) {
      console.error(
        "Database Error in UserRoleModel.findRolesByUserId:",
        error,
      );
      throw new Error("Failed to retrieve user roles.");
    }
  }

  static async assignRole(userId, roleId) {
    const query = `
      INSERT INTO userrole (user_id, role_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, role_id) DO NOTHING
      RETURNING *`;
    const values = [userId, roleId];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Database Error in UserRoleModel.assignRole:", error);
      if (error.code === "23503") {
        // Foreign Key Violation
        throw new Error(`Invalid User ID or Role ID provided for assignment.`);
      }
      throw new Error("Failed to assign role to user.");
    }
  }

  static async revokeRole(userId, roleId) {
    const query = `DELETE FROM userrole WHERE user_id = $1 AND role_id = $2`;
    const values = [userId, roleId];

    try {
      await pool(query, values);
      return { message: `Role ${roleId} revoked from User ${userId}.` };
    } catch (error) {
      console.error("Database Error in UserRoleModel.revokeRole:", error);
      throw new Error("Failed to revoke role.");
    }
  }
}

export default UserRoleModel;
