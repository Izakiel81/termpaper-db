import ClassModel from "../../lib/models/ClassModel.js";
import pool from "../../lib/db.js";

class ClassService {
  static async getAllClasses(db = pool) {
    try {
      const classes = await ClassModel.findAll(db);
      return { classes };
    } catch (error) {
      console.error("Service Error in getAllClasses:", error.message);
      throw error;
    }
  }

  static async getClassById(classId, db = pool) {
    try {
      const classData = await ClassModel.findById(classId, db);
      if (!classData) {
        throw new Error(`Class with ID ${classId} not found`);
      }
      return { class: classData };
    } catch (error) {
      console.error("Service Error in getClassById:", error.message);
      throw error;
    }
  }

  static async createClass(name, journalId, mainTeacherId, db = pool) {
    try {
      const classData = await ClassModel.create(name, journalId, mainTeacherId, db);
      return { class: classData, message: "Class created successfully" };
    } catch (error) {
      console.error("Service Error in createClass:", error.message);
      throw error;
    }
  }

  static async updateClass(journalId, name, mainTeacherId, db = pool) {
    try {
      const classData = await ClassModel.update(journalId, name, mainTeacherId, db);
      return { class: classData, message: "Class updated successfully" };
    } catch (error) {
      console.error("Service Error in updateClass:", error.message);
      throw error;
    }
  }

  static async deleteClass(journalId, db = pool) {
    try {
      const result = await ClassModel.delete(journalId, db);
      return result;
    } catch (error) {
      console.error("Service Error in deleteClass:", error.message);
      throw error;
    }
  }
}

export default ClassService;


