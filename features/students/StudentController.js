import studentService from "./StudentServices.js";
class StudentController {
  async getStudents(req, res, next) {
    try {
      const students = studentService.getStudents();

      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getStudentsAVGAbove7(req, res, next) {
    try {
      const students = studentService.getStudentsAVGAbove7();

      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentsByClass(req, res, next) {
    try {
      const students = studentService.getStudentsByClass();
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentRanking(req, res, next) {
    try {
      const students = await studentService.getStudentRanking();

      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new StudentController();
