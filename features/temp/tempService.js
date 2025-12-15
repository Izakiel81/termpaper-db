import pool from "../../lib/db.js";
import tempUtils from "./tempUtils.js";
class TempService {
  async getUsers() {
    const users = await pool.query(`SELECT * FROM users`);

    return users;
  }

  async createDataSet() {
    const users = await pool.query(`SELECT * FROM parents`);

    users.rows.forEach((u) => {
      u.parent_name = tempUtils.tranlateToLatin(u.parent_name);
      u.parent_surname = tempUtils.tranlateToLatin(u.parent_surname);
      u.parent_patronym = tempUtils.tranlateToLatin(u.parent_patronym);
    });

    Promise.all([
      users.rows.map(async (u) => {
        let password = await tempUtils.hashPassword(
          tempUtils.generatePassword(),
        );
        await pool.query(
          `CALL proc_create_user($1::character varying, $2::character varying, $3::character varying, null)`,
          [
            u.parent_surname + u.parent_name + u.parent_patronym,
            u.parent_surname + u.parent_name + u.parent_patronym + "@school.ua",
            password,
          ],
        );
      }),
    ]);

    /*const new_users = await Promise.all(
      users.rows.map(async (u) => {
        return {
          name: u.parent_surname + u.parent_name,
          email: u.parent_surname + u.parent_name + "@shool.ua",
          password: await tempUtils.hashPassword(tempUtils.generatePassword()),
        };
      }),
    );*/
    const result = await pool.query(`SELECT * FROM users`);

    return result.rows;
  }

  async assignRoles(startFrom = 0, roleId) {
    const users = await pool.query(`SELECT * FROM users`);

    Promise.all(
      users.rows.slice(startFrom).map((u) => {
        return pool.query(
          `CALL proc_assign_role_to_user($1::integer, $2::integer)`,
          [u.user_id, roleId],
        );
      }),
    );
    const result = await pool.query(`SELECT * FROM userrole`);
    return result.rows;
  }

  async assignUsersToEntities(startFrom = 0) {
    const users = await pool.query(`SELECT * FROM users`);
    const parents = await pool.query(`SELECT * FROM parents`);

    Promise.all(
      users.rows.slice(startFrom).map((u, i) => {
        return pool.query(
          `CALL proc_assign_user_to_entity($1::integer, 'parent'::text, $2::integer)`,
          [u.user_id, parents.rows[i].parent_id],
        );
      }),
    );
    const result = await pool.query(`SELECT * FROM parents`);
    return result.rows;
  }
}
export default new TempService();
