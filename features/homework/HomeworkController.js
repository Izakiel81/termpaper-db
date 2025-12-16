import HomeworkService from "./HomeworkService.js";

class HomeworkController {
  static async getAllHomework(req, res, next) {
    try {
      const result = await HomeworkService.getAllHomework();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getHomeworkById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Homework ID is required" });
      }

      const result = await HomeworkService.getHomeworkById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getHomeworkByStudentOrClass(req, res, next) {
    try {
      const result = await HomeworkService.getHomeworkByStudentOrClass();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getHomeworkForTomorrow(req, res, next) {
    try {
      const result = await HomeworkService.getHomeworkForTomorrow();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createHomework(req, res, next) {
    try {
      const { name, description, dueDate, subjectId, classId } = req.body;

      if (!name || !description || !dueDate || !subjectId || !classId) {
        return res.status(400).json({
          error:
            "name, description, dueDate, subjectId, and classId are required",
        });
      }

      const result = await HomeworkService.createHomework(
        name,
        description,
        dueDate,
        subjectId,
        classId,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateHomework(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, dueDate } = req.body;

      if (!id || !name || !description || !dueDate) {
        return res.status(400).json({
          error: "id, name, description, and dueDate are required",
        });
      }

      const result = await HomeworkService.updateHomework(
        id,
        name,
        description,
        dueDate,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHomework(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Homework ID is required" });
      }

      const result = await HomeworkService.deleteHomework(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default HomeworkController;

