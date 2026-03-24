import client from "../prisma";
import { CreateBookDto, UpdateBookDto } from "../schemas/book.schemas";


export async function getAllBooks() {
  const books = await client.book.findMany();
  return books;
}

export async function getBookById(id: string) {
  const book = await client.book.findUnique({ where: { id } });
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
}

export async function createBook(data: CreateBookDto) {
  const isbnExists = await client.book.findUnique({ where: { isbn: data.isbn } });
  if (isbnExists) {
    throw new Error("ISBN must be unique");
  }

  const newBook = await client.book.create({
    data: { ...data, available: true },
  });
  return newBook;
}

export async function updateBook(id: string, data: UpdateBookDto) {
  const book = await getBookById(id);

  const updatedBook = await client.book.update({
    where: { id },
    data: { ...book, ...data },
  });
  return updatedBook;
}

export async function deleteBook(id: string) {
  await getBookById(id);
  await client.book.delete({ where: { id } });
}