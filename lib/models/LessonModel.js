import pool from "../db.js";

class LessonModule {
  static async findAll() {
    const query = `SELECT * FROM lesson`;
    try {
      const lessons = await pool.query(query);
      if (lessons.rows && lessons.rows.length > 0) {
        return lessons.rows;
      }
      return [];
    } catch (error) {
      console.error("Error in findAll: Could not retrieve all lessons.", error);
      throw new Error("Database error: Failed to fetch all lessons.");
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM lesson WHERE lesson_id=$1`;
    const values = [id];

    try {
      const lessons = await pool.query(query, values);
      if (lessons.rows && lessons.rows.length > 0) {
        return lessons.rows[0];
      }
      return null;
    } catch (error) {
      console.error(
        `Error in findById: Could not retrieve lesson with ID ${id}.`,
        error,
      );
      throw new Error(`Database error: Failed to fetch lesson by ID ${id}.`);
    }
  }

  // Procedures

  static async create(
    p_name,
    p_class,
    p_subject,
    p_material,
    p_teacher,
    p_date,
  ) {
    const query = `CALL proc_create_lesson($1::character varying, $2::character varying, $3::integer, $4::integer, $5::integer, $6::date, NULL)`;
    const values = [p_name, p_class, p_subject, p_material, p_teacher, p_date];

    try {
      const newLesson = await pool.query(query, values);
      if (newLesson.rows && newLesson.rows.length > 0) {
        return newLesson.rows[0].new_lesson_id;
      }
      return null;
    } catch (error) {
      console.error(
        `Error in create: Could not create new lesson '${p_name}'.`,
        error,
      );
      throw new Error(
        "Database error: Failed to execute lesson creation procedure.",
      );
    }
  }

  static async update(
    p_lesson_id,
    p_name,
    p_class,
    p_subject,
    p_material,
    p_teacher,
    p_date,
  ) {
    const query = `CALL proc_update_lesson($1::integer, $2::character varying, $3::character varying, $4::integer, $5::integer, $6::integer, $7::date)`;
    const values = [
      p_lesson_id,
      p_name,
      p_class,
      p_subject,
      p_material,
      p_teacher,
      p_date,
    ];
    try {
      await pool.query(query, values);
      return true;
    } catch (error) {
      console.error(
        `Error in update: Could not update lesson with ID ${p_lesson_id}.`,
        error,
      );
      throw new Error(
        `Database error: Failed to execute lesson update procedure for ID ${p_lesson_id}.`,
      );
    }
  }

  static async delete(p_id) {
    const query = `CALL proc_delete_lesson($1::integer)`;
    const values = [p_id];
    try {
      await pool.query(query, values);
      return true;
    } catch (error) {
      console.error(
        `Error in delete: Could not delete lesson with ID ${p_id}.`,
        error,
      );
      throw new Error(
        `Database error: Failed to execute lesson delete procedure for ID ${p_id}.`,
      );
    }
  }
}

export default LessonModule;
