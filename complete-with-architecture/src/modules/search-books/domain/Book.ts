import { z } from "zod";

export interface Book {
  title: string;
  authors?: string[];
  description?: string;
}

export type SearchText = string;

export const searchSchema = z.string();
