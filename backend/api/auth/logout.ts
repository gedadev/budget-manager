import type { VercelRequest, VercelResponse } from "@vercel/node";
import { parse } from "cookie";
import { getDb } from "../../lib/db";
import { hashToken } from "../../lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rawCookieHeader = req.headers.cookie;

  try {
    if (!rawCookieHeader) throw new Error();

    const cookies = parse(rawCookieHeader);
    const refreshTokenCookie = cookies.refreshToken;

    if (!refreshTokenCookie) throw new Error();

    const db = await getDb();
    const refreshTokenCollection = db.collection("refresh_tokens");
    const hashedToken = hashToken(refreshTokenCookie);

    const foundToken = await refreshTokenCollection.findOne({
      token: hashedToken,
    });

    if (!foundToken) throw new Error();

    await refreshTokenCollection.updateOne(
      { token: hashedToken },
      { $set: { blacklistedAt: new Date() } }
    );

    const cookieString = `refreshToken=; Expires=${new Date(
      0
    ).toUTCString()}; Path=/; HttpOnly; Secure; SameSite=Lax`;

    res.setHeader("Set-Cookie", cookieString);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
