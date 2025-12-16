import ClassModel from "../../lib/models/ClassModel.js";
export default ClassService;

}
  }
    }
      throw error;
      console.error("Service Error in deleteClass:", error.message);
    } catch (error) {
      return result;
      const result = await ClassModel.delete(journalId);
    try {
  static async deleteClass(journalId) {

  }
    }
      throw error;
      console.error("Service Error in updateClass:", error.message);
    } catch (error) {
      return { class: classData, message: "Class updated successfully" };
      const classData = await ClassModel.update(journalId, name, mainTeacherId);
    try {
  static async updateClass(journalId, name, mainTeacherId) {

  }
    }
      throw error;
      console.error("Service Error in createClass:", error.message);
    } catch (error) {
      return { class: classData, message: "Class created successfully" };
      const classData = await ClassModel.create(name, journalId, mainTeacherId);
    try {
  static async createClass(name, journalId, mainTeacherId) {

  }
    }
      throw error;
      console.error("Service Error in getClassById:", error.message);
    } catch (error) {
      return { class: classData };
      }
        throw new Error(`Class with ID ${classId} not found`);
      if (!classData) {
      const classData = await ClassModel.findById(classId);
    try {
  static async getClassById(classId) {

  }
    }
      throw error;
      console.error("Service Error in getAllClasses:", error.message);
    } catch (error) {
      return { classes };
      const classes = await ClassModel.findAll();
    try {
  static async getAllClasses() {
class ClassService {


