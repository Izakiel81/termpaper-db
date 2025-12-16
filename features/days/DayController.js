import DayService from "./DayService.js";

class DayController {
  static async getAllDays(req, res, next) {
    try {
      const result = await DayService.getAllDays();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getDayById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Day ID is required" });
      }

      const result = await DayService.getDayById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createDay(req, res, next) {
    try {
      const { dayName, dayTime, dayWeekday } = req.body;

      if (!dayName || !dayTime || !dayWeekday) {
        return res
          .status(400)
          .json({ error: "dayName, dayTime, and dayWeekday are required" });
      }

      const result = await DayService.createDay(dayName, dayTime, dayWeekday);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateDay(req, res, next) {
    try {
      const { id } = req.params;
      const { dayName, dayTime, dayWeekday } = req.body;

      if (!id || !dayName || !dayTime || !dayWeekday) {
        return res.status(400).json({
          error: "id, dayName, dayTime, and dayWeekday are required",
        });
      }

      const result = await DayService.updateDay(
        id,
        dayName,
        dayTime,
        dayWeekday,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDay(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Day ID is required" });
      }

      const result = await DayService.deleteDay(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default DayController;

