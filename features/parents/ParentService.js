import ParentModel from "../../lib/models/ParentModel.js";
export default ParentService;

}
  }
    }
      throw error;
      console.error("Service Error in deleteParent:", error.message);
    } catch (error) {
      return { message: `Parent ${parentId} deleted successfully` };
      await ParentModel.delete(parentId);
    try {
  static async deleteParent(parentId) {

  }
    }
      throw error;
      console.error("Service Error in updateParent:", error.message);
    } catch (error) {
      return { message: "Parent updated successfully" };
      await ParentModel.update(parentId, name, surname, patronym, phone);
    try {
  static async updateParent(parentId, name, surname, patronym, phone) {

  }
    }
      throw error;
      console.error("Service Error in createParent:", error.message);
    } catch (error) {
      return { parentId, message: "Parent created successfully" };
      const parentId = await ParentModel.create(name, surname, patronym, phone);
    try {
  static async createParent(name, surname, patronym, phone) {

  }
    }
      throw error;
      console.error("Service Error in getParentById:", error.message);
    } catch (error) {
      return { parent };
      }
        throw new Error(`Parent with ID ${parentId} not found`);
      if (!parent) {
      const parent = await ParentModel.findById(parentId);
    try {
  static async getParentById(parentId) {

  }
    }
      throw error;
      console.error("Service Error in getAllParents:", error.message);
    } catch (error) {
      return { parents };
      const parents = await ParentModel.findAll();
    try {
  static async getAllParents() {
class ParentService {


