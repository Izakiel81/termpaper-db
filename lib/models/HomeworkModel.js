import pool from "../db.js";

class HomeworkModule {
  static async findAll() {
    const query = `SELECT * FROM homework`;
    try {
      const homework = await pool.query(query);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
      return []; 
    } catch (error) {
      console.error("Error in findAll: Could not retrieve all homework.", error);
      throw new Error("Database error: Failed to fetch all homework.");
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM homework WHERE homework_id=$1`;
    const values = [id];

    try {
      const homework = await pool.query(query, values);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows[0]; 
      }
      return null; 
    } catch (error) {
      console.error(`Error in findById: Could not retrieve homework with ID ${id}.`, error);
      throw new Error(`Database error: Failed to fetch homework by ID ${id}.`);
    }
  }

  // Views

  static async recieveByStudentOrClass(studentId) {
    const query = `SELECT * FROM vw_homework_by_student_or_class WHERE student_id=$1`
    const values = [studentId];
    try {
      const homework = await pool.query(query, values);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
      return [];
    } catch (error) {
      console.error("Error in recieveByStudentOrClass: Could not retrieve homework from view.", error);
      throw new Error("Database error: Failed to fetch homework by student or class view.");
    }
  }

  static async reciefveForTomorrow() {
    const query = `SELECT * FROM vw_homework_tomorrow`;
    try {
      const homework = await pool.query(query);
      if (homework.rows && homework.rows.length > 0) {
        return homework.rows;
      }
      return [];
    } catch (error) {
      console.error("Error in reciefveForTomorrow: Could not retrieve homework for tomorrow's view.", error);
      throw new Error("Database error: Failed to fetch homework for tomorrow view.");
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
      return [];
    } catch (error) {
      console.error(`Error in findByDate: Could not retrieve homework for class ${class_c} on ${date}.`, error);
      throw new Error("Database error: Failed to execute get_homework_by_date function.");
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
      return [];
    } catch (error) {
      console.error(`Error in findByDateClass: Could not retrieve homework for class ${class_c} on ${date}.`, error);
      throw new Error("Database error: Failed to execute get_homework_by_date_class function.");
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
      return [];
    } catch (error) {
      console.error(`Error in findByDateSubject: Could not retrieve homework for date ${date} and subject ${subject}.`, error);
      throw new Error("Database error: Failed to execute homework by date and subject function.");
    }
  }

  // Procedures

  static async create(name, teacher, lesson, duedate, desc, class_c) {
    const query = `CALL proc_create_homework($1::character varying, $2::integer, $3::integer, $4::date, $5::text, $6::character varying)`;
    const values = [name, teacher, lesson, duedate, desc, class_c];
    try {
      const newHomework = await pool.query(query, values);
      if (newHomework.rows && newHomework.rows.length > 0) {
        return newHomework.rows[0].new_homework_id;
      }
      return null; 
    } catch (error) {
      console.error(`Error in create: Could not create new homework '${name}'.`, error);
      throw new Error("Database error: Failed to execute homework creation procedure.");
    }
  }

  static async update(id, name, teacher, lesson, duedate, desc, class_c) {
    const query = `CALL proc_update_homework($1::integer, $2::character varying, $3::integer, $4::integer, $5::date, $6::text, $7::character varying)`;
    const values = [id, name, teacher, lesson, duedate, desc, class_c];
    try {
      await pool.query(query, values);
      return true; 
    } catch (error) {
      console.error(`Error in update: Could not update homework with ID ${id}.`, error);
      throw new Error(`Database error: Failed to execute homework update procedure for ID ${id}.`);
    }
  }

  static async delete(id) {
    const query = `CALL proc_delete_homework($1::integer)`;
    const values = [id];
    try {
      await pool.query(query, values);
      return true; 
    } catch (error) {
      console.error(`Error in delete: Could not delete homework with ID ${id}.`, error);
      throw new Error(`Database error: Failed to execute homework delete procedure for ID ${id}.`);
    }
  }
}

export default HomeworkModule;
