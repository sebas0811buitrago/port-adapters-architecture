import { GetBooksPort } from "../domain/book";

const API_URL_2 = "https://www.googleapis.com/books/v1/volumes?q=";

interface GetBooksGoogleAPisResponse {
  items: {
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
    };
  }[];
}

const getBooksGoogleService = async ({ query }: { query: string }) => {
  const response = await fetch(`${API_URL_2}${encodeURIComponent(query)}`).then(
    (response) => response.json()
  );

  return response as GetBooksGoogleAPisResponse;
};

// implement adapter pattern

export const getBooksOption2: GetBooksPort = async (searchTerm) => {
  const response = await getBooksGoogleService({ query: searchTerm });

  return response.items.map(({ volumeInfo }) => ({
    title: volumeInfo.title,
    authors: volumeInfo.authors ?? [],
    description: volumeInfo.description ?? "",
  }));
};
