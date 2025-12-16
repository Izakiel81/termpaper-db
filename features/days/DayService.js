import DayModule from "../../lib/models/DayModel.js";
export default DayService;

}
  }
    }
      throw error;
      console.error("Service Error in deleteDay:", error.message);
    } catch (error) {
      return { message: `Day ${dayId} deleted successfully` };
      await DayModule.delete(dayId);
    try {
  static async deleteDay(dayId) {

  }
    }
      throw error;
      console.error("Service Error in updateDay:", error.message);
    } catch (error) {
      return { message: "Day updated successfully" };
      await DayModule.update(dayId, dayName, dayTime, dayWeekday);
    try {
  static async updateDay(dayId, dayName, dayTime, dayWeekday) {

  }
    }
      throw error;
      console.error("Service Error in createDay:", error.message);
    } catch (error) {
      return { dayId, message: "Day created successfully" };
      const dayId = await DayModule.create(dayName, dayTime, dayWeekday);
    try {
  static async createDay(dayName, dayTime, dayWeekday) {

  }
    }
      throw error;
      console.error("Service Error in getDayById:", error.message);
    } catch (error) {
      return { day };
      }
        throw new Error(`Day with ID ${dayId} not found`);
      if (!day) {
      const day = await DayModule.findById(dayId);
    try {
  static async getDayById(dayId) {

  }
    }
      throw error;
      console.error("Service Error in getAllDays:", error.message);
    } catch (error) {
      return { days };
      const days = await DayModule.findAll();
    try {
  static async getAllDays() {
class DayService {


