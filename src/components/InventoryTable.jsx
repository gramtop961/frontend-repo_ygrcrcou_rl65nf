import React, { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Plus, Loader2 } from 'lucide-react';

export default function InventoryTable({ role }) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', expiry_date: '' });

  const base = import.meta.env.VITE_BACKEND_URL || '';

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${base}/api/medicines`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (e) {
      setError(e.message || 'Error loading inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    return items.filter((r) => {
      const t = `${r.name || ''} ${r.category || ''} ${r._id || ''}`.toLowerCase();
      return t.includes(q.toLowerCase());
    });
  }, [items, q]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        expiry_date: form.expiry_date || undefined,
      };
      const res = await fetch(`${base}/api/medicines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create');
      setShowNew(false);
      setForm({ name: '', category: '', price: '', stock: '', expiry_date: '' });
      await fetchItems();
    } catch (e) {
      setError(e.message || 'Error creating item');
    } finally {
      setLoading(false);
    }
  };

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
          <button onClick={fetchItems} className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Refresh
          </button>
          {(role === 'Admin' || role === 'Pharmacist') && (
            <button onClick={() => setShowNew(true)} className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Item
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 text-sm text-red-600">{error}</div>
      )}

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
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  <div className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading...</div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">No items found</td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r._id || r.id} className="border-t hover:bg-gray-50/70">
                  <td className="p-3 font-mono text-gray-600">{r._id || r.id}</td>
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3 text-gray-600">{r.category}</td>
                  <td className="p-3 text-right">{r.stock}</td>
                  <td className="p-3">{r.expiry_date || r.exp}</td>
                  <td className="p-3 text-right">${Number(r.price || 0).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showNew && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-xl border shadow-lg">
            <div className="p-4 border-b font-semibold">New Medicine</div>
            <form onSubmit={onSubmit} className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm">Name
                <input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md" />
              </label>
              <label className="text-sm">Category
                <input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md" />
              </label>
              <label className="text-sm">Price
                <input type="number" step="0.01" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md" />
              </label>
              <label className="text-sm">Stock
                <input type="number" value={form.stock} onChange={(e)=>setForm({...form,stock:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md" />
              </label>
              <label className="text-sm sm:col-span-2">Expiry Date
                <input type="date" value={form.expiry_date} onChange={(e)=>setForm({...form,expiry_date:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md" />
              </label>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={()=>setShowNew(false)} className="px-3 py-2 rounded-md border">Cancel</button>
                <button type="submit" className="px-3 py-2 rounded-md bg-emerald-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
