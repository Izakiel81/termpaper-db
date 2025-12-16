import SubjectService from "./SubjectService.js";

class SubjectController {
  static async getAllSubjects(req, res, next) {
    try {
      const result = await SubjectService.getAllSubjects();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createSubject(req, res, next) {
    try {
      const { name, program } = req.body;

      if (!name || !program) {
        return res
          .status(400)
          .json({ error: "name and program are required" });
      }

      const result = await SubjectService.createSubject(name, program);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteSubject(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Subject ID is required" });
      }

      const result = await SubjectService.deleteSubject(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default SubjectController;

