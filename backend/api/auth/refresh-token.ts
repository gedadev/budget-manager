import type { VercelRequest, VercelResponse } from "@vercel/node";
import { parse } from "cookie";
import { getDb } from "../../lib/db";
import { generateTokens, hashToken } from "../../lib/auth";
import { withCors } from "../../middleware/withCors";

async function handler(req: VercelRequest, res: VercelResponse) {
  const rawCookieHeader = req.headers.cookie;

  try {
    if (!rawCookieHeader) throw new Error("Invalid session");

    const cookies = parse(rawCookieHeader);
    const refreshTokenCookie = cookies.refreshToken;

    if (!refreshTokenCookie) throw new Error("Invalid session");

    const db = await getDb();
    const refreshTokenCollection = db.collection("refresh_tokens");
    const hashedToken = hashToken(refreshTokenCookie);

    const foundToken = await refreshTokenCollection.findOne({
      token: hashedToken,
    });

    if (
      !foundToken ||
      foundToken.expiresAt < new Date() ||
      foundToken.blacklistedAt
    )
      throw new Error("Session expired");

    const userId = foundToken.userId;
    const { accessToken, refreshToken } = generateTokens(userId);

    const newHashedToken = hashToken(refreshToken);
    const maxAgeSeconds = 60 * 60 * 24 * 30; // 30 days

    await refreshTokenCollection.insertOne({
      userId,
      token: newHashedToken,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + maxAgeSeconds * 1000),
      blacklistedAt: null,
    });

    await refreshTokenCollection.updateOne(
      { token: hashedToken },
      { $set: { blacklistedAt: new Date() } }
    );

    const cookieString = `refreshToken=${refreshToken}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; Secure; SameSite=Lax`;

    res.setHeader("Set-Cookie", cookieString);
    res.status(200).json({ token: accessToken });
  } catch (error) {
    if (error instanceof Error)
      return res.status(403).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}

export default withCors(handler);
