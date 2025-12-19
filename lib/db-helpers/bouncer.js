import pool from "../db.js";

export const bouncer = async (req, res, work) => {
  const client = await pool.connect();
  const { role, userId } = req.user;

  try {
    await client.query("BEGIN");
    await client.query(`SET ROLE "${role.toLowerCase()}"`);
    await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [
      userId.toString(),
    ]);

    const result = await work(client); // client is passed as 'db' in your models

    await client.query("COMMIT");
    return res.json(result);
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "42501")
      return res.status(403).json({ error: "DB: Unauthorized" });
    res.status(500).json({ error: error.message });
  } finally {
    await client.query("RESET ROLE");
    client.release();
  }
};
