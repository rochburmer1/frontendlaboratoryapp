"use client";
import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nasłuchuj zmian w stanie logowania
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Jeśli nie zalogowany -> wyrzuć do logowania
        router.push("/user/signin");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/user/signin");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Ładowanie profilu...</div>;
  }

  if (!user) return null; // Zabezpieczenie przed mignięciem

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Twój Profil</h1>
      
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-500">Adres E-mail</label>
          <p className="text-lg text-gray-900 font-medium">{user.email}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">ID Użytkownika (UID)</label>
          <p className="text-xs text-gray-400 font-mono bg-gray-100 p-2 rounded break-all">
            {user.uid}
          </p>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-500">Status weryfikacji</label>
           <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${user.emailVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
             {user.emailVerified ? "Zweryfikowany" : "Niezweryfikowany"}
           </span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Wyloguj się
      </button>
    </div>
  );
}