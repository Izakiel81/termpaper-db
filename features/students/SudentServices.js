import pool from "../../lib/db.js";
class StudentServives {
  async getStudents() {
    const students = await pool.query(`SELECT * FROM students`);

    return students.rows;
  }

  async addStudent(name, surname, patronym, phone, class_c) {
    const newStudent = await pool.query(
      `CALL proc_create_student($1::character varying, $2::character varying, $3::character varying, $4::character varying, NULL, $5::character varying)`,
      [name, surname, patronym, phone, class_c],
    );

    return newStudent.rows[0].new_student_id;
  }
  async deleteStudent(id) {
    await pool.query(`CALL proc_delete_student($1::integer)`, [id]);
  }
}
export default StudentServives;
