import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";
import { authUser } from "../../middleware/authUser";
import { ObjectId } from "mongodb";

interface NewExpenseBody {
  amount: string;
  date: string;
  commerce: string;
  description: string;
  category: string;
  subcategory: string;
  method: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, date, commerce, description, category, subcategory, method } =
    req.body as NewExpenseBody;
  const { userId } = req.body;

  try {
    const db = await getDb();
    const expensesCollection = db.collection("expenses");
    const usersCollection = db.collection("users");

    const foundUser = await usersCollection.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

    if (!foundUser) throw new Error("User not found");

    const newExpense = await expensesCollection.insertOne({
      amount: Number(amount),
      date: new Date(date),
      commerce,
      description,
      category,
      subcategory,
      method,
      userId,
    });

    res.status(201).json({ message: "Expense created successfully" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}

export default authUser(handler);
