import JournalService from "./JournalService.js";

class JournalController {
  static async getAllJournals(req, res, next) {
    try {
      const result = await JournalService.getAllJournals();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getJournalById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Journal ID is required" });
      }

      const result = await JournalService.getJournalById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createJournal(req, res, next) {
    try {
      const { teacherId, name } = req.body;

      if (!teacherId || !name) {
        return res
          .status(400)
          .json({ error: "teacherId and name are required" });
      }

      const result = await JournalService.createJournal(teacherId, name);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateJournal(req, res, next) {
    try {
      const { id } = req.params;
      const { teacherId, name } = req.body;

      if (!id || !teacherId || !name) {
        return res
          .status(400)
          .json({ error: "id, teacherId, and name are required" });
      }

      const result = await JournalService.updateJournal(id, teacherId, name);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteJournal(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Journal ID is required" });
      }

      const result = await JournalService.deleteJournal(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default JournalController;

