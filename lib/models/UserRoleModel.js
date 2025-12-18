import pool from "../db.js";

class UserRoleModel {
  static async findRolesByUserId(userId) {
    const query = `SELECT role_id FROM userrole WHERE user_id = $1`;
    const values = [userId];
    try {
      const result = await pool.query(query, values);
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
    const query = `CALL proc_assign_role_to_user($1::integer, $2::integer)`;
    const values = [userId, roleId];

    try {
      const result = await pool.query(query, values);
      return result.rows && result.rows[0] ? result.rows[0] : { message: 'Role assigned' };
    } catch (error) {
      console.error("Database Error in UserRoleModel.assignRole:", error);
      if (error.code === "23503") {
        // Foreign Key Violation
        throw new Error(`Invalid User ID or Role ID provided for assignment.`);
      }
      throw new Error("Failed to assign role to user.");
    }
  }

  static async removeRoleFromUser(userId, roleId) {
    const query = `CALL proc_remove_role_from_user($1::integer, $2::integer)`;
    const values = [userId, roleId];

    try {
      await pool.query(query, values);
      return { message: `Role ${roleId} revoked from User ${userId}.` };
    } catch (error) {
      console.error("Database Error in UserRoleModel.revokeRole:", error);
      throw new Error("Failed to revoke role.");
    }
  }

  static async getUserRole(userId) {
    const query = `SELECT * FROM get_user_role($1::integer)`;
    const values = [userId];
    try {
      const result = await pool.query(query, values);
      return result.rows && result.rows[0] ? result.rows[0] : null;
    } catch (error) {
      console.error("Database Error in UserRoleModel.getUserRole:", error);
      throw new Error("Failed to retrieve user role.");
    }
  }
}

export default UserRoleModel;
