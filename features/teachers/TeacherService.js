import pool from "../../lib/db.js";
class TeacherService {
  async getTeacher() {
    const teacher = await pool.query(`SELECT * FROM teacher`);

    return teacher.rows;
  }

  async getTeacherById(id) {
    const teacher = await pool.query(
      `SELECT * FROM teacher WHERE teacher_id=$1`,
      [id],
    );

    return teacher.rows;
  }

  // Views

  async getTeacherWithClasses() {
    const teacher = await pool.query(`SELECT * from vw_teachers_with_classes`);

    return teacher.rows;
  }

  // Functions

  async getTeacherSalary(teacherId, fromDate, toDate) {
    const teacher = await pool.query(
      `SELECT * FROM get_teacher_salary($1::integer, $2::date, $3::date)`,
      [teacherId, fromDate, toDate],
    );

    return teacher.rows;
  }

  // Procedures

  async addTeacher(name, surname, patronym, phone) {
    const newTeacher = await pool.query(
      `CALL proc_create_teacher($1::character varying, $2::character varying, $3::character varying, $4::character varying, NULL, $5::character varying)`,
      [name, surname, patronym, phone],
    );

    return newTeacher.rows[0].new_teacher_id;
  }
  async updateTeacher(id, name, surname, patronym, phone) {
    await pool.query(
      `CALL proc_update_teacher($1::integer, $2::character varying, $3::character varying, $4::character varying, $5::character varying, NULL, $6::character varying)`,
      [id, name, surname, patronym, phone],
    );
  }
  async deleteTeacher(id) {
    await pool.query(`CALL proc_delete_teacher($1::integer)`, [id]);
  }
}
export default new TeacherService();
