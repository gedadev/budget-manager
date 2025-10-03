import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";
import { hashPassword, generateToken } from "../../lib/auth";

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body as SignupBody;

  try {
    const db = await getDb();
    const users = db.collection("users");

    const foundUser = await users.findOne({ email });

    if (foundUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await hashPassword(password);

    const user = await users.insertOne({
      name,
      email,
      hashedPassword,
      createdAt: new Date(),
    });

    const token = generateToken(user.insertedId.toString());

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
