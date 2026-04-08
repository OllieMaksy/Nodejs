import { Request, Response } from "express";
import { createLoanSchema } from "../schemas/loan.schemas";
import * as loansService from "../services/loans.services";
type IdParams = { id: string };

export async function getAllLoans(req: Request, res: Response) {
  const loans = await loansService.getAllLoans();
  res.json({ data: loans });
}

export async function createLoan(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const parsed = createLoanSchema.parse(req.body);
    const loan = await loansService.createLoan({...parsed, userId: user.userId });
    res.status(201).json({ data: loan });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function returnLoan(req: Request<IdParams>, res: Response) {
  try {
    const loan = await loansService.returnLoan(req.params.id);
    res.json({ data: loan });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getLoansByUserId = async (userId: number) => {
  return [
    { id: 1, userId, bookId: 1, returned: false },
  ];
};