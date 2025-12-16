import pool from "../../lib/db.js";
class UserService {
  async getUsers() {
    const users = await pool.query(`SELECT * FROM users`);

    return users.rows;
  }

  async getUserById(id) {
    const user = await pool.query(`SELECT * FROM users WHERE user_id=$1`, [id]);

    return user.rows;
  }

  // Functions

  async getUserRole(user_id) {
    const userRole = await pool.query(
      `SELECT * FROM get_user_role($1::integer)`,
      [user_id],
    );

    return userRole.rows;
  }

  // Procedures

  async addUser(username, email, password) {
    const newUser = await pool.query(
      `CALL proc_create_user($1::character varying, $2::character varying, $3::character varying)`,
      [username, email, password],
    );

    return newUser.rows[0].new_user_id;
  }
  async updateUser(id, username, email, password) {
    await pool.query(
      `CALL proc_update_user($1::integer, $2::character varying, $3::character varying, $4::character varying)`,
      [id, username, email, password],
    );
  }
  async deleteUser(id) {
    await pool.query(`CALL proc_delete_user($1::integer)`, [id]);
  }
}
export default new UserService();
