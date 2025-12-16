import JournalModel from "../../lib/models/JournalModel.js";
export default JournalService;

}
  }
    }
      throw error;
      console.error("Service Error in deleteJournal:", error.message);
    } catch (error) {
      return result;
      const result = await JournalModel.delete(journalId);
    try {
  static async deleteJournal(journalId) {

  }
    }
      throw error;
      console.error("Service Error in updateJournal:", error.message);
    } catch (error) {
      return { journal, message: "Journal updated successfully" };
      const journal = await JournalModel.update(journalId, teacherId, name);
    try {
  static async updateJournal(journalId, teacherId, name) {

  }
    }
      throw error;
      console.error("Service Error in createJournal:", error.message);
    } catch (error) {
      return { journal, message: "Journal created successfully" };
      const journal = await JournalModel.create(teacherId, name);
    try {
  static async createJournal(teacherId, name) {

  }
    }
      throw error;
      console.error("Service Error in getJournalById:", error.message);
    } catch (error) {
      return { journal };
      }
        throw new Error(`Journal with ID ${journalId} not found`);
      if (!journal) {
      const journal = await JournalModel.findById(journalId);
    try {
  static async getJournalById(journalId) {

  }
    }
      throw error;
      console.error("Service Error in getAllJournals:", error.message);
    } catch (error) {
      return { journals };
      const journals = await JournalModel.findAll();
    try {
  static async getAllJournals() {
class JournalService {


