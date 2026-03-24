import { Router } from "express";
import {
  getAllLoans,
  createLoan,
  returnLoan,
} from "../controllers/loans.c";

export const loansRouter = Router();

loansRouter.get("/", getAllLoans);
loansRouter.post("/", createLoan);
loansRouter.post("/:id/return", returnLoan);