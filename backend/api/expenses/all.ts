import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authUser } from "../../middleware/authUser";
import { getDb } from "../../lib/db";
import { ObjectId } from "mongodb";

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  try {
    const db = await getDb();
    const expensesCollection = db.collection("expenses");
    const usersCollection = db.collection("users");

    const foundUser = await usersCollection.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

    if (!foundUser) throw new Error("User not found");

    const expenses = await expensesCollection
      .find({
        userId: ObjectId.createFromHexString(userId),
      })
      .toArray();

    res.status(201).json(expenses);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}

export default authUser(handler);
