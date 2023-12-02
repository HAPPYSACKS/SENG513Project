import admin from "../utils/firebaseInit";
import { Request } from "express";

export async function verifyToken(
  req: Request
): Promise<admin.auth.DecodedIdToken> {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) throw new Error("No token provided");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
