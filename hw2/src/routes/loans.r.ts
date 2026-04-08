import { Router } from "express";
import { createLoan, returnLoan } from "../controllers/loans.c";
import { authM } from "../middleware/auth.m";
import * as loansService from "../services/loans.services";

export const loansRouter = Router();

loansRouter.get("/", authM, async (req, res) => {
  const user = (req as any).user;
  if (user.role === "ADMIN") {
    const loans = await loansService.getAllLoans();
    return res.json({ data: loans });
  } else {
    const loans = await loansService.getLoansByUserId(user.userId);
    return res.json({ data: loans });
  }
});

loansRouter.post("/", authM, createLoan);
loansRouter.post("/:id/return", authM, returnLoan);