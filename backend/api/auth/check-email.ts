import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";
import { withCors } from "../../middleware/withCors";

interface ReqBody {
  email: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log(req.body);
  const { email } = req.body as ReqBody;

  try {
    const db = await getDb();
    const users = db.collection("users");

    const foundUser = await users.findOne({ email });

    res.status(200).json({ foundUser: !!foundUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export default withCors(handler);
