import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';

const items = [
  { id: 1, text: 'Dispensed 2x Amoxicillin 500mg', time: '2m ago' },
  { id: 2, text: 'New purchase order created', time: '18m ago' },
  { id: 3, text: 'Stock alert: Metformin < 100', time: '1h ago' },
  { id: 4, text: 'User Sarah added a new supplier', time: '3h ago' },
];

export default function RecentActivity() {
  return (
    <section className="bg-white border rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-600" />
          <h3 className="font-semibold">Recent Activity</h3>
        </div>
        <button className="text-sm text-emerald-700 hover:underline flex items-center gap-1">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it.id} className="p-4 hover:bg-gray-50/70 flex items-center justify-between">
            <span className="text-sm text-gray-700">{it.text}</span>
            <span className="text-xs text-gray-500">{it.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
