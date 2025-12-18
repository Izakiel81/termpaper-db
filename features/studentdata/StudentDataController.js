import StudentDataService from "./StudentDataService.js";

class StudentDataController {
  static async getAllStudentData(req, res, next) {
    try {
      const result = await StudentDataService.getAllStudentData();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentDataById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Student Data ID is required" });
      }

      const result = await StudentDataService.getStudentDataById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createStudentData(req, res, next) {
    try {
      const { journalId, studentId, lesson, mark, status, note } = req.body;

      if (!journalId || !studentId || !lesson || !mark || !status) {
        return res.status(400).json({
          error:
            "journalId, studentId, lesson, mark, and status are required",
        });
      }

      const result = await StudentDataService.createStudentData(
        journalId,
        studentId,
        lesson,
        mark,
        status,
        note || null,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateStudentData(req, res, next) {
    try {
      const { id } = req.params;
      const { journalId, studentId, lesson, mark, status, note } = req.body;

      if (
        !id ||
        !journalId ||
        !studentId ||
        !lesson ||
        !mark ||
        !status
      ) {
        return res.status(400).json({
          error:
            "id, journalId, studentId, lesson, mark, and status are required",
        });
      }

      const result = await StudentDataService.updateStudentData(
        id,
        journalId,
        studentId,
        lesson,
        mark,
        status,
        note || null,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteStudentData(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Student Data ID is required" });
      }

      const result = await StudentDataService.deleteStudentData(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentDataMarks7d(req, res, next) {
    try {
      const { studentId } = req.params;
      if (!studentId) {
        return res.status(400).json({ error: "Student ID is required" });
      }
      const result = await StudentDataService.getStudentDataMarks7d(studentId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default StudentDataController;

