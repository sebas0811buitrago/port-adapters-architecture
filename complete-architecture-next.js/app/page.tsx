import { BookSearcher } from "@/src/modules/search-books";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BookSearcher />
    </main>
  );
}
