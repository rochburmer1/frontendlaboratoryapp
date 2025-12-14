// app/components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center p-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <p>&copy; 2025 Laboratorium Frameworki Frontendowe.</p>
        
        <Link href="/about" className="text-blue-400 hover:text-blue-300 transition underline">
          O Autorze / O Aplikacji
        </Link>
      </div>
    </footer>
  );
}