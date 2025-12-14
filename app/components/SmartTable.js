// app/components/SmartTable.js
"use client";
import { useState, useMemo } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEye } from "react-icons/fa";

export default function SmartTable({ data }) {
  // Stan sortowania: { key: 'points', direction: 'asc' } lub null
  const [sortConfig, setSortConfig] = useState(null);
  
  // Stan zaznaczonych ID wierszy (do ukrycia)
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  // Stan ukrytych grup: tablica obiektów { start, end, ids }
  const [hiddenGroups, setHiddenGroups] = useState([]);

  // --- 1. LOGIKA SORTOWANIA ---
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    // Resetujemy ukrywanie przy zmianie sortowania (żeby nie ukryć złych wierszy)
    setHiddenGroups([]); 
    setSelectedIds(new Set());

    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
      setSortConfig(null); // Reset do naturalnego
      return;
    }
    setSortConfig({ key, direction });
  };

  // --- 2. LOGIKA ZAZNACZANIA ---
  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  // --- 3. LOGIKA UKRYWANIA (COLLAPSE) ---
  const handleCollapse = () => {
    if (selectedIds.size === 0) return;

    // Znajdź indeksy zaznaczonych elementów w AKTUALNIE posortowanej tabeli
    const indicesToHide = sortedData
      .map((item, index) => (selectedIds.has(item.id) ? index : -1))
      .filter((index) => index !== -1)
      .sort((a, b) => a - b);

    // Grupuj sąsiadujące indeksy (np. 1, 2, 3 to jedna grupa)
    const newGroups = [];
    if (indicesToHide.length > 0) {
      let currentGroup = { start: indicesToHide[0], end: indicesToHide[0] };

      for (let i = 1; i < indicesToHide.length; i++) {
        if (indicesToHide[i] === currentGroup.end + 1) {
          currentGroup.end = indicesToHide[i]; // Rozszerz grupę
        } else {
          newGroups.push(currentGroup); // Zapisz grupę i zacznij nową
          currentGroup = { start: indicesToHide[i], end: indicesToHide[i] };
        }
      }
      newGroups.push(currentGroup);
    }

    setHiddenGroups([...hiddenGroups, ...newGroups]);
    setSelectedIds(new Set()); // Wyczyść zaznaczenie
  };

  const restoreGroup = (groupIndex) => {
    const newGroups = [...hiddenGroups];
    newGroups.splice(groupIndex, 1);
    setHiddenGroups(newGroups);
  };

  // Sprawdź czy wiersz jest ukryty
  const isRowHidden = (index) => {
    return hiddenGroups.some(g => index >= g.start && index <= g.end);
  };

  // Ikony sortowania
  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === "asc" ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };

  return (
    <div className="w-full bg-white p-4 rounded shadow">
      {/* Przycisk Ukrywania */}
      <div className="mb-4">
        <button 
          onClick={handleCollapse}
          disabled={selectedIds.size === 0}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-300 transition"
        >
          Ukryj zaznaczone ({selectedIds.size})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="p-4 w-10">#</th>
              <th onClick={() => requestSort("firstName")} className="px-6 py-3 cursor-pointer hover:bg-gray-200">
                <div className="flex items-center gap-2">Imię {getSortIcon("firstName")}</div>
              </th>
              <th onClick={() => requestSort("lastName")} className="px-6 py-3 cursor-pointer hover:bg-gray-200">
                <div className="flex items-center gap-2">Nazwisko {getSortIcon("lastName")}</div>
              </th>
              <th onClick={() => requestSort("points")} className="px-6 py-3 cursor-pointer hover:bg-gray-200">
                <div className="flex items-center gap-2">Punkty {getSortIcon("points")}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              // 1. Sprawdź czy to początek ukrytej grupy
              const groupIndex = hiddenGroups.findIndex(g => g.start === index);
              if (groupIndex !== -1) {
                const count = hiddenGroups[groupIndex].end - hiddenGroups[groupIndex].start + 1;
                return (
                  <tr key={`group-${index}`} className="bg-yellow-100 border-b border-yellow-300">
                    <td colSpan="4" className="px-6 py-4 text-center text-yellow-800 font-medium">
                      <div className="flex justify-between items-center">
                        <span>Ukryto {count} wierszy</span>
                        <button 
                          onClick={() => restoreGroup(groupIndex)}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black rounded shadow transition"
                        >
                          <FaEye /> Pokaż
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }

              // 2. Jeśli wiersz jest w środku ukrytej grupy -> nie wyświetlaj go
              if (isRowHidden(index)) return null;

              // 3. Normalny wiersz
              return (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{item.firstName}</td>
                  <td className="px-6 py-4">{item.lastName}</td>
                  <td className="px-6 py-4">{item.points}</td>
                </tr>
              );
            })}
          </tbody>
          {/* Footer wymagany w zadaniu */}
          <tfoot className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <td colSpan="4" className="px-6 py-3 text-center">
                Koniec tabeli
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}