import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hashPassword, generateTokens, hashToken } from "../../lib/auth";
import { getDb } from "../../lib/db";

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
    const usersCollection = db.collection("users");
    const refreshTokenCollection = db.collection("refresh_tokens");

    const foundUser = await usersCollection.findOne({ email });

    if (foundUser) throw new Error("User already exists, sign in to continue");

    const hashedPassword = await hashPassword(password);

    const user = await usersCollection.insertOne({
      name,
      email,
      hashedPassword,
      createdAt: new Date(),
    });

    const userId = String(user.insertedId);

    const { accessToken, refreshToken } = generateTokens(userId);

    const hashedToken = hashToken(refreshToken);
    const maxAgeSeconds = 60 * 60 * 24 * 30; // 30 days

    await refreshTokenCollection.insertOne({
      userId,
      token: hashedToken,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + maxAgeSeconds * 1000),
      blacklistedAt: null,
    });

    const cookieString = `refreshToken=${refreshToken}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; Secure; SameSite=Lax`;

    res.setHeader("Set-Cookie", cookieString);
    res.status(201).json({ token: accessToken });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}
