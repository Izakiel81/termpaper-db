import TimetableModel from "../../lib/models/TimetabModel.js";

class TimetableService {
  static async getAllTimetables() {
    try {
      const timetables = await TimetableModel.find();
      return { timetables };
    } catch (error) {
      console.error("Service Error in getAllTimetables:", error.message);
      throw error;
    }
  }

  static async getTimetableById(timetableId) {
    try {
      const timetable = await TimetableModel.findById(timetableId);
      if (!timetable) {
        throw new Error(`Timetable with ID ${timetableId} not found`);
      }
      return { timetable };
    } catch (error) {
      console.error("Service Error in getTimetableById:", error.message);
      throw error;
    }
  }

  static async createTimetable(name, classId) {
    try {
      const timetable = await TimetableModel.create(name, classId);
      return { timetable, message: "Timetable created successfully" };
    } catch (error) {
      console.error("Service Error in createTimetable:", error.message);
      throw error;
    }
  }

  static async updateTimetable(timetableId, name, classId) {
    try {
      const timetable = await TimetableModel.update(timetableId, name, classId);
      return { timetable, message: "Timetable updated successfully" };
    } catch (error) {
      console.error("Service Error in updateTimetable:", error.message);
      throw error;
    }
  }

  static async deleteTimetable(timetableId) {
    try {
      const result = await TimetableModel.delete(timetableId);
      return result;
    } catch (error) {
      console.error("Service Error in deleteTimetable:", error.message);
      throw error;
    }
  }

  static async getWeeklyTimetable(timetableId) {
    try {
      const timetable = await TimetableModel.weekById(timetableId);
      return { timetable: timetable || [] };
    } catch (error) {
      console.error("Service Error in getWeeklyTimetable:", error.message);
      throw error;
    }
  }

  static async getTimetableByStudentId(studentId) {
    try {
      const timetable = await TimetableModel.findTimetablebyStudentId(studentId);
      return { timetable };
    } catch (error) {
      console.error("Service Error in getTimetableByStudentId:", error.message);
      throw error;
    }
  }
}

export default TimetableService;


