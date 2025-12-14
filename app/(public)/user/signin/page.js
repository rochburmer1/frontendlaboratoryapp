"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from 'react';

// Musimy użyć Suspense, ponieważ korzystamy z useSearchParams (wymóg Next.js)
export default function SignInPage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Jeśli jest returnUrl to go bierzemy, jeśli nie to wracamy na główną "/"
  const returnUrl = searchParams.get("returnUrl") || "/";
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Udane logowanie -> przekierowanie
      router.push(returnUrl);
    } catch (err) {
      console.error(err);
      setError("Nieprawidłowy e-mail lub hasło.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Logowanie</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">E-mail</label>
          <input name="email" type="email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Hasło</label>
          <input name="password" type="password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Nie masz konta? <Link href="/user/register" className="text-blue-600 hover:underline">Zarejestruj się</Link>
      </p>
    </div>
  );
}