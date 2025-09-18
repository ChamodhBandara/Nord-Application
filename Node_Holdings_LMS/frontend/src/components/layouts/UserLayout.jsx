import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

// SVG path data for the home/dashboard icon
const ICONS = {
  home: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
};

const UserLayout = () => {
  const { logout, user } = useAuth();
  const navLinks = [{ name: 'My Dashboard', path: '/dashboard', icon: ICONS.home }];

  return (
    <div className="app-container">
      <Sidebar title={`Welcome, ${user?.username}`} links={navLinks} onLogout={logout} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;