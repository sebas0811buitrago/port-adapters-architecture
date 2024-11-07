import { Book, searchSchema } from "../domain/Book";
import { getBooksOption1 } from "../service/getBooksOption1";

function displayBooks(books: Book[] = []) {
  const resultsContainer = document.getElementById("results") as HTMLDivElement;
  resultsContainer.innerHTML = ""; // Clear previous results

  if (books.length === 0) {
    resultsContainer.innerHTML = "<p>No results found</p>";
    return;
  }

  books.forEach(({ title, authors, description }) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    // Populate book details with optional chaining for undefined values
    bookElement.innerHTML = `
      <h3>${title || "No title available"}</h3>
      <p><strong>Author(s):</strong> ${authors?.join(", ") ?? "N/A"}</p>

      <p>${
        description
          ? description.substring(0, 200) + "..."
          : "No description available"
      }</p>
    `;
    resultsContainer.appendChild(bookElement);
  });
}

// Function to fetch and display books
export async function searchBooks() {
  const queryInput = document.getElementById("search") as HTMLInputElement;
  const query = queryInput.value.trim();

  const { error } = searchSchema.safeParse(query);

  if (error) {
    alert("Invalid search term");
    return;
  }

  if (!query) {
    alert("Please enter a search term");
    return;
  }
  try {
    const books = await getBooksOption1(query);
    displayBooks(books);
  } catch (error) {
    alert("An unexpected error ocurred");
  }
}
