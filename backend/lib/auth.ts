import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}
