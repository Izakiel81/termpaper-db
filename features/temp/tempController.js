import tempService from "./tempService.js";
class tempController {
  async createData(req, res, next) {
    try {
      const users = tempService.createDataSet();
      console.log(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new tempController();
