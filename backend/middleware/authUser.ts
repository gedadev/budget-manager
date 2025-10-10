import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyToken } from "../lib/auth";

type Handler = (req: VercelRequest, res: VercelResponse) => void;

export function authUser(handler: Handler): Handler {
  const authHandler = async (
    req: VercelRequest,
    res: VercelResponse
  ): Promise<void | VercelResponse> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error();

      const data = verifyToken(token);
      if (!data || typeof data === "string") throw new Error();

      const userId = data.userId;
      req.body.userId = userId;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };

  return authHandler;
}
