// FIRST OPTION ===================================

// interface GetBooksGoogleAPisResponse {
//   items: {
//     volumeInfo: {
//       title: string;
//       authors?: string[];
//       description?: string;
//     };
//   }[];
// }

// const API_URL_1 = "https://www.googleapis.com/books/v1/volumes?q=";

// SECOND OPTION ==================================

// interface GetBooksOpenLibraryAPisResponse {
//   docs: {
//     title: string;
//     author_name?: string[];
//     first_sentence?: string[];
//   }[];
// }

// const API_URL_2 = "https://openlibrary.org/search.json?q=";

// CODE ===========================================

interface GetBooksGoogleAPIsResponse {
  items: {
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
    };
  }[];
}

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function searchBooks(query: string): Promise<GetBooksGoogleAPIsResponse> {
  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as GetBooksGoogleAPIsResponse;
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error}`);
  }
}

function displayBooks(books: GetBooksGoogleAPIsResponse): void {
  if (!books.items || books.items.length === 0) {
    console.log("\n❌ No books found for your search query.");
    return;
  }

  console.log(`\n📚 Found ${books.items.length} book(s):\n`);

  books.items.forEach((book, index) => {
    console.log(`📖 Book ${index + 1}:`);
    console.log(`   Title: ${book.volumeInfo.title}`);

    if (book.volumeInfo.authors && book.volumeInfo.authors.length > 0) {
      console.log(`   Authors: ${book.volumeInfo.authors.join(", ")}`);
    } else {
      console.log(`   Authors: Unknown`);
    }

    if (book.volumeInfo.description) {
      // Truncate description if it's too long
      const description =
        book.volumeInfo.description.length > 200
          ? book.volumeInfo.description.substring(0, 200) + "..."
          : book.volumeInfo.description;
      console.log(`   Description: ${description}`);
    } else {
      console.log(`   Description: No description available`);
    }

    console.log(""); // Empty line for separation
  });
}

async function main(): Promise<void> {
  try {
    console.log("🔍 Welcome to the Book Search CLI!");
    console.log("Search for books using the Google Books API\n");

    const searchQuery = await askQuestion("Enter your search query: ");

    if (!searchQuery.trim()) {
      console.log("❌ Please enter a valid search query.");
      rl.close();
      return;
    }

    console.log(`\n🔎 Searching for: "${searchQuery}"...`);

    const books = await searchBooks(searchQuery);
    displayBooks(books);

    rl.close();
  } catch (error) {
    console.error("❌ An error occurred:", error);
    rl.close();
  }
}

main();
