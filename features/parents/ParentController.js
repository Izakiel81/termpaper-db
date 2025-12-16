import ParentService from "./ParentService.js";

class ParentController {
  static async getAllParents(req, res, next) {
    try {
      const result = await ParentService.getAllParents();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getParentById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Parent ID is required" });
      }

      const result = await ParentService.getParentById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createParent(req, res, next) {
    try {
      const { name, surname, patronym, phone } = req.body;

      if (!name || !surname || !patronym || !phone) {
        return res.status(400).json({
          error: "name, surname, patronym, and phone are required",
        });
      }

      const result = await ParentService.createParent(
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

  static async updateParent(req, res, next) {
    try {
      const { id } = req.params;
      const { name, surname, patronym, phone } = req.body;

      if (!id || !name || !surname || !patronym || !phone) {
        return res.status(400).json({
          error: "id, name, surname, patronym, and phone are required",
        });
      }

      const result = await ParentService.updateParent(
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

  static async deleteParent(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Parent ID is required" });
      }

      const result = await ParentService.deleteParent(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default ParentController;

