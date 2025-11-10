import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authUser } from "../../middleware/authUser";
import { getDb } from "../../lib/db";
import { ObjectId } from "mongodb";
import { withCors } from "../../middleware/withCors";

async function handler(req: VercelRequest, res: VercelResponse) {
  const { userId } = req.body;

  try {
    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne(
      {
        _id: ObjectId.createFromHexString(userId),
      },
      { projection: { hashedPassword: 0 } }
    );

    if (!user) throw new Error("User not found");

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}

export default withCors(authUser(handler));
