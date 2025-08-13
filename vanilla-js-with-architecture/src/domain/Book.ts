import { z } from "zod";

export interface Book {
  title: string;
  authors?: string[];
  description?: string;
}

export type SearchText = string;

export const searchSchema = z.string();

export type GetBooksPort = (search: SearchText) => Promise<Book[]>;
