import { Request, Response } from "express";
import {
  createBookSchema,
  updateBookSchema,
} from "../schemas/book.schemas";
import * as booksService from "../services/book.services";

type IdParams = { id: string };

export function getAllBooks(req: Request, res: Response) {
  const books = booksService.getAllBooks();
  res.json({ data: books });
}

export function getBookById(req: Request<IdParams>, res: Response) {
  try {
    const book = booksService.getBookById(req.params.id);
    res.json({ data: book });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export function createBook(req: Request, res: Response) {
  try {
    const parsed = createBookSchema.parse(req.body);
    const book = booksService.createBook(parsed);
    res.status(201).json({ data: book });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export function updateBook(req: Request<IdParams>, res: Response) {
  try {
    const parsed = updateBookSchema.parse(req.body);
    const book = booksService.updateBook(req.params.id, parsed);
    res.json({ data: book });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export function deleteBook(req: Request<IdParams>, res: Response) {
  try {
    booksService.deleteBook(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}