import MaterialModule from "../../lib/models/MaterialModel.js";

class MaterialService {
  static async getAllMaterials() {
    try {
      const materials = await MaterialModule.findAll();
      return { materials };
    } catch (error) {
      console.error("Service Error in getAllMaterials:", error.message);
      throw error;
    }
  }

  static async getMaterialById(materialId) {
    try {
      const material = await MaterialModule.findById(materialId);
      if (!material) {
        throw new Error(`Material with ID ${materialId} not found`);
      }
      return { material };
    } catch (error) {
      console.error("Service Error in getMaterialById:", error.message);
      throw error;
    }
  }

  static async createMaterial(name, description, link) {
    try {
      const materialId = await MaterialModule.create(name, description, link);
      return { materialId, message: "Material created successfully" };
    } catch (error) {
      console.error("Service Error in createMaterial:", error.message);
      throw error;
    }
  }

  static async updateMaterial(materialId, name, description, link) {
    try {
      await MaterialModule.update(materialId, name, description, link);
      return { message: "Material updated successfully" };
    } catch (error) {
      console.error("Service Error in updateMaterial:", error.message);
      throw error;
    }
  }

  static async deleteMaterial(materialId) {
    try {
      await MaterialModule.delete(materialId);
      return { message: `Material ${materialId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteMaterial:", error.message);
      throw error;
    }
  }
}

export default MaterialService;


