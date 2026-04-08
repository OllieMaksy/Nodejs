import client from "../prisma";
import { CreateLoanDto } from "../schemas/loan.schemas";

export async function getAllLoans() {
  const loans = await client.loan.findMany();
  return loans;
}

export async function createLoan(data: CreateLoanDto & { userId: string }) {
  const user = await client.user.findUnique({ where: { id: data.userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const book = await client.book.findUnique({ where: { id: data.bookId } });
  if (!book) {
    throw new Error("Book not found");
  }

  if (!book.available) {
    throw new Error("Book is not available");
  }

  const activeLoanExists = await client.loan.findFirst({
    where: { bookId: data.bookId, status: "ACTIVE" },
  });

  if (activeLoanExists) {
    throw new Error("Active loan already exists");
  }

  const newLoan = await client.loan.create({
    data: {
      userId: data.userId,
      bookId: data.bookId,
      status: "ACTIVE",
    },
  });

  await client.book.update({
    where: { id: data.bookId },
    data: { available: false },
  });

  return newLoan;
}

export async function returnLoan(id: string) {
  const loan = await client.loan.findUnique({ where: { id } });

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status === "RETURNED") {
    throw new Error("Loan already returned");
  }

  const updatedLoan = await client.loan.update({
    where: { id },
    data: { status: "RETURNED", returnDate: new Date() },
  });

  await client.book.update({
    where: { id: loan.bookId },
    data: { available: true },
  });

  return updatedLoan;
}
export async function getLoansByUserId(userId: string) {
  const loans = await client.loan.findMany({ where: { userId } });
  return loans;
}