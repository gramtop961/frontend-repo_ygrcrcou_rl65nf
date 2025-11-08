import React, { useMemo, useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const sample = [
  { id: 'RX-1001', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 120, exp: '2026-05-10', price: 8.5 },
  { id: 'RX-1002', name: 'Paracetamol 650mg', category: 'Analgesic', stock: 420, exp: '2027-02-01', price: 3.2 },
  { id: 'RX-1003', name: 'Metformin 500mg', category: 'Antidiabetic', stock: 80, exp: '2025-11-19', price: 6.7 },
  { id: 'RX-1004', name: 'Atorvastatin 20mg', category: 'Statin', stock: 45, exp: '2025-07-30', price: 11.9 },
];

export default function InventoryTable({ role }) {
  const [q, setQ] = useState('');
  const data = useMemo(() => sample.filter(r => r.name.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <section className="bg-white border rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md border bg-gray-50">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search medicine, category, batch..."
            className="bg-transparent outline-none text-sm w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </button>
          {(role === 'Admin' || role === 'Pharmacist') && (
            <button className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Item
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Stock</th>
              <th className="text-left p-3">Expiry</th>
              <th className="text-right p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50/70">
                <td className="p-3 font-mono text-gray-600">{r.id}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3 text-gray-600">{r.category}</td>
                <td className="p-3 text-right">{r.stock}</td>
                <td className="p-3">{r.exp}</td>
                <td className="p-3 text-right">${r.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
