import StudentParentService from "./StudentParentService.js";

class StudentParentController {
  static async getParentsByStudentId(req, res, next) {
    try {
      const { studentId } = req.params;

      if (!studentId) {
        return res.status(400).json({ error: "studentId is required" });
      }

      const result = await StudentParentService.getParentsByStudentId(
        studentId,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async assignParentToStudent(req, res, next) {
    try {
      const { studentId, parentId } = req.body;

      if (!studentId || !parentId) {
        return res
          .status(400)
          .json({ error: "studentId and parentId are required" });
      }

      const result = await StudentParentService.assignParentToStudent(
        studentId,
        parentId,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async unassignParentFromStudent(req, res, next) {
    try {
      const { studentId, parentId } = req.body;

      if (!studentId || !parentId) {
        return res
          .status(400)
          .json({ error: "studentId and parentId are required" });
      }

      const result = await StudentParentService.unassignParentFromStudent(
        studentId,
        parentId,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default StudentParentController;

