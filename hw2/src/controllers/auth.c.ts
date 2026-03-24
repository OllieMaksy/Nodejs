import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { RegisterDTO, LoginDTO } from "../schemas/auth.chemas";
import client from "../prisma";
import CONFIG from "../config";

export async function register(
    req: Request<{}, {}, RegisterDTO>, 
    res: Response
) { 
    const { name, email, password } = req.body;

  const existingUser = await client.user.findUnique({ 
    where: { email } 
    });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await client.user.create({
    data: { 
        name, 
        email, 
        passwordHash, 
        role: "USER" 
    },
  });

  res.json({ message: "Registration completed" });
  //res.status(201).json({ data: { id: newUser.id, email: newUser.email, name: newUser.name } });
}

export async function login(
    req: Request<{}, {}, LoginDTO>, 
    res: Response
) {
  const { email, password } = req.body;

  const user = await client.user.findUnique({
     where: { email } 
    });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { 
        userId: 
        user.id, 
        email: 
        user.email, 
        role: user.role 
    },
    CONFIG.jwtSecret,
    { 
        expiresIn: "24h" 
    }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}