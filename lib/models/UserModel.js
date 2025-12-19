import pool from "../db.js";
import hashPassword from "../utils/hashPassword.js";

class UserModel {
  static async findAll() {
    const query = `SELECT * FROM users`;

    try {
      const result = await pool.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding users`, error);
      throw new Error("Could not retrieve users data due to a database error.");
    }
  }
  static async findById(id) {
    const query = `SELECT * FROM users WHERE user_id=$1`;
    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding user ${id}:`, error);
      throw new Error("Could not retrieve user data due to a database error.");
    }
  }

  static async create(username, email, password) {
    const query = `CALL proc_create_user($1::character varying, $2::character varying, $3::character varying, NULL)`;
    const hashedPassword = await hashPassword(password);
    const values = [username, email, hashedPassword];
    try {
      const result = await pool.query(query, values);
      // stored procedure might not return rows; return null if not available
      return result.rows && result.rows.length > 0
        ? result.rows[0].new_user_id || null
        : null;
    } catch (error) {
      console.error(
        `Database error createing user ${username}\t ${email}\t ${password}\t:`,
        error,
      );
      throw new Error("Could not create a user data due to a database error.");
    }
  }
  static async update(id, username, email, password) {
    const query = `CALL proc_update_user($1::integer, $2::character varying, $3::character varying, $4::character varying, NULL)`;
    const hashedPassword = await hashPassword(password);
    const values = [id, username, email, hashedPassword];

    try {
      await pool.query(query, values);
    } catch (error) {
      console.error(
        `Database error updating the user ${id}\t ${username}\t ${email}\t ${password}\t:`,
        error,
      );
      throw new Error(
        "Could not update the user data due to a database error.",
      );
    }
  }
  static async delete(id) {
    const query = `CALL proc_delete_user($1::integer)`;
    const values = [id];

    try {
      await pool.query(query, values);
    } catch (error) {
      console.error(`Database error deleting the user ${id}\t:`, error);
      throw new Error(
        "Could not delete the user data due to a database error.",
      );
    }
  }

  static async reset_password(user_id, p_new_password) {
    const query = `CALL proc_reset_user_password($1::integer, $2::character varying)`;
    const values = [user_id, p_new_password];
    try {
      await pool.query(query, values);
    } catch (error) {
      console.error(`Database error chabging passwor:`, error);
      throw new Error("Could not change password due to a database error.");
    }
  }

  static async getUserData(user_id) {
    const query = `SELECT * FROM get_data_by_user_id($1::integer)`;
    const values = [user_id];
    try {
      const userData = await pool.query(query, values);
      if (userData.rows && userData.rows.length > 0) {
        return userData.rows[0];
      }
      return null;
    } catch (error) {
      console.error(`Database error getting user data for ${user_id}:`, error);
      throw new Error("Could not retrieve user data due to a database error.");
    }
  }
}

export default UserModel;
