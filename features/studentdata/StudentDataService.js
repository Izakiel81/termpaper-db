import StudentDataModule from "../../lib/models/StudentDataModel.js";

class StudentDataService {
  static async getAllStudentData() {
    try {
      const studentData = await StudentDataModule.findAll();
      return { studentData };
    } catch (error) {
      console.error("Service Error in getAllStudentData:", error.message);
      throw error;
    }
  }

  static async getStudentDataById(studentDataId) {
    try {
      const studentData = await StudentDataModule.findById(studentDataId);
      if (!studentData) {
        throw new Error(`Student Data with ID ${studentDataId} not found`);
      }
      return { studentData };
    } catch (error) {
      console.error("Service Error in getStudentDataById:", error.message);
      throw error;
    }
  }

  static async createStudentData(
    journalId,
    studentId,
    lesson,
    mark,
    status,
    note,
  ) {
    try {
      const studentDataId = await StudentDataModule.create(
        journalId,
        studentId,
        lesson,
        mark,
        status,
        note,
      );
      return { studentDataId, message: "Student data created successfully" };
    } catch (error) {
      console.error("Service Error in createStudentData:", error.message);
      throw error;
    }
  }

  static async updateStudentData(
    studentDataId,
    journalId,
    studentId,
    lesson,
    mark,
    status,
    note,
  ) {
    try {
      await StudentDataModule.update(
        studentDataId,
        journalId,
        studentId,
        lesson,
        mark,
        status,
        note,
      );
      return { message: "Student data updated successfully" };
    } catch (error) {
      console.error("Service Error in updateStudentData:", error.message);
      throw error;
    }
  }

  static async deleteStudentData(studentDataId) {
    try {
      await StudentDataModule.delete(studentDataId);
      return { message: `Student data ${studentDataId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteStudentData:", error.message);
      throw error;
    }
  }

  static async getStudentDataMarks7d(studentId) {
    try {
      const marks = await StudentDataModule.findMarks7d(studentId);
      return { marks };
    } catch (error) {
      console.error("Service Error in getStudentDataMarks7d:", error.message);
      throw error;
    }
  }
}

export default StudentDataService;


