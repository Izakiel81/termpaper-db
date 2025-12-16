import LessonModule from "../../lib/models/LessonModel.js";

class LessonService {
  static async getAllLessons() {
    try {
      const lessons = await LessonModule.findAll();
      return { lessons };
    } catch (error) {
      console.error("Service Error in getAllLessons:", error.message);
      throw error;
    }
  }

  static async getLessonById(lessonId) {
    try {
      const lesson = await LessonModule.findById(lessonId);
      if (!lesson) {
        throw new Error(`Lesson with ID ${lessonId} not found`);
      }
      return { lesson };
    } catch (error) {
      console.error("Service Error in getLessonById:", error.message);
      throw error;
    }
  }

  static async createLesson(
    name,
    className,
    subjectId,
    materialId,
    teacherId,
    date,
  ) {
    try {
      const lessonId = await LessonModule.create(
        name,
        className,
        subjectId,
        materialId,
        teacherId,
        date,
      );
      return { lessonId, message: "Lesson created successfully" };
    } catch (error) {
      console.error("Service Error in createLesson:", error.message);
      throw error;
    }
  }

  static async updateLesson(
    lessonId,
    name,
    className,
    subjectId,
    materialId,
    teacherId,
    date,
  ) {
    try {
      await LessonModule.update(
        lessonId,
        name,
        className,
        subjectId,
        materialId,
        teacherId,
        date,
      );
      return { message: "Lesson updated successfully" };
    } catch (error) {
      console.error("Service Error in updateLesson:", error.message);
      throw error;
    }
  }

  static async deleteLesson(lessonId) {
    try {
      await LessonModule.delete(lessonId);
      return { message: `Lesson ${lessonId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteLesson:", error.message);
      throw error;
    }
  }
}

export default LessonService;


