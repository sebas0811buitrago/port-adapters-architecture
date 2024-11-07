import { Book, SearchText } from "./Book";

export type GetBooksPort = (search: SearchText) => Promise<Book[]>;
