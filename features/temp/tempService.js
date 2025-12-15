import pool from "../../lib/db.js";
class TempService {
  async createDataSet() {
    const users = pool.query(`SELECT * FROM parents`);

    return users;
  }
}
export default new TempService();
