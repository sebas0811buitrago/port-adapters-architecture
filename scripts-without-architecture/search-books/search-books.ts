import * as readline from "readline";

// FIRST OPTION ==================================

interface GetBooksOpenLibraryAPisResponse {
  docs: {
    title: string;
    author_name?: string[];
    first_sentence?: string[];
  }[];
}

const API_URL_1 = "https://openlibrary.org/search.json?q=";

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

async function searchBooks(
  query: string
): Promise<GetBooksOpenLibraryAPisResponse> {
  try {
    const response = await fetch(`${API_URL_1}${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as GetBooksOpenLibraryAPisResponse;
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error}`);
  }
}

function displayBooks(books: GetBooksOpenLibraryAPisResponse): void {
  if (!books.docs || books.docs.length === 0) {
    console.log("\n❌ No books found for your search query.");
    return;
  }

  console.log(`\n📚 Found ${books.docs.length} book(s):\n`);

  books.docs.forEach((book, index) => {
    console.log(`📖 Book ${index + 1}:`);
    console.log(`   Title: ${book.title}`);

    if (book.author_name && book.author_name.length > 0) {
      console.log(`   Authors: ${book.author_name.join(", ")}`);
    } else {
      console.log(`   Authors: Unknown`);
    }

    if (book.first_sentence && book.first_sentence.length > 0) {
      // Truncate description if it's too long
      const description =
        book.first_sentence[0].length > 200
          ? book.first_sentence[0].substring(0, 200) + "..."
          : book.first_sentence[0];
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
    console.log("Search for books:");

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

console.log("hola");
main();
