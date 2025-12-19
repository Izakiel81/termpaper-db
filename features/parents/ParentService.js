import ParentModel from "../../lib/models/ParentModel.js";

class ParentService {
  static async getAllParents() {
    try {
      const parents = await ParentModel.findAll();
      return { parents };
    } catch (error) {
      console.error("Service Error in getAllParents:", error.message);
      throw error;
    }
  }

  static async getParentById(parentId) {
    try {
      const parent = await ParentModel.findById(parentId);
      if (!parent) {
        throw new Error(`Parent with ID ${parentId} not found`);
      }
      return { parent };
    } catch (error) {
      console.error("Service Error in getParentById:", error.message);
      throw error;
    }
  }

  static async createParent(name, surname, patronym, phone, user_id = null) {
    try {
      const parentId = await ParentModel.create(
        name,
        surname,
        patronym,
        phone,
        user_id,
      );
      return { parentId, message: "Parent created successfully" };
    } catch (error) {
      console.error("Service Error in createParent:", error.message);
      throw error;
    }
  }

  static async updateParent(
    parentId,
    name,
    surname,
    patronym,
    phone,
    user_id = null,
  ) {
    try {
      await ParentModel.update(
        parentId,
        name,
        surname,
        patronym,
        phone,
        user_id,
      );
      return { message: "Parent updated successfully" };
    } catch (error) {
      console.error("Service Error in updateParent:", error.message);
      throw error;
    }
  }

  static async deleteParent(parentId) {
    try {
      await ParentModel.delete(parentId);
      return { message: `Parent ${parentId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteParent:", error.message);
      throw error;
    }
  }
}

export default ParentService;
