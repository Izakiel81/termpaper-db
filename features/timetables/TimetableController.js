import TimetableService from "./TimetableService.js";

class TimetableController {
  static async getAllTimetables(req, res, next) {
    try {
      const result = await TimetableService.getAllTimetables();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTimetableById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Timetable ID is required" });
      }

      const result = await TimetableService.getTimetableById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createTimetable(req, res, next) {
    try {
      const { name, classId } = req.body;

      if (!name || !classId) {
        return res
          .status(400)
          .json({ error: "name and classId are required" });
      }

      const result = await TimetableService.createTimetable(name, classId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateTimetable(req, res, next) {
    try {
      const { id } = req.params;
      const { name, classId } = req.body;

      if (!id || !name || !classId) {
        return res.status(400).json({
          error: "id, name, and classId are required",
        });
      }

      const result = await TimetableService.updateTimetable(id, name, classId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteTimetable(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Timetable ID is required" });
      }

      const result = await TimetableService.deleteTimetable(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getWeeklyTimetable(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Timetable ID is required" });
      }
      console.log("[controller] getWeeklyTimetable id=", id);
      const result = await TimetableService.getWeeklyTimetable(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTimetableByStudentId(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Student ID is required" });
      }
      const result = await TimetableService.getTimetableByStudentId(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default TimetableController;

