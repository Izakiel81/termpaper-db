import pool from "../../lib/db.js";
import TeacherModel from "../../lib/models/TeacherModel.js";
class TeacherService {
  static async getTeacher() {
    try {
      const teachers = await TeacherModel.findAll();
      return teachers;
    }
    catch (error) {
        console.error({ error: error.message });
    }
  }

  static async getTeacherById(id) {
    try {
      const teacher = await TeacherModel.findById(id);
      return teacher;
    }
    catch (error) {
        console.error({ error: error.message });
    }
  }

  // Views

  static async getTeacherWithClasses() {
    try {
      const teachers = await TeacherModel.withClasses();
      return teachers;
    }
    catch (error) {
        console.error({ error: error.message });
    }
  }

  // Functions

  static async getTeacherSalary(teacherId, fromDate, toDate) {
    try {
        const salary = await TeacherModel.recieveSalary(teacherId, fromDate, toDate);
        return salary;
        }
    catch (error) {
        console.error({ error: error.message });
    }

  }

  // Procedures
  static async addTeacher(name, surname, patronym, phone) {
    try {
        const newTeacher = await TeacherModel.create(name, surname, patronym, phone);
        return newTeacher;
    }
    catch (error) {
        console.error({ error: error.message });
    }

  }
  static async updateTeacher(id, name, surname, patronym, phone) {
    try {
        const updatedTeacher = await TeacherModel.update(id, name, surname, patronym, phone);
        return updatedTeacher;
    }
    catch (error) {
        console.error({ error: error.message });
    }
  }
  static async deleteTeacher(id) {
    try {
      await TeacherModel.delete(id);
      return "Object deleted successfully";
    }
    catch (error) {
      console.error({ error: error.message });
    }
  }
}
export default TeacherService;
