import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Activity, BarChart3, CalendarDays, ClipboardList, Dumbbell,
  History, LayoutDashboard, Target, UserRound, X,
} from 'lucide-react';

const navigation = [
  { label: 'Overview', path: '/', icon: LayoutDashboard, end: true },
  { label: 'Workout Plan', path: '/workouts', icon: Dumbbell },
  { label: 'Exercise Library', path: '/exercises', icon: Activity },
  { label: 'Schedule', path: '/schedule', icon: CalendarDays },
  { label: 'Workout History', path: '/history', icon: History },
  { label: 'Progress', path: '/progress', icon: BarChart3 },
  { label: 'Goals', path: '/goals', icon: Target },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-mark"><Dumbbell size={21} strokeWidth={2.5} /></div>
        <div className="brand-copy">
          <span className="brand-name">ThorPlanner<span>.</span></span>
          <span className="brand-caption">PERSONAL FITNESS</span>
        </div>
        <button className="icon-button sidebar-close" type="button" onClick={onClose} aria-label="Tutup menu">
          <X size={18} />
        </button>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Navigasi utama">
        {navigation.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} strokeWidth={1.9} />
            <span>{label}</span>
            {label === 'Schedule' && <span className="nav-dot" />}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-spacer" />
      <div className="sidebar-tip">
        <div className="tip-icon"><Activity size={17} /></div>
        <p className="tip-eyebrow">SMALL STEPS, BIG RESULTS</p>
        <p className="tip-copy">Konsistensi lebih penting daripada intensitas sesaat.</p>
      </div>
      <NavLink to="/profile" onClick={onClose} className={({ isActive }) => `sidebar-profile ${isActive ? 'profile-active' : ''}`}>
        <div className="avatar avatar-sidebar"><UserRound size={18} /></div>
        <div className="sidebar-profile-copy">
          <strong>My profile</strong>
          <span>Manage your account</span>
        </div>
        <ClipboardList size={17} className="profile-arrow" />
      </NavLink>
    </aside>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
