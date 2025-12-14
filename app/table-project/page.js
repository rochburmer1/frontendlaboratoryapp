// app/table-project/page.js
import SmartTable from "../components/SmartTable";
import { initialData } from "../lib/data";

export default function TablePage() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Projekt: Inteligentna Tabela</h1>
      <p className="text-gray-600 mb-6">
        Realizacja Tematu 3: Sortowanie, Footer oraz funkcja Collapse (zwijanie grup wierszy).
      </p>
      
      {/* Przekazujemy dane do komponentu */}
      <SmartTable data={initialData} />
    </div>
  );
}