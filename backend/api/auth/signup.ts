import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  try {
    const db = await getDb();
    const users = db.collection("users");

    const foundUser = await users.findOne({ email });

    if (foundUser)
      return res.status(400).json({ error: "User already exists" });

    await users.insertOne({
      name,
      email,
      password,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
