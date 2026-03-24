import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.c";

export const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", createBook);
booksRouter.put("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);