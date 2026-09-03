import React from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Bookmark, 
  FileText, 
  LogOut,
  Briefcase,
  Users
} from 'lucide-react';
import styles from './DashboardLayout.module.css';
import Navbar from '../components/layout/Navbar';
import { useAppContext } from '../context/AppContext';

const DashboardLayout = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const seekerLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/profile', icon: <User size={20} />, label: 'My Profile' },
    { to: '/applied-jobs', icon: <FileText size={20} />, label: 'Applied Jobs' },
    { to: '/saved-jobs', icon: <Bookmark size={20} />, label: 'Saved Jobs' },
  ];

  const recruiterLinks = [
    { to: '/recruiter', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/recruiter/post-job', icon: <Briefcase size={20} />, label: 'Post a Job' },
    { to: '/recruiter/jobs', icon: <FileText size={20} />, label: 'Manage Jobs' },
    { to: '/recruiter/applications', icon: <Users size={20} />, label: 'Applications' },
  ];

  const links = user.role === 'recruiter' ? recruiterLinks : seekerLinks;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.name.charAt(0)}</div>
            <div>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.role}</div>
            </div>
          </div>
          
          <nav className={styles.nav}>
            {links.map(link => (
              <NavLink 
                key={link.to} 
                to={link.to}
                end={link.to === '/dashboard' || link.to === '/recruiter'}
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </aside>
        
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
