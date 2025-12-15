import pool from "../../lib/db.js";
class StudentServives {
  async getStudents() {
    const students = await pool.query(`SELECT * FROM students`);

    return students.rows;
  }

  // Views

  async getStudxentsAVGAbove7() {
    const students = await pool.query(`SELECT * FROM students_avg_above_7`);

    return students.rows;
  }
  async getUsersByClass() {
    const students = await pool.query(`SELECT * FROM students_by_class`);

    return students.rows;
  }
  async getStudentRanking() {
    const students = await pool.query(`SELECT * FROM vw_student_ranking`);

    return students.rows;
  }

  // Functions

  async getStudentsByParent(parentId) {
    const students = await pool.query(
      `SELECT * FROM get_children_by_parent($1::integer)`,
      [parentId],
    );

    return students.rows;
  }
  async getStudentGradeAndAbsences(studentId, startDate, endDate) {
    const students = await pool.query(
      `SELECT * FROM get_student_grades_and_absences($1::integer, $2::date, $3::date)`,
      [studentId, startDate, endDate],
    );

    return students.rows;
  }
  async getStudentMarks(studentId, fromDate, toDate) {
    const students = await pool.query(
      `SELECT * FROM get_student_marks($1::integer, $2::date, $3::date)`,
      [studentId, fromDate, toDate],
    );

    return students.rows;
  }
  async getStudentAttendanceReport(studentId, fromDate, toDate) {
    const students = await pool.query(
      `SELECT * FROM student_attendance_report($1::integer, $2::date, $3::date)`,
      [studentId, fromDate, toDate],
    );

    return students.rows;
  }
  async getStudentDayPlan(studentId, fromDate, toDate) {
    const students = await pool.query(
      `SELECT * FROM student_day_plan($1::integer, $2::date, $3::date)`,
      [studentId, fromDate, toDate],
    );

    return students.rows;
  }

  // Procedures

  async addStudent(name, surname, patronym, phone, class_c) {
    const newStudent = await pool.query(
      `CALL proc_create_student($1::character varying, $2::character varying, $3::character varying, $4::character varying, NULL, $5::character varying)`,
      [name, surname, patronym, phone, class_c],
    );

    return newStudent.rows[0].new_student_id;
  }
  async updateStudent(id, name, surname, patronym, phone, class_c) {
    await pool.query(
      `CALL proc_update_student($1::integer, $2::character varying, $3::character varying, $4::character varying, $5::character varying, NULL, $6::character varying)`,
      [id, name, surname, patronym, phone, class_c],
    );
  }
  async deleteStudent(id) {
    await pool.query(`CALL proc_delete_student($1::integer)`, [id]);
  }
}
export default new StudentServives();
