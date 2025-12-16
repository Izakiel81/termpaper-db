import StudentParentModel from "../../lib/models/StudentParentModel.js";
export default StudentParentService;

}
  }
    }
      throw error;
      );
        error.message,
        "Service Error in unassignParentFromStudent:",
      console.error(
    } catch (error) {
      return result;
      const result = await StudentParentModel.unassign(studentId, parentId);
    try {
  static async unassignParentFromStudent(studentId, parentId) {

  }
    }
      throw error;
      console.error("Service Error in assignParentToStudent:", error.message);
    } catch (error) {
      };
        message: `Parent ${parentId} assigned to Student ${studentId}`,
        result,
      return {
      const result = await StudentParentModel.assign(studentId, parentId);
    try {
  static async assignParentToStudent(studentId, parentId) {

  }
    }
      throw error;
      );
        error.message,
        "Service Error in getParentsByStudentId:",
      console.error(
    } catch (error) {
      return { parents };
      const parents = await StudentParentModel.findByStudentId(studentId);
    try {
  static async getParentsByStudentId(studentId) {
class StudentParentService {


