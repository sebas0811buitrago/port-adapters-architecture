import * as readline from "readline";
import { displayBooks } from "./display-books";
import { getBooksOption2 } from "../service/get-books-option-2";
import { getBooksOption1 } from "../service/get-books-option-1";

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

    // const books = await getBooksOption1(searchQuery);
    const books = await getBooksOption2(searchQuery);
    displayBooks(books);

    rl.close();
  } catch (error) {
    console.error("❌ An error occurred:", error);
    rl.close();
  }
}

main();
