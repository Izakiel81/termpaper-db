import ClassService from "./ClassService.js";
import { bouncer } from "../../lib/db-helpers/bouncer.js";

class ClassController {
  static async getAllClasses(req, res, next) {
    await bouncer(req, res, async (db) => {
      const result = await ClassService.getAllClasses(db);
      return result;
    });
  }

  static async getClassByName(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { name } = req.params;

      if (!name) {
        throw new Error("Class name is required");
      }

      const result = await ClassService.getClassByName(name, db);
      return result;
    });
  }

  static async getClassRatingReport(req, res, next) {
    await bouncer(req, res, async (db) => {
      const result = await ClassService.getClassRatingReport(db);
      return result;
    });
  }

  static async createClass(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { name, journalId, mainTeacherId } = req.body;

      if (!name || !journalId || !mainTeacherId) {
        throw new Error("name, journalId, and mainTeacherId are required");
      }

      const result = await ClassService.createClass(
        name,
        journalId,
        mainTeacherId,
        db,
      );
      return result;
    });
  }

  static async updateClass(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { id } = req.params;
      const { name, mainTeacherId } = req.body;

      if (!id || !name || !mainTeacherId) {
        throw new Error("id, name, and mainTeacherId are required");
      }

      const result = await ClassService.updateClass(id, name, mainTeacherId, db);
      return result;
    });
  }

  static async deleteClass(req, res, next) {
    await bouncer(req, res, async (db) => {
      const { id } = req.params;

      if (!id) {
        throw new Error("Class ID is required");
      }

      const result = await ClassService.deleteClass(id, db);
      return result;
    });
  }
}

export default ClassController;

