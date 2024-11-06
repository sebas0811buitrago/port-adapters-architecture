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
