import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyPassword, generateTokens, hashToken } from "../../lib/auth";
import { getDb } from "../../lib/db";
import { withCors } from "../../middleware/withCors";

interface LoginBody {
  email: string;
  password: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body as LoginBody;

  try {
    const db = await getDb();
    const usersCollection = db.collection("users");
    const refreshTokenCollection = db.collection("refresh_tokens");

    const foundUser = await usersCollection.findOne({ email });

    if (!foundUser) throw new Error("Invalid credentials");

    const isValidPassword = await verifyPassword(
      password,
      foundUser.hashedPassword
    );

    if (!isValidPassword) throw new Error("Invalid credentials");

    const userId = String(foundUser._id);

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
    res.status(200).json({ token: accessToken });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}

export default withCors(handler);
