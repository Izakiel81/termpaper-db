import SubjectsModel from "../../lib/models/SubjectModel.js";
export default SubjectService;

}
  }
    }
      throw error;
      console.error("Service Error in deleteSubject:", error.message);
    } catch (error) {
      return result;
      const result = await SubjectsModel.delete(subjectId);
    try {
  static async deleteSubject(subjectId) {

  }
    }
      throw error;
      console.error("Service Error in createSubject:", error.message);
    } catch (error) {
      return { subject, message: "Subject created successfully" };
      const subject = await SubjectsModel.create(name, program);
    try {
  static async createSubject(name, program) {

  }
    }
      throw error;
      console.error("Service Error in getAllSubjects:", error.message);
    } catch (error) {
      return { subjects };
      const subjects = await SubjectsModel.findAll();
    try {
  static async getAllSubjects() {
class SubjectService {


