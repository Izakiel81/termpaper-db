import JournalModel from "../../lib/models/JournalModel.js";

class JournalService {
  static async getAllJournals() {
    try {
      const journals = await JournalModel.findAll();
      return { journals };
    } catch (error) {
      console.error("Service Error in getAllJournals:", error.message);
      throw error;
    }
  }

  static async getJournalById(journalId) {
    try {
      const journal = await JournalModel.findById(journalId);
      if (!journal) {
        throw new Error(`Journal with ID ${journalId} not found`);
      }
      return { journal };
    } catch (error) {
      console.error("Service Error in getJournalById:", error.message);
      throw error;
    }
  }

  static async createJournal(teacherId, name) {
    try {
      const journal = await JournalModel.create(teacherId, name);
      return { journal, message: "Journal created successfully" };
    } catch (error) {
      console.error("Service Error in createJournal:", error.message);
      throw error;
    }
  }

  static async updateJournal(journalId, teacherId, name) {
    try {
      const journal = await JournalModel.update(journalId, teacherId, name);
      return { journal, message: "Journal updated successfully" };
    } catch (error) {
      console.error("Service Error in updateJournal:", error.message);
      throw error;
    }
  }

  static async deleteJournal(journalId) {
    try {
      const result = await JournalModel.delete(journalId);
      return result;
    } catch (error) {
      console.error("Service Error in deleteJournal:", error.message);
      throw error;
    }
  }

  static async getJournalByStudent(studentId) {
    try {
      const entries = await JournalModel.findByStudentId(studentId);
      return { entries };
    } catch (error) {
      console.error("Service Error in getJournalByStudent:", error.message);
      throw error;
    }
  }
}

export default JournalService;


