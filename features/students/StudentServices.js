import pool from "../../lib/db.js";
import StudentModel from "../../lib/models/StudentModel.js";
class StudentServives {
  static async getStudents() {
    try {
      const students = await StudentModel.findAll();
      return { students };
    } catch (error) {
      console.error({ error: error.message });
    }
  }

  static async getStudentById(id) {
    try {
      const student = await StudentModel.findById(id);
      return { student };
    } catch (error) {
      console.error({ error: error.message });
    }
  }

  // Views

  static async getStudentsAVGAbove7() {
    try {
      const student = await StudentModel.AVGAbove7();
      return { student };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async getStudentsByClass() {
    try {
      const students = await StudentModel.getByClass();
      return { students };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async getStudentRanking() {
    try {
      const students = await StudentModel.recieveRanking();
      return { students };
    } catch (error) {
      console.error({ error: error.message });
    }
  }

  // Functions

  static async getStudentsByParent(parentId) {
    try {
      const students = await StudentModel.findByParentId(parentId);
      return { students };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async getStudentGradeAndAbsences(studentId, startDate, endDate) {
    try {
      const students = await StudentModel.recieveGradesAndAbsences(
        studentId,
        startDate,
        endDate,
      );
      return { students };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async getStudentMarks(studentId, fromDate, toDate) {
    try {
      const students = await StudentModel.recieveMarks(
        studentId,
        fromDate,
        toDate,
      );
      return { students };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async getStudentAttendanceReport(studentId, fromDate, toDate) {
    try {
      const report = await StudentModel.recieveAttendanceReport(
        studentId,
        fromDate,
        toDate,
      );
      return { report };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async getStudentDayPlan(studentId, fromDate, toDate) {
    try {
      const day_plan = await StudentModel.recieveDayPlan(
        studentId,
        fromDate,
        toDate,
      );
      return { day_plan };
    } catch (error) {
      console.error({ error: error.message });
    }
  }

  // Procedures

  static async addStudent(name, surname, patronym, phone, class_c) {
    try {
      const newStudent = await StudentModel.create(
        name,
        surname,
        patronym,
        phone,
        class_c,
      );

      return { newStudent };
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async updateStudent(id, name, surname, patronym, phone, class_c) {
    try {
      await StudentModel.update(id, name, surname, patronym, phone, class_c);
    } catch (error) {
      console.error({ error: error.message });
    }
  }
  static async deleteStudent(id) {
    try {
      await S;
    } catch (error) {}
  }
}
export default StudentServives;
