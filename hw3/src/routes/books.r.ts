import { Router } from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/books.c";
import { authM } from "../middleware/auth.m";
import { adminM } from "../middleware/role";

export const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", authM, adminM, createBook);
booksRouter.put("/:id", authM, adminM, updateBook);
booksRouter.delete("/:id", authM, adminM, deleteBook);