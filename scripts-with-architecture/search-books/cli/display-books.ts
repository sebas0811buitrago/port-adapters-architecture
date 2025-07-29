import { Book } from "../domain/book";

export function displayBooks(books: Book[]): void {
  if (books.length === 0) {
    console.log("\n❌ No books found for your search query.");
    return;
  }

  console.log(`\n📚 Found ${books.length} book(s):\n`);

  books.forEach((book, index) => {
    console.log(`📖 Book ${index + 1}:`);
    console.log(`   Title: ${book.title}`);

    if (book.authors && book.authors.length > 0) {
      console.log(`   Authors: ${book.authors.join(", ")}`);
    } else {
      console.log(`   Authors: Unknown`);
    }

    if (book.description) {
      // Truncate description if it's too long
      const description =
        book.description.length > 200
          ? book.description.substring(0, 200) + "..."
          : book.description;
      console.log(`   Description: ${description}`);
    } else {
      console.log(`   Description: No description available`);
    }

    console.log(""); // Empty line for separation
  });
}
