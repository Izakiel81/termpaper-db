import DayModule from "../../lib/models/DayModel.js";

class DayService {
  static async getAllDays() {
    try {
      const days = await DayModule.findAll();
      return { days };
    } catch (error) {
      console.error("Service Error in getAllDays:", error.message);
      throw error;
    }
  }

  static async getDayById(dayId) {
    try {
      const day = await DayModule.findById(dayId);
      if (!day) {
        throw new Error(`Day with ID ${dayId} not found`);
      }
      return { day };
    } catch (error) {
      console.error("Service Error in getDayById:", error.message);
      throw error;
    }
  }

  static async createDay(dayName, dayTime, dayWeekday) {
    try {
      const dayId = await DayModule.create(dayName, dayTime, dayWeekday);
      return { dayId, message: "Day created successfully" };
    } catch (error) {
      console.error("Service Error in createDay:", error.message);
      throw error;
    }
  }

  static async updateDay(dayId, dayName, dayTime, dayWeekday) {
    try {
      await DayModule.update(dayId, dayName, dayTime, dayWeekday);
      return { message: "Day updated successfully" };
    } catch (error) {
      console.error("Service Error in updateDay:", error.message);
      throw error;
    }
  }

  static async deleteDay(dayId) {
    try {
      await DayModule.delete(dayId);
      return { message: `Day ${dayId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteDay:", error.message);
      throw error;
    }
  }
}

export default DayService;


