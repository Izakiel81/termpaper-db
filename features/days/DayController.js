import DayService from "./DayService.js";
import { bouncer } from "../../lib/db-helpers/bouncer.js";

class DayController {
  static async getAllDays(req, res, next) {
    await bouncer(req, res, async (db) => {
      const result = await DayService.getAllDays(db);
      return result;
    });
  }

  static async getDayById(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { id } = req.params;

      if (!id) {
        throw new Error("Day ID is required");
      }

      const result = await DayService.getDayById(id, db);
      return result;
    });
  }

  static async createDay(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { dayName, dayTime, dayWeekday } = req.body;

      if (!dayName || !dayTime || !dayWeekday) {
        throw new Error("dayName, dayTime, and dayWeekday are required");
      }

      const result = await DayService.createDay(dayName, dayTime, dayWeekday, db);
      return result;
    });
  }

  static async updateDay(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { id } = req.params;
      const { dayName, dayTime, dayWeekday } = req.body;

      if (!id || !dayName || !dayTime || !dayWeekday) {
        throw new Error("id, dayName, dayTime, and dayWeekday are required");
      }

      const result = await DayService.updateDay(
        id,
        dayName,
        dayTime,
        dayWeekday,
        db,
      );
      return result;
    });
  }

  static async deleteDay(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { id } = req.params;

      if (!id) {
        throw new Error("Day ID is required");
      }

      const result = await DayService.deleteDay(id, db);
      return result;
    });
  }
}

export default DayController;

