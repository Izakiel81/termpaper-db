import pool from "../db.js";

class JournalModel {
  static async findAll() {
    const query = `SELECT * FROM journal`;
    try {
      const result = await pool(query);
      return result.rows || null;
    } catch (error) {
      console.error("DB Error in JournalModel.findAll:", error);
      throw new Error("Failed to retrieve journal data.");
    }
  }
  static async findById(id) {
    const query = `SELECT * FROM journal WHERE journal_id = $1`;
    const values = [id];
    try {
      const result = await pool(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("DB Error in JournalModel.findById:", error);
      throw new Error("Failed to retrieve journal data.");
    }
  }

  static async create(teacherId, name) {
    const query = `
      INSERT INTO journal (journal_teacher, journal_name)
      VALUES ($1, $2)
      RETURNING *`;
    const values = [teacherId, name];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("DB Error in JournalModel.create:", error);
      if (error.code === "23503") {
        // Foreign Key Violation
        throw new Error(`Invalid Teacher ID provided.`);
      }
      throw new Error("Failed to create new journal.");
    }
  }

  static async update(id, teacherId, name) {
    const query = `
      UPDATE journal SET 
      journal_teacher = $2, 
      journal_name = $3
      WHERE journal_id = $1
      RETURNING *`;
    const values = [id, teacherId, name];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("DB Error in JournalModel.update:", error);
      if (error.code === "23503") {
        throw new Error(`Invalid Teacher ID provided for update.`);
      }
      throw new Error("Failed to update journal information.");
    }
  }

  static async delete(id) {
    const query = `DELETE FROM journal WHERE journal_id = $1`;
    const values = [id];

    try {
      const result = await pool(query, values);
      if (result.rowCount === 0) {
        return { message: `Journal ${id} not found.` };
      }
      return { message: `Journal ${id} deleted successfully.` };
    } catch (error) {
      console.error("DB Error in JournalModel.delete:", error);
      if (error.code === "23503") {
        throw new Error(
          `Cannot delete journal ${id} because it is linked to a class.`,
        );
      }
      throw new Error("Failed to delete journal.");
    }
  }
}

export default JournalModel;
