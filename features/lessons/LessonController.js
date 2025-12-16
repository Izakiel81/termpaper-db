import LessonService from "./LessonService.js";

class LessonController {
  static async getAllLessons(req, res, next) {
    try {
      const result = await LessonService.getAllLessons();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getLessonById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Lesson ID is required" });
      }

      const result = await LessonService.getLessonById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createLesson(req, res, next) {
    try {
      const { name, className, subjectId, materialId, teacherId, date } =
        req.body;

      if (
        !name ||
        !className ||
        !subjectId ||
        !materialId ||
        !teacherId ||
        !date
      ) {
        return res.status(400).json({
          error:
            "name, className, subjectId, materialId, teacherId, and date are required",
        });
      }

      const result = await LessonService.createLesson(
        name,
        className,
        subjectId,
        materialId,
        teacherId,
        date,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateLesson(req, res, next) {
    try {
      const { id } = req.params;
      const { name, className, subjectId, materialId, teacherId, date } =
        req.body;

      if (
        !id ||
        !name ||
        !className ||
        !subjectId ||
        !materialId ||
        !teacherId ||
        !date
      ) {
        return res.status(400).json({
          error:
            "id, name, className, subjectId, materialId, teacherId, and date are required",
        });
      }

      const result = await LessonService.updateLesson(
        id,
        name,
        className,
        subjectId,
        materialId,
        teacherId,
        date,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteLesson(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Lesson ID is required" });
      }

      const result = await LessonService.deleteLesson(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default LessonController;

