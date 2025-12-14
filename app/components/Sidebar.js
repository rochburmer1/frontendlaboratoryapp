"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaTable, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const baseClass = "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700";
    const activeClass = "bg-gray-200 text-gray-700";
    return pathname === path ? `${baseClass} ${activeClass}` : baseClass;
  };

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l border-gray-200">
      <Link href="/" className="mx-auto text-xl font-bold text-gray-800 hover:text-gray-600">
        Meraki UI App
      </Link>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link href="/" className={getLinkClass('/')}>
            <FaHome className="w-5 h-5" />
            <span className="mx-4 font-medium">Strona Główna</span>
          </Link>

          <Link href="/table-project" className={getLinkClass('/table-project')}>
            <FaTable className="w-5 h-5" />
            <span className="mx-4 font-medium">Projekt Tabela</span>
          </Link>

          <Link href="/articles" className={getLinkClass('/articles')}>
            <FaTable className="w-5 h-5" /> {}
            <span className="mx-4 font-medium">Artykuły (Baza)</span>
          </Link>

          <Link href="/user/profile" className={getLinkClass('/user/profile')}>
            <FaUser className="w-5 h-5" />
            <span className="mx-4 font-medium">Profil</span>
          </Link>

          <hr className="my-6 border-gray-200" />
        </nav>

        <div className="flex items-center px-4 -mx-2">
           <span className="mx-2 font-medium text-gray-600 text-sm">
             Lab Frontend 2025
           </span>
        </div>
      </div>
    </aside>
  );
}