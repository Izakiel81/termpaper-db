import pool from "../db.js";
class StudentModel {
  static async findAll() {
    const query = `SELECT * FROM students`;

    try {
      const students = await pool.query(query);

      if (students.rows && students.rows.length > 0) {
        return students.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding students`, error);
      throw new Error(
        "Could not retrieve students data due to a database error.",
      );
    }
  }
  static async findById(id) {
    const query = `SELECT * FROM students WHERE student_id=$1`;
    const values = [id];

    try {
      const student = await pool.query(query, values);
      if (student.rows && student.rows.length > 0) {
        return student.rows[0];
      }
      return null;
    } catch (error) {
      console.error(`Database error finding student ${id}:`, error);
      throw new Error(
        "Could not retrieve student data due to a database error.",
      );
    }
  }

  //Views

  static async AVGAbove7() {
    const query = `SELECT * FROM vw_students_avg_above_7`;
    try {
      const students = await pool.query(query);
      if (students.rows && students.rows.length > 0) {
        return students.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding studens:`, error);
      throw new Error(
        "Could not retrieve students data due to a database error.",
      );
    }
  }

  static async getByClass() {
    const query = `SELECT * FROM vw_students_by_class`;
    try {
      const students = await pool.query(query);
      if (students.rows && students.rows.length > 0) {
        return students.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding students:`, error);
      throw new Error(
        "Could not retrieve students data due to a database error.",
      );
    }
  }

  static async recieveRanking() {
    const query = `SELECT * FROM vw_student_ranking`;
    try {
      const students = await pool.query(query);
      if (students.rows && students.rows.length > 0) {
        return students.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding students:`, error);
      throw new Error(
        "Could not retrieve students data due to a database error.",
      );
    }
  }

  // Functions

  static async findByParentId(parentId) {
    const query = `SELECT * FROM get_children_by_parent($1::integer)`;
    const values = [parentId];

    try {
      const students = await pool.query(query, values);
      if (students.rows && students.rows.length > 0) {
        return students.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding students:`, error);
      throw new Error(
        "Could not retrieve students data due to a database error.",
      );
    }
  }
  static async recieveGradesAndAbsences(studentId, startDate, endDate) {
    const query = `SELECT * FROM get_student_grades_and_absences($1::integer, $2::date, $3::date)`;
    const values = [studentId, startDate, endDate];

    try {
      const result = await pool.query(query, values);
      if (result.rows && result.row.length > 0) {
        return result.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding data:`, error);
      throw new Error("Could not retrieve data due to a database error.");
    }
  }
  static async recieveMarks(studentId, startDate, endDate) {
    const query = `SELECT * FROM get_student_marks($1::integer, $2::date, $3::date)`;
    const values = [studentId, startDate, endDate];

    try {
      const result = await pool.query(query, values);
      if (result.rows && result.row.length > 0) {
        return result.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding data:`, error);
      throw new Error("Could not retrieve data due to a database error.");
    }
  }
  static async recieveAttendanceReport(studentId, startDate, endDate) {
    const query = `SELECT * FROM student_attendance_report($1::integer, $2::date, $3::date)`;
    const values = [studentId, startDate, endDate];

    try {
      const result = await pool.query(query, values);
      if (result.rows && result.row.length > 0) {
        return result.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding data:`, error);
      throw new Error("Could not retrieve data due to a database error.");
    }
  }
  static async recieveDayPlan(studentId, startDate, endDate) {
    const query = `SELECT * FROM student_day_plan($1::integer, $2::date, $3::date)`;
    const values = [studentId, startDate, endDate];

    try {
      const result = await pool.query(query, values);
      if (result.rows && result.row.length > 0) {
        return result.rows;
      }
      return null;
    } catch (error) {
      console.error(`Database error finding data:`, error);
      throw new Error("Could not retrieve data due to a database error.");
    }
  }

  // Procedures

  static async create(name, surname, patronym, phone, class_c) {
    const query = `CALL proc_create_student($1::character varying, $2::character varying, $3::character varying, $4::character varying, NULL, $5::character varying)`;
    const values = [name, surname, patronym, phone, class_c];
    try {
      const newStudent = await pool.query(query, values);
      if (newStudent.rows && newStudent.rows.length > 0) {
        return newStudent.rows[0].new_student_id;
      }
      return null;
    } catch (error) {
      console.error(
        `Database error creating the student ${name}\t ${surname}\t ${patronym}\t ${phone}\t ${class_c}\t:`,
        error,
      );
      throw new Error(
        "Could not creating the student data due to a database error.",
      );
    }
  }
  static async update(id, name, surname, patronym, phone, class_c) {
    const query = `CALL proc_update_student($1::integer, $2::character varying, $3::character varying, $4::character varying, $5::character varying, NULL, $6::character varying)`;
    const values = [id, name, surname, patronym, phone, class_c];
    try {
      await pool.query(query, values);
    } catch (error) {
      console.error(
        `Database error updating the student ${id}\t ${name}\t ${surname}\t ${patronym}\t ${phone}\t ${class_c}\t:`,
        error,
      );
      throw new Error(
        "Could not update the student data due to a database error.",
      );
    }
  }
  static async delete(id) {
    const query = `CALL proc_delete_student($1::integer)`;
    const values = [id];
    try {
      await pool.query(query, values);
    } catch (error) {
      console.error(`Database error deleting the student ${id}\t:`, error);
      throw new Error(
        "Could not delete the student data due to a database error.",
      );
    }
  }
}
export default StudentModel;
