import pool from "../db.js";
class HomeworkModule {
  static async findAll() {
    const query = `SELECT * FROM homework`;
    try {
      const homework = await pool.query(query);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }
  static async findById(id) {
    const query = `SELECT * FROM homework WHERE homework_id=$1`;
    const values = [id];

    try {
      const homework = await pool.query(query, values);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }

  // Views

  static async recieveByStudentOrClass() {
    const query = `SELECT * FROM vw_homework_by_student_or_class`;
    try {
      const homework = await pool.query(query);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }
  static async reciefveForTomorrow() {
    const query = `SELECT * FROM vw_homework_tomorrow`;
    try {
      const homework = await pool.query(query);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }

  // Functions

  static async findByDate(class_c, date) {
    const query = `SELECT * FROM get_homework_by_date($1::character varying, $2::date)`;
    const values = [class_c, date];
    try {
      const homework = await pool.query(query, values);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }
  static async findByDateClass(class_c, date) {
    const query = `SELECT * FROM get_homework_by_date_class($1::character varying, $2::date)`;
    const values = [class_c, date];
    try {
      const homework = await pool.query(query, values);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }
  static async findByDateSubject(date, subject) {
    const query = `SELECT * FROM get_homework_by_date_class($1::date, $2::integer)`;
    const values = [date, subject];
    try {
      const homework = await pool.query(query, values);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
    } catch (error) {
      console.error();
      throw new Error();
    }
  }

  // Procedures

  static async create(name, teacher, lesson, duedate, desc, class_c) {
    const query = `CALL proc_create_homework($1::character varying, $2::integer, $3::interger, $4::date, $5::text, $6::character varying)`;
    const values = [name, teacher, lesson, duedate, desc, class_c];
    try {
      const newHomework = await pool.query(query, values);
      if (newHomework.rows && newHomework.rows.length > 0) {
        return newHomework.rows[0].new_homework_id;
      }
    } catch (error) {}
  }
  static async update(id, name, teacher, lesson, duedate, desc, class_c) {
    const query = `CALL proc_update_homework($1::interger, $2::character varying, $3::integer, $4::interger, $5::date, $6::text, $7::character varying)`;
    const values = [id, name, teacher, lesson, duedate, desc, class_c];
    try {
      await pool.query(query, values);
    } catch (error) {
      console.error();
      throw new Error();
    }
  }
  static async delete(id) {
    const query = `CALL proc_delete_homework($1::interger)`;
    const values = [id];
    try {
      await pool.query(query, values);
    } catch (error) {
      console.error();
      throw new Error();
    }
  }
}
export default HomeworkModule;
