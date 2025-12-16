import MaterialService from "./MaterialService.js";

class MaterialController {
  static async getAllMaterials(req, res, next) {
    try {
      const result = await MaterialService.getAllMaterials();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getMaterialById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Material ID is required" });
      }

      const result = await MaterialService.getMaterialById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createMaterial(req, res, next) {
    try {
      const { name, description, link } = req.body;

      if (!name || !description || !link) {
        return res
          .status(400)
          .json({ error: "name, description, and link are required" });
      }

      const result = await MaterialService.createMaterial(
        name,
        description,
        link,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateMaterial(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, link } = req.body;

      if (!id || !name || !description || !link) {
        return res.status(400).json({
          error: "id, name, description, and link are required",
        });
      }

      const result = await MaterialService.updateMaterial(
        id,
        name,
        description,
        link,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteMaterial(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Material ID is required" });
      }

      const result = await MaterialService.deleteMaterial(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default MaterialController;

