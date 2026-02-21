import { loansStore, Loan } from "../storage/loans.store";
import { booksStore } from "../storage/books.store";
import { getBookById } from "./book.services";
import { getUserById } from "./users.services";
import { CreateLoanDto } from "../schemas/loan.schemas";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function getAllLoans(): Loan[] {
  return Array.from(loansStore.values());
}

export function createLoan(data: CreateLoanDto): Loan {
  const user = getUserById(data.userId);
  const book = getBookById(data.bookId);

  if (!book.available) {
    throw new Error("Book is not available");
  }

  const activeLoanExists = Array.from(loansStore.values()).some(
    (loan) =>
      loan.bookId === data.bookId && loan.status === "active"
  );

  if (activeLoanExists) {
    throw new Error("Active loan already exists");
  }

  const newLoan: Loan = {
    id: generateId(),
    userId: user.id,
    bookId: book.id,
    loanDate: new Date(),
    returnDate: null,
    status: "active",
  };

  loansStore.set(newLoan.id, newLoan);

  booksStore.set(book.id, {
    ...book,
    available: false,
  });

  return newLoan;
}

export function returnLoan(id: string): Loan {
  const loan = loansStore.get(id);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status === "returned") {
    throw new Error("Loan already returned");
  }

  const updatedLoan: Loan = {
    ...loan,
    status: "returned",
    returnDate: new Date(),
  };

  loansStore.set(id, updatedLoan);

  const book = booksStore.get(loan.bookId);

  if (book) {
    booksStore.set(book.id, {
      ...book,
      available: true,
    });
  }

  return updatedLoan;
}