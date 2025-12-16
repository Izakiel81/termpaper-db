import StudentParentModel from "../../lib/models/StudentParentModel.js";

class StudentParentService {
  static async getParentsByStudentId(studentId) {
    try {
      const parents = await StudentParentModel.findByStudentId(studentId);
      return { parents };
    } catch (error) {
      console.error(
        "Service Error in getParentsByStudentId:",
        error.message,
      );
      throw error;
    }
  }

  static async assignParentToStudent(studentId, parentId) {
    try {
      const result = await StudentParentModel.assign(studentId, parentId);
      return {
        result,
        message: `Parent ${parentId} assigned to Student ${studentId}`,
      };
    } catch (error) {
      console.error("Service Error in assignParentToStudent:", error.message);
      throw error;
    }
  }

  static async unassignParentFromStudent(studentId, parentId) {
    try {
      const result = await StudentParentModel.unassign(studentId, parentId);
      return result;
    } catch (error) {
      console.error(
        "Service Error in unassignParentFromStudent:",
        error.message,
      );
      throw error;
    }
  }
}

export default StudentParentService;


