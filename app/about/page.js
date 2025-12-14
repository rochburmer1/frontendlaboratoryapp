// app/about/page.js
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">O Projekcie</h1>
      
      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Autor:</strong> Roch Burmer
        </p>
        <p>
          <strong>Nr albumu:</strong> 15268 
        </p>
        <p>
          <strong>Temat projektu:</strong> Temat 3 - Komponent tabeli z funkcjami sortowania i collapse.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
          <h3 className="font-bold text-blue-700 mb-2">Opis funkcjonalności:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Uwierzytelnianie użytkowników (Firebase Auth).</li>
            <li>Ochrona ścieżek (Protected Routes).</li>
            <li>Inteligentna tabela z sortowaniem kolumn.</li>
            <li>Algorytm grupowania i ukrywania wierszy (Collapse).</li>
            <li>Responsywny design (Mobile/Desktop).</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
}