export type LoanStatus = "active" | "returned";

export type Loan = {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  returnDate: Date | null;
  status: LoanStatus;
};

export const loansStore = new Map<string, Loan>();