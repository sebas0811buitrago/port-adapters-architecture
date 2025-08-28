export interface Book {
  title: string;
  authors: string[];
  description: string;
}

export type SearchTerm = string;

export const isValidSearchTerm = (searchTerm: SearchTerm) =>
  Boolean(searchTerm.trim());

export type GetBooksPort = (searchTerm: SearchTerm) => Promise<Book[]>;
