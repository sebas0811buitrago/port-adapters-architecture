import { useState } from "react";
import { Book } from "../domain/Book";
import { getBooksOption1 } from "../service/getBooksOption1";
import { getBooksOption2 } from "../service/getBooksOption2";

const useSearchBook = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");

  const onSearch = async () => {
    if (!query) return;

    const results = await getBooksOption2(query);
    setSearchedBooks(results);
  };

  return {
    searchedBooks,
    query,
    setQuery,
    onSearch,
  };
};

export default useSearchBook;
