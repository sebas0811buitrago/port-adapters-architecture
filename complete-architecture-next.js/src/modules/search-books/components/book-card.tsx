import { Book } from "../domain/Book";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book: { title, authors, description } }: BookCardProps) => {
  return (
    <div className="book bg-white border border-gray-200 p-4 rounded-md shadow-sm mb-4 @lg:bg-blue-50 @xl:bg-blue-100">
      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
        {title ?? "No title"}
      </h3>
      <p className="text-gray-600 text-sm md:text-base lg:text-lg">
        <strong>Author:</strong> {authors?.join(", ") ?? "No author"}
      </p>
      <p className="text-gray-600 text-sm md:text-base lg:text-lg">
        <strong>Summary:</strong> {description ?? "No description"}
      </p>
    </div>
  );
};

export default BookCard;
