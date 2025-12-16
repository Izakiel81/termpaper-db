import pool from "../db.js";

class ClassModel {
  static async findAll() {
    const query = `SELECT * FROM class`;
    try {
      const result = await pool.query(query);
      return result.rows || [];
    } catch (error) {
      console.error("DB Error in ClassModel.findAll:", error);
      throw new Error("Failed to retrieve class data.");
    }
  }
  static async findById(journalId) {
    const query = `SELECT * FROM class WHERE class_journal_id = $1`;
    const values = [journalId];
    try {
      const result = await pool(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("DB Error in ClassModel.findById:", error);
      throw new Error("Failed to retrieve class data.");
    }
  }

  static async create(name, journalId, mainTeacherId) {
    const query = `
      INSERT INTO class (class_name, class_journal_id, class_mainteacher)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [name, journalId, mainTeacherId];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("DB Error in ClassModel.create:", error);
      if (error.code === "23505") {
        throw new Error(`Class with Journal ID ${journalId} already exists.`);
      }
      if (error.code === "23503") {
        throw new Error(`Invalid Journal ID or Teacher ID provided.`);
      }
      throw new Error("Failed to create new class.");
    }
  }

  static async update(journalId, name, mainTeacherId) {
    const query = `
      UPDATE class SET 
      class_name = $2, 
      class_mainteacher = $3
      WHERE class_journal_id = $1
      RETURNING *`;
    const values = [journalId, name, mainTeacherId];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("DB Error in ClassModel.update:", error);
      if (error.code === "23503") {
        throw new Error(`Invalid Teacher ID provided for update.`);
      }
      throw new Error("Failed to update class information.");
    }
  }

  static async delete(journalId) {
    const query = `DELETE FROM class WHERE class_journal_id = $1`;
    const values = [journalId];

    try {
      const result = await pool(query, values);
      if (result.rowCount === 0) {
        return { message: `Class with Journal ID ${journalId} not found.` };
      }
      return {
        message: `Class with Journal ID ${journalId} deleted successfully.`,
      };
    } catch (error) {
      console.error("DB Error in ClassModel.delete:", error);
      if (error.code === "23503") {
        // Foreign Key Violation
        throw new Error(
          `Cannot delete class because it has associated students or timetables.`,
        );
      }
      throw new Error("Failed to delete class.");
    }
  }
}

export default ClassModel;
