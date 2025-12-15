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
}
export default new StudentController();
