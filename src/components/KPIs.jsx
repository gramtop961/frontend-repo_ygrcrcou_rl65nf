import React from 'react';
import { DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function KPIs({ role }) {
  const cards = [
    { label: 'Today Revenue', value: '$3,240', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
    { label: 'Items in Stock', value: '12,483', icon: Package, color: 'from-blue-500 to-indigo-500' },
    { label: 'Prescriptions', value: '214', icon: ShoppingCart, color: 'from-violet-500 to-fuchsia-500' },
    { label: 'Low Stock Alerts', value: '23', icon: AlertTriangle, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl p-4 bg-white border shadow-sm">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} text-white flex items-center justify-center mb-3`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
          <div className="mt-1 text-xs text-gray-400">Role: {role}</div>
        </div>
      ))}
    </section>
  );
}
