import StudentParentService from "./StudentParentService.js";
import bouncer from "../../lib/db-helpers/bouncer.js";

class StudentParentController {
  static async getParentsByStudentId(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { studentId } = req.params;

      if (!studentId) {
        throw new Error("studentId is required");
      }

      const result = await StudentParentService.getParentsByStudentId(
        studentId,
        db,
      );
      return result;
    });
  }

  static async assignParentToStudent(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { studentId, parentId } = req.body;

      if (!studentId || !parentId) {
        throw new Error("studentId and parentId are required");
      }

      const result = await StudentParentService.assignParentToStudent(
        studentId,
        parentId,
        db,
      );
      return result;
    });
  }

  static async unassignParentFromStudent(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { studentId, parentId } = req.body;

      if (!studentId || !parentId) {
        throw new Error("studentId and parentId are required");
      }

      const result = await StudentParentService.unassignParentFromStudent(
        studentId,
        parentId,
        db,
      );
      return result;
    });
  }
}

export default StudentParentController;

