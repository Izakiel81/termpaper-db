import pool from "../db.js";

export const bouncer = async (req, res, work) => {
  const client = await pool.connect();
  const { role, id } = req.user;

  try {
    await client.query("BEGIN");

    await client.query(`SET ROLE "${role.toLocaleLowerCase()}"`);

    await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [
      id.toString(),
    ]);

    const result = await work(client);

    await client.query("COMMIT");
    return res.json(result);
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "42501") {
      console.error(`Access Denied for role: ${role}`);
      return res
        .status(403)
        .json({ error: "Postgres Security: Insufficient Privileges." });
    }
    console.error("Database Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.query("RESET ROLE");
    client.release();
  }
};
