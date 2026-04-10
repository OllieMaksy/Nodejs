import { Request, Response } from "express";
import {
  createBookSchema,
  updateBookSchema,
} from "../schemas/book.schemas";
import * as booksService from "../services/book.services";

type IdParams = { id: string };

export async function getAllBooks(req: Request, res: Response) {
  const books = await booksService.getAllBooks();
  res.json({ data: books });
}

export async function getBookById(req: Request<IdParams>, res: Response) {
  try {
    const book = await booksService.getBookById(req.params.id);
    res.json({ data: book });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function createBook(req: Request, res: Response) {
  try {
    const parsed = createBookSchema.parse(req.body);
    const book = await booksService.createBook(parsed);
    res.status(201).json({ data: book });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateBook(req: Request<IdParams>, res: Response) {
  try {
    const parsed = updateBookSchema.parse(req.body);
    const book = await booksService.updateBook(req.params.id, parsed);
    res.json({ data: book });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteBook(req: Request<IdParams>, res: Response) {
  try {
    booksService.deleteBook(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}