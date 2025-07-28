"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { useState } from "react";

// Sample book data
const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about racial injustice and loss of innocence in the American South.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in a totalitarian society, exploring themes of mass surveillance and control.",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel following the emotional development of Elizabeth Bennet.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel depicting the lavish lifestyle of wealthy Americans during the Roaring Twenties.",
  },
  {
    id: 5,
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    description:
      "A multi-generational story that explores the repetition of history and the circular nature of time.",
  },
];

function BookSearcherComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Searcher</h1>
      <Input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">{book.author}</p>
              <p className="text-sm text-gray-600">{book.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredBooks.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No books found matching your search.
        </p>
      )}
    </div>
  );
}

export default BookSearcherComponent;
