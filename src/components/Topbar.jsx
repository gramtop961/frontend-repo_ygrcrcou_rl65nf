import React from 'react';
import { Shield, Bell, User } from 'lucide-react';

const roles = ['Admin', 'Pharmacist', 'Sales', 'Accountant'];

export default function Topbar({ role, onChangeRole }) {
  return (
    <header className="flex items-center justify-between px-4 h-16 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
          <Shield className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="font-semibold">PharmaFlow</div>
          <div className="text-xs text-gray-500">Smart Pharmacy Management</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span className="text-gray-500">Role:</span>
          <select
            value={role}
            onChange={(e) => onChangeRole(e.target.value)}
            className="px-2 py-1.5 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border">
          <User className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-700 hidden sm:inline">John Doe</span>
        </div>
      </div>
    </header>
  );
}
