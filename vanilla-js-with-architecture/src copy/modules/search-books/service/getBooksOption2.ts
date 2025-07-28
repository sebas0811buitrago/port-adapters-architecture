import { GetBooksPort } from "../domain/ports";

const API_URL_2 = "https://openlibrary.org/search.json?q=";

interface GetBooksOpenLibraryAPisResponse {
  docs: {
    title: string;
    author_name?: string[];
    first_sentence?: string[];
  }[];
}

const getBooksOpenLibraryService = async ({ query }: { query: string }) => {
  const response = await fetch(`${API_URL_2}${encodeURIComponent(query)}`).then(
    (response) => response.json()
  );

  return response as GetBooksOpenLibraryAPisResponse;
};

export const getBooksOption2: GetBooksPort = async (search: string) => {
  const response = await getBooksOpenLibraryService({
    query: search,
  });

  console.log(response.docs);

  return response.docs.map(({ title, author_name, first_sentence }) => ({
    title,
    authors: author_name,
    description: first_sentence?.[0],
  }));
};
