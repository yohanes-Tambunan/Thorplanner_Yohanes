import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button className="mobile-sidebar-backdrop" type="button" aria-label="Tutup menu" onClick={() => setMobileMenuOpen(false)} />
      )}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="app-main">
        <Navbar onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="page-content"><Outlet /></main>
      </div>
      <Toast />
    </div>
  );
}
