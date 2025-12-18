import studentService from "./StudentServices.js";
class StudentController {
  static async getStudents(req, res, next) {
    try {
      const { students } = await studentService.getStudents();
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentById(req, res, next) {
    try {
      const { id } = req.params;

      // Validate id is a positive integer to avoid casting errors
      const parsedId = Number(id);
      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        return res.status(400).json({ error: "Invalid student id" });
      }

      const { student } = await studentService.getStudentById(id);
      res.status(200).json({ student });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getStudentsAVGAbove7(req, res, next) {
    try {
      const { student } = await studentService.getStudentsAVGAbove7();
      // this view returns a list under 'student' key from service
      res.status(200).json({ students: student });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getStudentsByClass(req, res, next) {
    try {
      const { students } = await studentService.getStudentsByClass();
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getStudentRanking(req, res, next) {
    try {
      const { students } = await studentService.getStudentRanking();
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getStudentsByParent(req, res, next) {
    try {
      const { parentId } = req.params;
      const { students } = await studentService.getStudentsByParent(parentId);
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentGradeAndAbsences(req, res, next) {
    try {
      const { studentId, startDate, endDate } = req.query;
      const { students } = await studentService.getStudentGradeAndAbsences(
        studentId,
        startDate,
        endDate,
      );
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentMarks(req, res, next) {
    try {
      const { studentId, fromDate, toDate } = req.query;
      const { students } = await studentService.getStudentMarks(
        studentId,
        fromDate,
        toDate,
      );
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentAttendanceReport(req, res, next) {
    try {
      const { studentId, fromDate, toDate } = req.query;
      const { report } = await studentService.getStudentAttendanceReport(
        studentId,
        fromDate,
        toDate,
      );
      res.status(200).json({ report });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentDayPlan(req, res, next) {
    try {
      const { studentId, fromDate, toDate } = req.query;
      const { day_plan } = await studentService.getStudentDayPlan(
        studentId,
        fromDate,
        toDate,
      );
      res.status(200).json({ day_plan });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async addStudent(req, res, next) {
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
  static async updateStudent(req, res, next) {
    try {
      const { name, surname, patronym, phone, class_c } = req.body;
      const id = req.params.id || req.body.id;

      if (!id || !name || !surname || !patronym || !phone) {
        return res.status(400).json({
          error:
            "id, name, surname, patronym, and phone are required",
        });
      }

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
  static async deleteStudent(req, res, next) {
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
export default StudentController;
