"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Hasła muszą być identyczne.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Zarejestrowano użytkownika:", userCredential.user.uid);

      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      
      router.push("/user/verify");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Ten adres e-mail jest już zajęty.");
      } else if (err.code === "auth/weak-password") {
        setError("Hasło jest za słabe (min. 6 znaków).");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Rejestracja</h2>
      
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

        <div>
          <label className="block text-gray-700 font-medium mb-2">Powtórz Hasło</label>
          <input name="confirmPassword" type="password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? "Rejestracja..." : "Zarejestruj się"}
        </button>
      </form>
    </div>
  );
}