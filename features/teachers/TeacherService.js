import TeacherModel from "../../lib/models/TeacherModel.js";

class TeacherService {
  static async getAllTeachers() {
    try {
      const teachers = await TeacherModel.findAll();
      return { teachers };
    } catch (error) {
      console.error("Service Error in getAllTeachers:", error.message);
      throw error;
    }
  }

  static async getTeacherById(teacherId) {
    try {
      const teacher = await TeacherModel.findById(teacherId);
      if (!teacher) {
        throw new Error(`Teacher with ID ${teacherId} not found`);
      }
      return { teacher };
    } catch (error) {
      console.error("Service Error in getTeacherById:", error.message);
      throw error;
    }
  }

  static async getTeachersWithClasses() {
    try {
      const teachers = await TeacherModel.withClasses();
      return { teachers };
    } catch (error) {
      console.error("Service Error in getTeachersWithClasses:", error.message);
      throw error;
    }
  }

  static async getTeacherSalary(teacherId, fromDate, toDate) {
    try {
      const salary = await TeacherModel.recieveSalary(
        teacherId,
        fromDate,
        toDate,
      );
      return { salary };
    } catch (error) {
      console.error("Service Error in getTeacherSalary:", error.message);
      throw error;
    }
  }

  static async createTeacher(name, surname, patronym, phone, user_id) {
    try {
      const teacherId = await TeacherModel.create(
        name,
        surname,
        patronym,
        phone,
        user_id,
      );
      return { teacherId, message: "Teacher created successfully" };
    } catch (error) {
      console.error("Service Error in createTeacher:", error.message);
      throw error;
    }
  }

  static async updateTeacher(
    teacherId,
    name,
    surname,
    patronym,
    phone,
    user_id,
  ) {
    try {
      await TeacherModel.update(
        teacherId,
        name,
        surname,
        patronym,
        phone,
        user_id,
      );
      return { message: "Teacher updated successfully" };
    } catch (error) {
      console.error("Service Error in updateTeacher:", error.message);
      throw error;
    }
  }

  static async deleteTeacher(teacherId) {
    try {
      await TeacherModel.delete(teacherId);
      return { message: `Teacher ${teacherId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteTeacher:", error.message);
      throw error;
    }
  }
}

export default TeacherService;
