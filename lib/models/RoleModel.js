import pool from "../db.js";

class RolesModel {
  static async findAll() {
    const query = `SELECT * FROM roles`;
    try {
      const result = await pool(query);
      return result.rows || null;
    } catch (error) {
      console.error("DB Error in RolesModel.findAll:", error);
      throw new Error("Failed to retrieve role data.");
    }
  }
  static async findById(id) {
    const query = `SELECT * FROM roles WHERE role_id = $1`;
    const values = [id];
    try {
      const result = await pool(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("DB Error in RolesModel.findById:", error);
      throw new Error("Failed to retrieve role data.");
    }
  }

  static async create(name) {
    const query = `INSERT INTO roles (role_name) VALUES ($1) RETURNING *`;
    const values = [name];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("DB Error in RolesModel.create:", error);
      if (error.code === "23505") {
        // Unique Violation
        throw new Error(`Role name '${name}' already exists.`);
      }
      throw new Error("Failed to create new role.");
    }
  }

  static async update(id, name) {
    const query = `UPDATE roles SET role_name = $2 WHERE role_id = $1 RETURNING *`;
    const values = [id, name];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("DB Error in RolesModel.update:", error);
      if (error.code === "23505") {
        throw new Error(`Role name '${name}' already exists.`);
      }
      throw new Error("Failed to update role name.");
    }
  }

  static async delete(id) {
    const query = `DELETE FROM roles WHERE role_id = $1`;
    const values = [id];

    try {
      const result = await pool(query, values);
      if (result.rowCount === 0) {
        return { message: `Role ${id} not found.` };
      }
      return { message: `Role ${id} deleted successfully.` };
    } catch (error) {
      console.error("DB Error in RolesModel.delete:", error);
      if (error.code === "23503") {
        throw new Error(
          `Cannot delete role ${id} because it is assigned to users.`,
        );
      }
      throw new Error("Failed to delete role.");
    }
  }
}

export default RolesModel;
