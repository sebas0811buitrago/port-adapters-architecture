"use client";

import React from "react";
import BookCard from "./book-card";
import useSearchBook from "../hooks/useSearchBook";

const BookSearcher = () => {
  const { searchedBooks, onSearch, query, setQuery } = useSearchBook();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg @container">
        <h1 className="text-center font-bold text-gray-800 mb-6 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
          Book Searcher
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            id="search"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base lg:text-lg"
          />
          <button
            id="searchButton"
            onClick={onSearch}
            className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-sm sm:text-base lg:text-lg"
          >
            Search
          </button>
        </div>
        <div id="results" className="mt-6">
          {searchedBooks.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearcher;
// export default BookSearcherComponent;
