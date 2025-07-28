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
