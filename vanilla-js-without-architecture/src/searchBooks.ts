const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

// Define types for the Google Books API response
interface BookInfo {
  title: string;
  authors?: string[];

  description?: string;
}

interface Book {
  volumeInfo: BookInfo;
}

interface BooksApiResponse {
  items: {
    volumeInfo: {
      title: string;
      authors?: string[];

      description?: string;
    };
  }[];
}

// Function to display the fetched books
function displayBooks(books: Book[] = []): void {
  const resultsContainer = document.getElementById("results") as HTMLDivElement;
  resultsContainer.innerHTML = ""; // Clear previous results

  if (books.length === 0) {
    resultsContainer.innerHTML = "<p>No results found</p>";
    return;
  }

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    // Populate book details with optional chaining for undefined values
    bookElement.innerHTML = `
      <h3>${book.volumeInfo.title || "No title available"}</h3>
      <p><strong>Author(s):</strong> ${
        book.volumeInfo.authors?.join(", ") ?? "N/A"
      }</p>

      <p>${
        book.volumeInfo.description
          ? book.volumeInfo.description.substring(0, 200) + "..."
          : "No description available"
      }</p>
    `;
    resultsContainer.appendChild(bookElement);
  });
}

// Function to fetch and display books
export function searchBooks() {
  const queryInput = document.getElementById("search") as HTMLInputElement;
  const query = queryInput.value.trim();

  if (!query) {
    alert("Please enter a search term");
    return;
  }

  fetch(`${API_URL}${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data: BooksApiResponse) => displayBooks(data.items))
    .catch((error) => console.error("Error fetching data:", error));
}

const url =
  "https://purplelab-datacore-landing-zone-us-east-1.s3.amazonaws.com/dev/udl/arf/hcp_summary_volume/source_dt%3D2024-10-29/run-1730224164386-part-block-0-r-00000-snappy.parquet?response-content-disposition=attachment%3B%20filename%3Drun-1730224164386-part-block-0-r-00000-snappy.parquet&response-content-type=text%2Fcsv&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATZU76MMXABEZ7KZI%2F20250415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250415T125950Z&X-Amz-Expires=259200&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDcN13ywGMuGE81t5AWLZDwXUPoqEPqhm6uGv7DYMX2ZAIhAJTDnvxrziXh3YJYN%2FHSVqLAfBlYsUKDQHxtuRzOeuqgKrEDCC4QAxoMMjYxMjU0NzAxODcwIgwyZf1xUWbwn8A%2FxLwqjgN6TWsUmYBztq9eYMguuoiX94VKaPI%2FHe%2FQwL6N1CVkOXOyT1Ssrlt%2FAnZXUMP4Gz%2BtYFcTGd83Y7nW6eLMXTCBsHl1sb3SA3WhuGrnJyYC3HfucduUKdHogtJ5spVSrfXnaggyGd07qjNF01BD3PmFqViK7zBLZmBFgK1zVCtph%2BTP0ypusz%2BkiPgyhOFvGSOe1d7mH9SmqSCd1u6RjXrxF1idHG%2BkmhUN0a3K9c5Z2yBGOXayGQohA4PlljEcUZPR0yw7%2FGwrXWDMFrks1Z7MMlIW8ibYx0eSldnPXWM0KBkch3PPqpTCCmioCyD1Rrc580Px0ysfLXCBGL4bcI7n4%2FVzaj2plygGdUn2J0g9Ve6juoviY2MLbNZ8%2BKVGYqP8hoACDSbil6eo1RL5qg%2FD4WxAt4tRqyla%2FINjV%2FQQY7KVBWz7XGU1mwgMJcOafGcH4yX3cJ2SnUAYyrUxb12%2FwcCzY0btua9veOVW4NZaM6B0s6W5hhEkIkDaxNALhWf8CeWrUGMM2q1KwkhZZTDBsPm%2FBjqcAcvaOqkgL29BQ1RitTecECBajVPdkq7Pl014wKdxBhRZkrSbGYF2Z5J%2FCBzoDXMnLMZLUwE%2BoTaU61prqpvq2h%2FZqbLrHMJ56%2B%2F0wabGNh1zbf4z8%2BvDOgT%2B%2BV3iZI0Wck7SdPtTbiLA3akTfuBw3TL3RRAAYVSivOeRohMS675wKo%2FUp0f1r5YMTj2I2RZAobv7tKqTQ7JaCvp6Kw%3D%3D&X-Amz-Signature=904bb7cd00b5c93902c8b3f0dc341e823a410a12285a8322aaf2caecdb05b583";

export const download = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "file";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl); // Clean up
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
