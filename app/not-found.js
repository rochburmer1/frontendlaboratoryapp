import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">404 - Nie znaleziono strony</h2>
      <p className="text-gray-600 mb-6">Przykro nam, ale strona której szukasz nie istnieje.</p>
      <Link 
        href="/" 
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Wróć na Stronę Główną
      </Link>
    </div>
  );
}