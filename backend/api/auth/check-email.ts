import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";

interface ReqBody {
  email: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as ReqBody;

  console.log(req.body);
  console.log(email);
  try {
    const db = await getDb();
    const users = db.collection("users");

    const foundUser = await users.findOne({ email });

    res.status(200).json({ foundUser: !!foundUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
