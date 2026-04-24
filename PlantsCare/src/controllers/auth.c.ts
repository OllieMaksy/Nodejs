import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { RegisterDTO, LoginDTO, RequestPasswordResetDTO, ResetPasswordDTO } from "../schemas/auth.schemas";
import sendMail from "../utils/sendMail";
import client from "../prisma";
import CONFIG from "../config";

export async function register(req: Request<{}, {}, RegisterDTO>, res: Response) { 
  const { name, email, password } = req.body;

  const existingUser = await client.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await client.user.create({
    data: { name, email, passwordHash, role: "USER" },
  });

  res.json({ message: "Registration completed" });
}

export async function login(req: Request<{}, {}, LoginDTO>, res: Response) {
  const { email, password } = req.body;

  const user = await client.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    CONFIG.jwtSecret,
    { expiresIn: "24h" }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function requestPasswordReset(req: Request<{}, {}, RequestPasswordResetDTO>, res: Response) {
  const { email } = req.body;

  const user = await client.user.findUnique({ where: { email } });

  if (user) {
    const resetToken = jwt.sign(
      { email: user.email },
      CONFIG.jwtSecret,
      { expiresIn: "10m" }
    );

    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await client.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires: expires },
    });

    await sendMail({
      to: email,
      subject: "Password reset",
      text: `Your reset token: ${resetToken}`,
      html: `<p>Your reset token: <strong>${resetToken}</strong></p>`,
    });
  }

  res.json({ message: "If the email exists, a reset token has been sent" });
}

export async function resetPassword(req: Request<{}, {}, ResetPasswordDTO>, res: Response) {
  const { token, password } = req.body;

  try {
    const payload = jwt.verify(token, CONFIG.jwtSecret) as { email: string };

    const user = await client.user.findUnique({ where: { email: payload.email } });

    if (!user || user.resetToken !== token || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await client.user.update({
      where: { email: payload.email },
      data: { passwordHash, resetToken: null, resetTokenExpires: null },
    });

    res.json({ message: "Пароль успішно змінено." });
  } catch {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
}