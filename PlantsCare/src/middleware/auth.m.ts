import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CONFIG from "../config";

export function authM(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, CONFIG.jwtSecret) as {
      userId: string;
      email: string;
      role: string;
    };
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}