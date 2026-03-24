import { Router } from "express";
import { getAllLoans, createLoan, returnLoan } from "../controllers/loans.c";
import { authM} from "../middleware/auth.m";
import { adminM } from "../middleware/role";

export const loansRouter = Router();

loansRouter.get("/", authM, getAllLoans);
loansRouter.post("/", authM, createLoan);
loansRouter.post("/:id/return", authM, returnLoan);