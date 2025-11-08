import React, { useState } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import KPIs from './components/KPIs';
import InventoryTable from './components/InventoryTable';
import RecentActivity from './components/RecentActivity';

function App() {
  const [role, setRole] = useState('Admin');
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50 text-gray-900">
      <Topbar role={role} onChangeRole={setRole} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar active={active} onChange={setActive} />
        <main className="flex-1 p-4 overflow-y-auto">
          {active === 'dashboard' && (
            <div className="space-y-4">
              <KPIs role={role} />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                  <h2 className="text-xl font-semibold mb-2">Quick Inventory</h2>
                  <p className="text-sm text-gray-600 mb-4">Recently added and low-stock medicines.</p>
                  <InventoryTable role={role} />
                </div>
                <RecentActivity />
              </div>
            </div>
          )}

          {active === 'inventory' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Inventory</h2>
                <p className="text-sm text-gray-600 mb-4">Search, filter and manage all medicines.</p>
                <InventoryTable role={role} />
              </div>
            </div>
          )}

          {active === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Prescriptions</h2>
              <p className="text-sm text-gray-600">Processing queue will appear here.</p>
            </div>
          )}

          {active === 'staff' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Staff</h2>
              <p className="text-sm text-gray-600">Manage users and permissions by role.</p>
            </div>
          )}

          {active === 'settings' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Settings</h2>
              <p className="text-sm text-gray-600">Configure taxes, suppliers, billing and more.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
