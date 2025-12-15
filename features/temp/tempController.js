import tempService from "./tempService.js";
class tempController {
  async getUsers(req, res, next) {
    try {
      const users = await tempService.getUsers();
      res.status(200).json({ users: users.rows, users_count: users.rowCount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async createData(req, res, next) {
    try {
      const users = await tempService.createDataSet();
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async assignRoles(req, res, next) {
    try {
      const { startFrom, roleId } = req.body;
      const roles = await tempService.assignRoles(startFrom, roleId);
      res.status(200).json({ result: roles });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async assignUserToEntity(req, res, next) {
    try {
      const entities = await tempService.assignUsersToEntities();
      res.status(200).json({ result: entities });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new tempController();
