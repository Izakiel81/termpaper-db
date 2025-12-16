import pool from "../db.js";

class UserModel {
  static async findAll() {
    const query = `SELECT * FROM users`;

    try {
      const users = await pool(query);

      if (users.rows && users.rows.length > 0) {
        return users.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding users`, error);
      throw new Error("Could not retrieve users data due to a database error.");
    }
  }
  static async findById(id) {
    const query = `SELECT * FROM users WHERE user_id=$1`;
    const values = [id];

    try {
      const user = await pool(query, values);
      if (user.rows && user.rows.length > 0) {
        return user.rows[0];
      }
      return null;
    } catch (error) {
      console.error(`Database error finding user ${id}:`, error);
      throw new Error("Could not retrieve user data due to a database error.");
    }
  }
  static async create(username, email, password) {
    const query = `CALL proc_create_user($1::character varying, $2::character varying, $3::character varying)`;
    const values = [username, email, password];
    try {
      const createdUser = await pool(query, values);
      if (createdUser.rows && createdUser.rows.length > 0) {
        return createdUser.rows.new_user_id;
      }
      return null;
    } catch (error) {
      console.error(
        `Database error createing user ${username}\t ${email}\t ${password}\t:`,
        error,
      );
      throw new Error("Could not create a user data due to a database error.");
    }
  }
  static async update(id, username, email, password) {
    const query = `CALL proc_update_user($1::integer, $2::character varying, $3::character varying, $4::character varying)`;
    const values = [id, username, email, password];

    try {
      await pool(query, values);
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
      await pool(query, values);
    } catch (error) {
      console.error(`Database error deleting the user ${id}\t:`, error);
      throw new Error(
        "Could not delete the user data due to a database error.",
      );
    }
  }
}

export default UserModel;
