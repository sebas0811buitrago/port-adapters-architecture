import { GetBooksPort } from "../domain/book";

// Option 1
const API_URL_1 = "https://www.googleapis.com/books/v1/volumes?q=";

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
  const response = await fetch(`${API_URL_1}${encodeURIComponent(query)}`).then(
    (response) => response.json()
  );

  return response as GetBooksGoogleAPisResponse;
};

// implement adapter pattern

export const getBooksOption1: GetBooksPort = async (searchTerm) => {
  const response = await getBooksGoogleService({ query: searchTerm });

  return response.items.map(({ volumeInfo }) => ({
    title: volumeInfo.title,
    authors: volumeInfo.authors ?? [],
    description: volumeInfo.description ?? "",
  }));
};
