import TeacherService from "./TeacherService.js";

class TeacherController {
  static async getAllTeachers(req, res, next) {
    try {
      const result = await TeacherService.getAllTeachers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTeacherById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Teacher ID is required" });
      }

      const result = await TeacherService.getTeacherById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTeachersWithClasses(req, res, next) {
    try {
      const result = await TeacherService.getTeachersWithClasses();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTeacherSalary(req, res, next) {
    try {
      const { teacherId, fromDate, toDate } = req.query;

      if (!teacherId || !fromDate || !toDate) {
        return res.status(400).json({
          error: "teacherId, fromDate, and toDate are required",
        });
      }

      const result = await TeacherService.getTeacherSalary(
        teacherId,
        fromDate,
        toDate,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createTeacher(req, res, next) {
    try {
      const { name, surname, patronym, phone } = req.body;

      if (!name || !surname || !patronym || !phone) {
        return res.status(400).json({
          error: "name, surname, patronym, and phone are required",
        });
      }

      const result = await TeacherService.createTeacher(
        name,
        surname,
        patronym,
        phone,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateTeacher(req, res, next) {
    try {
      const { id } = req.params;
      const { name, surname, patronym, phone } = req.body;

      if (!id || !name || !surname || !patronym || !phone) {
        return res.status(400).json({
          error: "id, name, surname, patronym, and phone are required",
        });
      }

      const result = await TeacherService.updateTeacher(
        id,
        name,
        surname,
        patronym,
        phone,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteTeacher(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Teacher ID is required" });
      }

      const result = await TeacherService.deleteTeacher(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default TeacherController;

