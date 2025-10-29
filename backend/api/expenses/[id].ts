import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authUser } from "../../middleware/authUser";
import { getDb } from "../../lib/db";
import { ObjectId } from "mongodb";

async function handler(req: VercelRequest, res: VercelResponse) {
  const { userId } = req.body;
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const db = await getDb();
      const expensesCollection = db.collection("expenses");
      const usersCollection = db.collection("users");

      const foundUser = await usersCollection.findOne({
        _id: ObjectId.createFromHexString(userId),
      });

      if (!foundUser) throw new Error("User not found");

      await expensesCollection.deleteOne({
        _id: ObjectId.createFromHexString(id as string),
      });

      return res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    const {
      amount,
      date,
      commerce,
      description,
      categoryId,
      subcategoryId,
      method,
    } = req.body;

    try {
      const db = await getDb();
      const expensesCollection = db.collection("expenses");
      const usersCollection = db.collection("users");

      const foundUser = await usersCollection.findOne({
        _id: ObjectId.createFromHexString(userId),
      });

      if (!foundUser) throw new Error("User not found");

      await expensesCollection.updateOne(
        {
          _id: ObjectId.createFromHexString(id as string),
        },
        {
          $set: {
            amount: Number(amount),
            date: new Date(date),
            commerce,
            description,
            categoryId,
            subcategoryId,
            method,
          },
        }
      );

      return res.status(200).json({ message: "Expense updated" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.end();
}

export default authUser(handler);
