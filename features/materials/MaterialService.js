import MaterialModule from "../../lib/models/MaterialModel.js";
export default MaterialService;

}
  }
    }
      throw error;
      console.error("Service Error in deleteMaterial:", error.message);
    } catch (error) {
      return { message: `Material ${materialId} deleted successfully` };
      await MaterialModule.delete(materialId);
    try {
  static async deleteMaterial(materialId) {

  }
    }
      throw error;
      console.error("Service Error in updateMaterial:", error.message);
    } catch (error) {
      return { message: "Material updated successfully" };
      await MaterialModule.update(materialId, name, description, link);
    try {
  static async updateMaterial(materialId, name, description, link) {

  }
    }
      throw error;
      console.error("Service Error in createMaterial:", error.message);
    } catch (error) {
      return { materialId, message: "Material created successfully" };
      const materialId = await MaterialModule.create(name, description, link);
    try {
  static async createMaterial(name, description, link) {

  }
    }
      throw error;
      console.error("Service Error in getMaterialById:", error.message);
    } catch (error) {
      return { material };
      }
        throw new Error(`Material with ID ${materialId} not found`);
      if (!material) {
      const material = await MaterialModule.findById(materialId);
    try {
  static async getMaterialById(materialId) {

  }
    }
      throw error;
      console.error("Service Error in getAllMaterials:", error.message);
    } catch (error) {
      return { materials };
      const materials = await MaterialModule.findAll();
    try {
  static async getAllMaterials() {
class MaterialService {


