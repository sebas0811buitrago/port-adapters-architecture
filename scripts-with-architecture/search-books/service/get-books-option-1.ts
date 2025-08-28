import { GetBooksPort } from "../domain/book";

const API_URL_1 = "https://openlibrary.org/search.json?q=";

interface GetBooksOpenLibraryAPisResponse {
  docs: {
    title: string;
    author_name?: string[];
    first_sentence?: string[];
  }[];
}

const getBooksOpenLibraryService = async ({ query }: { query: string }) => {
  const response = await fetch(`${API_URL_1}${encodeURIComponent(query)}`).then(
    (response) => response.json()
  );

  return response as GetBooksOpenLibraryAPisResponse;
};

export const getBooksOption1: GetBooksPort = async (searchTerm) => {
  const response = await getBooksOpenLibraryService({ query: searchTerm });

  console.group("first_sentence", response.docs[0]);

  return response.docs.map(({ title, author_name, first_sentence }) => ({
    title,
    authors: author_name ?? [],
    description: first_sentence?.[0] ?? "",
  }));
};
