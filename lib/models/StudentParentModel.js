import pool from "../db.js";

class StudentParentModel {
  static async findByStudentId(studentId) {
    const query = `SELECT * FROM studentparent WHERE student_id_ref = $1`;
    const values = [studentId];
    try {
      const result = await pool(query, values);
      return result.rows;
    } catch (error) {
      console.error(
        "Database Error in StudentParentModel.findByStudentId:",
        error,
      );
      throw new Error("Failed to retrieve parent links for student.");
    }
  }

  static async create(studentId, parentId) {
    const query = `
      INSERT INTO studentparent (student_id_ref, parent_id_ref)
      VALUES ($1, $2)
      RETURNING *`;
    const values = [studentId, parentId];

    try {
      const result = await pool(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Database Error in StudentParentModel.create:", error);
      if (error.code === "23503") {
        // Foreign Key Violation
        throw new Error(`Invalid Student ID or Parent ID provided.`);
      }
      throw new Error("Failed to link student and parent.");
    }
  }

  static async delete(studentId, parentId) {
    const query = `DELETE FROM studentparent WHERE student_id_ref = $1 AND parent_id_ref = $2`;
    const values = [studentId, parentId];

    try {
      await pool(query, values);
      return {
        message: `Link between Student ${studentId} and Parent ${parentId} deleted.`,
      };
    } catch (error) {
      console.error("Database Error in StudentParentModel.delete:", error);
      throw new Error("Failed to unlink student and parent.");
    }
  }
}

export default StudentParentModel;
