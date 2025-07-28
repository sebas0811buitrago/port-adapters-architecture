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
