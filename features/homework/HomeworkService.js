import HomeworkModule from "../../lib/models/HomeworkModel.js";

class HomeworkService {
  static async getAllHomework() {
    try {
      const homework = await HomeworkModule.findAll();
      return { homework };
    } catch (error) {
      console.error("Service Error in getAllHomework:", error.message);
      throw error;
    }
  }

  static async getHomeworkById(homeworkId) {
    try {
      const homework = await HomeworkModule.findById(homeworkId);
      if (!homework) {
        throw new Error(`Homework with ID ${homeworkId} not found`);
      }
      return { homework };
    } catch (error) {
      console.error("Service Error in getHomeworkById:", error.message);
      throw error;
    }
  }

  static async getHomeworkByStudentOrClass(studentId) {
    try {
      const homework = await HomeworkModule.recieveByStudentOrClass(studentId);
      return { homework };
    } catch (error) {
      console.error(
        "Service Error in getHomeworkByStudentOrClass:",
        error.message,
      );
      throw error;
    }
  }

  static async getHomeworkForTomorrow() {
    try {
      const homework = await HomeworkModule.reciefveForTomorrow();
      return { homework };
    } catch (error) {
      console.error(
        "Service Error in getHomeworkForTomorrow:",
        error.message,
      );
      throw error;
    }
  }

  static async createHomework(
    name,
    description,
    dueDate,
    subjectId,
    classId,
  ) {
    try {
      const homework = await HomeworkModule.create(
        name,
        description,
        dueDate,
        subjectId,
        classId,
      );
      return { homework, message: "Homework created successfully" };
    } catch (error) {
      console.error("Service Error in createHomework:", error.message);
      throw error;
    }
  }

  static async updateHomework(
    homeworkId,
    name,
    description,
    dueDate,
  ) {
    try {
      const homework = await HomeworkModule.update(
        homeworkId,
        name,
        description,
        dueDate,
      );
      return { homework, message: "Homework updated successfully" };
    } catch (error) {
      console.error("Service Error in updateHomework:", error.message);
      throw error;
    }
  }

  static async deleteHomework(homeworkId) {
    try {
      const result = await HomeworkModule.delete(homeworkId);
      return result;
    } catch (error) {
      console.error("Service Error in deleteHomework:", error.message);
      throw error;
    }
  }
}

export default HomeworkService;

