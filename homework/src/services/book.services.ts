import { booksStore, Book } from "../storage/books.store";
import { CreateBookDto, UpdateBookDto } from "../schemas/book.schemas";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function getAllBooks(): Book[] {
  return Array.from(booksStore.values());
}

export function getBookById(id: string): Book {
  const book = booksStore.get(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
}

export function createBook(data: CreateBookDto): Book {
  const isbnExists = Array.from(booksStore.values()).some(
    (book) => book.isbn === data.isbn
  );

  if (isbnExists) {
    throw new Error("ISBN must be unique");
  }

  const newBook: Book = {
    id: generateId(),
    ...data,
    available: true,
  };

  booksStore.set(newBook.id, newBook);
  return newBook;
}

export function updateBook(id: string, data: UpdateBookDto): Book {
  const book = getBookById(id);

  const updatedBook: Book = {
    ...book,
    ...data,
  };

  booksStore.set(id, updatedBook);
  return updatedBook;
}

export function deleteBook(id: string): void {
  if (!booksStore.delete(id)) {
    throw new Error("Book not found");
  }
}