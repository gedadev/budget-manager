import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";
import { verifyPassword, generateToken } from "../../lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const db = await getDb();
    const users = db.collection("users");

    const foundUser = await users.findOne({ email });

    if (!foundUser)
      return res.status(401).json({ error: "Invalid credentials" });

    const isValidPassword = await verifyPassword(
      password,
      foundUser.hashedPassword
    );

    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(foundUser._id.toString());

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
