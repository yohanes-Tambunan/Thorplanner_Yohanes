import PropTypes from 'prop-types';
import { Bell, Menu, Plus, Search, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGym } from '../context/GymContext';

const pageTitles = {
  '/': ['Dashboard', 'Ringkasan aktivitas latihanmu'],
  '/workouts': ['Workout Plan', 'Susun program latihan sesuai tujuanmu'],
  '/exercises': ['Exercise Library', 'Temukan gerakan untuk setiap kelompok otot'],
  '/schedule': ['Workout Schedule', 'Atur waktu latihan agar tetap konsisten'],
  '/history': ['Workout History', 'Lihat kembali sesi latihan yang sudah selesai'],
  '/progress': ['Progress Tracking', 'Pantau perkembangan dari waktu ke waktu'],
  '/goals': ['Your Goals', 'Tetapkan target dan jaga konsistensimu'],
  '/profile': ['My Profile', 'Kelola informasi dan preferensi latihan'],
};

export default function Navbar({ onOpenMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useGym();
  const [title, subtitle] = pageTitles[location.pathname] || pageTitles['/'];
  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <button className="icon-button mobile-menu-button" onClick={onOpenMenu} type="button" aria-label="Buka menu">
          <Menu size={20} />
        </button>
        <div>
          <div className="topbar-title-row">
            <h1>{title}</h1>
            <span className="topbar-date">{today}</span>
          </div>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="icon-button topbar-search" type="button" onClick={() => navigate('/exercises')} aria-label="Cari latihan" title="Cari latihan">
          <Search size={18} />
        </button>
        <button className="icon-button notification-button" type="button" onClick={() => navigate('/schedule')} aria-label="Lihat jadwal" title="Lihat jadwal">
          <Bell size={18} /><span className="notification-indicator" />
        </button>
        <Link to="/profile" className="topbar-user" aria-label="Buka profil">
          <div className="avatar"><UserRound size={17} /></div>
          <span>{profile.name || 'Member'}</span>
        </Link>
        <button className="button button-primary topbar-create" type="button" onClick={() => navigate('/workouts')}>
          <Plus size={16} /> <span>New workout</span>
        </button>
      </div>
    </header>
  );
}

Navbar.propTypes = { onOpenMenu: PropTypes.func };
