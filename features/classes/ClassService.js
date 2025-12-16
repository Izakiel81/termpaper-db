import ClassModel from "../../lib/models/ClassModel.js";

class ClassService {
  static async getAllClasses() {
    try {
      const classes = await ClassModel.findAll();
      return { classes };
    } catch (error) {
      console.error("Service Error in getAllClasses:", error.message);
      throw error;
    }
  }

  static async getClassById(classId) {
    try {
      const classData = await ClassModel.findById(classId);
      if (!classData) {
        throw new Error(`Class with ID ${classId} not found`);
      }
      return { class: classData };
    } catch (error) {
      console.error("Service Error in getClassById:", error.message);
      throw error;
    }
  }

  static async createClass(name, journalId, mainTeacherId) {
    try {
      const classData = await ClassModel.create(name, journalId, mainTeacherId);
      return { class: classData, message: "Class created successfully" };
    } catch (error) {
      console.error("Service Error in createClass:", error.message);
      throw error;
    }
  }

  static async updateClass(journalId, name, mainTeacherId) {
    try {
      const classData = await ClassModel.update(journalId, name, mainTeacherId);
      return { class: classData, message: "Class updated successfully" };
    } catch (error) {
      console.error("Service Error in updateClass:", error.message);
      throw error;
    }
  }

  static async deleteClass(journalId) {
    try {
      const result = await ClassModel.delete(journalId);
      return result;
    } catch (error) {
      console.error("Service Error in deleteClass:", error.message);
      throw error;
    }
  }
}

export default ClassService;


