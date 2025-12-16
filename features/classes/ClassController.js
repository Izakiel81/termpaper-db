import ClassService from "./ClassService.js";

class ClassController {
  static async getAllClasses(req, res, next) {
    try {
      const result = await ClassService.getAllClasses();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getClassById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Class ID is required" });
      }

      const result = await ClassService.getClassById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createClass(req, res, next) {
    try {
      const { name, journalId, mainTeacherId } = req.body;

      if (!name || !journalId || !mainTeacherId) {
        return res
          .status(400)
          .json({ error: "name, journalId, and mainTeacherId are required" });
      }

      const result = await ClassService.createClass(
        name,
        journalId,
        mainTeacherId,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateClass(req, res, next) {
    try {
      const { id } = req.params;
      const { name, mainTeacherId } = req.body;

      if (!id || !name || !mainTeacherId) {
        return res.status(400).json({
          error: "id, name, and mainTeacherId are required",
        });
      }

      const result = await ClassService.updateClass(id, name, mainTeacherId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteClass(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Class ID is required" });
      }

      const result = await ClassService.deleteClass(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default ClassController;

