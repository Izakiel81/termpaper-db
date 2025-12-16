import SubjectsModel from "../../lib/models/SubjectModel.js";

class SubjectService {
  static async getAllSubjects() {
    try {
      const subjects = await SubjectsModel.findAll();
      return { subjects };
    } catch (error) {
      console.error("Service Error in getAllSubjects:", error.message);
      throw error;
    }
  }

  static async createSubject(name, program) {
    try {
      const subject = await SubjectsModel.create(name, program);
      return { subject, message: "Subject created successfully" };
    } catch (error) {
      console.error("Service Error in createSubject:", error.message);
      throw error;
    }
  }

  static async deleteSubject(subjectId) {
    try {
      const result = await SubjectsModel.delete(subjectId);
      return result;
    } catch (error) {
      console.error("Service Error in deleteSubject:", error.message);
      throw error;
    }
  }
}

export default SubjectService;


