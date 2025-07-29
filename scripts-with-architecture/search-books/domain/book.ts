export interface Book {
  title: string;
  authors: string[];
  description: string;
}

export type SearchTerm = string;

export type GetBooksPort = (searchTerm: SearchTerm) => Promise<Book[]>;
