import { GetBooksPort } from "../domain/Book";

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

export const getBooksOption1: GetBooksPort = async (search: string) => {
  const response = await getBooksGoogleService({
    query: search,
  });

  return response.items.map(
    ({ volumeInfo: { title, authors, description } }) => ({
      title,
      authors,
      description,
    })
  );
};
