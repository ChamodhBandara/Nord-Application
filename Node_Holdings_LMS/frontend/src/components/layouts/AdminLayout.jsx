import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

// SVG path data for our icons
const ICONS = {
  dashboard: 'M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a1 1 0 000-2H4a1 1 0 000 2zm7 0h3a1 1 0 000-2h-3a1 1 0 000 2zM4 9h3a1 1 0 000-2H4a1 1 0 000 2zm7 0h3a1 1 0 000-2h-3a1 1 0 000 2zm-7 5h3a1 1 0 000-2H4a1 1 0 000 2zm7 0h3a1 1 0 000-2h-3a1 1 0 000 2z',
  requests: 'M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z',
  customerFolder: 'M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z',
  customer: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
  customers: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zm-2 5a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-7 1a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z',
};

const AdminLayout = () => {
  const { logout } = useAuth();
  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: ICONS.dashboard },
    { name: 'Requests', path: '/admin/requests', icon: ICONS.requests },
    // New nested structure for Customers
    {
      name: 'Customer',
      path: '/admin/customer', // Base path for the section
      icon: ICONS.customerFolder,
      children: [
        { name: 'Customers', path: '/admin/customers', icon: ICONS.customers },
        { name: ' Customer', path: '/admin/customer/1', icon: ICONS.customer }, // Example link
      ],
    },
  ];

  return (
    <div className="app-container">
      <Sidebar title="Admin Panel" links={navLinks} onLogout={logout} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;