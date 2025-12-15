import pool from "../../lib/db.js";
import tempUtils from "./tempUtils.js";
class TempService {
  async getUsers() {
    const users = await pool.query(`SELECT * FROM users`);

    return users;
  }

  async createDataSet() {
    const users = await pool.query(`SELECT * FROM teacher`);

    users.rows.forEach((u) => {
      u.teacher_name = tempUtils.tranlateToLatin(u.teacher_name);
      u.teacher_surname = tempUtils.tranlateToLatin(u.teacher_surname);
      u.teacher_patronym = tempUtils.tranlateToLatin(u.teacher_patronym);
    });

    Promise.all([
      users.rows.map(async (u) => {
        let password = await tempUtils.hashPassword(
          tempUtils.generatePassword(),
        );
        let user = await pool.query(
          `CALL proc_create_user($1::character varying, $2::character varying, $3::character varying, null)`,
          [
            u.teacher_surname + u.teacher_name + u.teacher_patronym,
            u.teacher_surname +
              u.teacher_name +
              u.teacher_patronym +
              "@school.ua",
            password,
          ],
        );

        await pool.query(
          `CALL proc_assign_user_to_entity($1::integer, 'teacher'::text, $2::integer)`,
          [user.rows[0].new_user_id, u.teacher_id],
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

  async assignUsersToEntities(startFrom = 468) {
    const users = await pool.query(`SELECT * FROM users`);
    const students = await pool.query(`SELECT * FROM students`);

    Promise.all(
      users.rows.slice(startFrom).map((u, i) => {
        return pool.query(
          `CALL proc_assign_user_to_entity($1::integer, 'student'::text, $2::integer)`,
          [u.user_id, students.rows[i].student_id],
        );
      }),
    );
    const result = await pool.query(`SELECT * FROM students`);
    return result.rows;
  }
}
export default new TempService();
