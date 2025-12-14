"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articlesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error("Błąd pobierania artykułów:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Artykuły (Zadanie Lab 9)</h1>
      <p className="mb-6 text-gray-600">Ta lista jest pobierana dynamicznie z bazy Firestore.</p>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="p-4 bg-white border rounded shadow hover:shadow-md transition">
            <h2 className="text-xl font-bold text-blue-600">{article.title}</h2>
            <p className="text-gray-700 mt-2">{article.content}</p>
          </div>
        ))}
        
        {articles.length === 0 && <p>Brak artykułów w bazie lub trwa ładowanie...</p>}
      </div>
    </div>
  );
}