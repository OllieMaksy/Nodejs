export type Book = {
    id: string;
    title: string;
    author: string;
    year: number;
    isbn: string;
    available: boolean;
  };
  
  export const booksStore = new Map<string, Book>();