import Link from 'next/link';
import { FaHome, FaUser, FaTable } from 'react-icons/fa';

export default function Sidebar() {
  return (
    // USUNIĘTO: "hidden md:block" - teraz pasek będzie widoczny zawsze
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex-shrink-0 p-4">
      <div className="text-2xl font-bold mb-8 text-center text-blue-400">LabApp</div>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition">
          <FaHome /> Strona Główna
        </Link>
        <Link href="/table-project" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition">
          <FaTable /> Projekt Tabela
        </Link>
        <Link href="/user/profile" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition">
          <FaUser /> Profil
        </Link>
      </nav>
    </aside>
  );
}