import studentService from "./StudentServices.js";
class StudentController {
  async getStudents(req, res, next) {
    try {
      const students = await studentService.getStudents();

      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getStudentsAVGAbove7(req, res, next) {
    try {
      const students = await studentService.getStudentsAVGAbove7();

      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentsByClass(req, res, next) {
    try {
      const students = await studentService.getStudentsByClass();
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

  async getStudentsByParent(req, res, next) {
    try {
      const { parentId } = req.params;
      const students = await studentService.getStudentsByParent(parentId);

      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentGradeAndAbsences(req, res, next) {
    try {
      const { studentId, startDate, endDate } = req.query;

      const students = await studentService.getStudentGradeAndAbsences(
        studentId,
        startDate,
        endDate,
      );
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentMarks(req, res, next) {
    try {
      const { studentId, fromDate, toDate } = req.query;
      const students = await studentService.getStudentMarks(
        studentId,
        fromDate,
        toDate,
      );
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentAttendanceReport(req, res, next) {
    try {
      const { studentId, fromDate, toDate } = req.query;
      const students = await studentService.getStudentAttendanceReport(
        studentId,
        fromDate,
        toDate,
      );
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStudentDayPlan(req, res, next) {
    try {
      const { studentId, fromDate, toDate } = req.query;
      const students = await studentService.getStudentDayPlan(
        studentId,
        fromDate,
        toDate,
      );
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addStudent(req, res, next) {
    try {
      const { name, surname, patronym, phone, class_c } = req.body;
      const newStudent = await studentService.addStudent(
        name,
        surname,
        patronym,
        phone,
        class_c,
      );
      res.status(200).json({ newStudent });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async updateStudent(req, res, next) {
    try {
      const { id, name, surname, patronym, phone, class_c } = req.body;
      await studentService.updateStudent(
        id,
        name,
        surname,
        patronym,
        phone,
        class_c,
      );
      res
        .status(200)
        .json({ message: "Student has been successfully changed" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async deleteStudent(req, res, next) {
    try {
      const { id } = req.params;
      await studentService.deleteStudent(id);
      res
        .status(200)
        .json({ message: "Student has been successfully deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new StudentController();
