"use client";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Rejestracja udana!</h2>
      <p className="text-gray-700 text-lg mb-6">
        Na Twój adres e-mail została wysłana wiadomość weryfikacyjna. 
        Kliknij w link w wiadomości, aby aktywować konto.
      </p>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
        <p className="text-yellow-700">
          <strong>Uwaga:</strong> Zostałeś automatycznie wylogowany. Po potwierdzeniu adresu e-mail, zaloguj się ponownie.
        </p>
      </div>
      <Link 
        href="/user/signin" 
        className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition"
      >
        Przejdź do logowania
      </Link>
    </div>
  );
}