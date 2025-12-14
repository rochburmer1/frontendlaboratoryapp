"use client";
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Panel Laboratorium</h1>
      
      <div className="flex gap-4">
        {!user ? (
          <>
            <Link href="/user/signin" className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
              Zaloguj
            </Link>
            <Link href="/user/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Rejestracja
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Witaj, {user.email}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Wyloguj
            </button>
          </div>
        )}
      </div>
    </header>
  );
}