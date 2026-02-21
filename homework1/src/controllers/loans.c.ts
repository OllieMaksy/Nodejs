import { Request, Response } from "express";
import { createLoanSchema } from "../schemas/loan.schemas";
import * as loansService from "../services/loans.services";
type IdParams = { id: string };

export function getAllLoans(req: Request, res: Response) {
  const loans = loansService.getAllLoans();
  res.json({ data: loans });
}

export function createLoan(req: Request, res: Response) {
  try {
    const parsed = createLoanSchema.parse(req.body);
    const loan = loansService.createLoan(parsed);
    res.status(201).json({ data: loan });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export function returnLoan(req: Request<IdParams>, res: Response) {
  try {
    const loan = loansService.returnLoan(req.params.id);
    res.json({ data: loan });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}