"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/app/lib/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [address, setAddress] = useState({ city: "", street: "", zipCode: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/user/signin");
      } else {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().address) {
            setAddress(docSnap.data().address);
          }
        } catch (e) {
          console.error("Błąd pobierania danych:", e);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email, 
        address: address
      }, { merge: true }); 
      setMsg("✅ Adres zapisany w bazie Firestore!");
    } catch (e) {
      console.error(e);
      setMsg("❌ Błąd zapisu.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/user/signin");
  };

  if (loading) return <div className="p-10 text-center">Ładowanie...</div>;
  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Profil Użytkownika</h1>
      
      {}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> <span className="text-xs font-mono">{user.uid}</span></p>
      </div>

      {}
      <form onSubmit={handleSaveAddress} className="space-y-4 mb-8 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700">Dane Adresowe (Firestore)</h3>
        
        <div>
          <label className="block text-sm text-gray-600">Miasto</label>
          <input 
            type="text" 
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Ulica</label>
          <input 
            type="text" 
            value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Kod Pocztowy</label>
          <input 
            type="text" 
            value={address.zipCode}
            onChange={(e) => setAddress({...address, zipCode: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Zapisz Adres
        </button>
        {msg && <p className="text-center text-sm mt-2">{msg}</p>}
      </form>

      <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
        Wyloguj się
      </button>
    </div>
  );
}