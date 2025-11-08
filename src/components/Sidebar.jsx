import React from 'react';
import { Home, Pill, ClipboardList, Users, Settings } from 'lucide-react';

const items = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'inventory', label: 'Inventory', icon: Pill },
  { key: 'orders', label: 'Prescriptions', icon: ClipboardList },
  { key: 'staff', label: 'Staff', icon: Users },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="hidden md:flex md:w-64 h-full border-r bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="w-full p-3 space-y-1">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
