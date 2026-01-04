import pool from "../db.js";

class SubjectsModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM subjects`;
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Database Error in SubjectsModel.findAll:", error);
      throw new Error("Failed to retrieve subjects list.");
    }
  }

  static async create(name, program, cabinet = 100, db = pool) {
    const query = `CALL proc_create_subject($1, $2, $3)`;
    const values = [name, cabinet, program];

    try {
      await db.query(query, values);
      const selectQuery = `SELECT * FROM subjects WHERE subject_name = $1`;
      const result = await db.query(selectQuery, [name]);
      return result.rows[0];
    } catch (error) {
      console.error("Database Error in SubjectsModel.create:", error);

      if (error.code === "23505") {
        throw new Error(`Subject with name '${name}' already exists.`);
      }

      throw new Error("Failed to create new subject due to database failure.");
    }
  }

  static async update(id, name, program, cabinet, db = pool) {
    const query = `CALL proc_update_subject($1, $2, $3, $4)`;
    const values = [id, name, cabinet, program];

    try {
      await db.query(query, values);
      const selectQuery = `SELECT * FROM subjects WHERE subject_id = $1`;
      const result = await db.query(selectQuery, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Database Error in SubjectsModel.update:", error);
      if (error.code === "23505") {
        throw new Error(`Subject with name '${name}' already exists.`);
      }
      throw new Error("Failed to update subject.");
    }
  }

  static async delete(id, db = pool) {
    const query = `CALL proc_delete_subject($1)`;
    const values = [id];

    try {
      await db.query(query, values);
      return { message: `Subject ${id} deleted successfully.` };
    } catch (error) {
      console.error("Database Error in SubjectsModel.delete:", error);
      if (error.code === "23503") {
        throw new Error(
          `Cannot delete subject ${id} because it is referenced by active lessons.`,
        );
      }
      throw new Error("Failed to delete subject.");
    }
  }
}

export default SubjectsModel;
