import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu } from 'lucide-react';
import styles from './Navbar.module.css';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logo}>
          <Briefcase size={24} />
          HireHub
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/jobs" className={styles.link}>Find Jobs</Link>
          <Link to="/jobs?type=Internship" className={styles.link}>Internships</Link>
          <Link to="/companies" className={styles.link}>Companies</Link>
        </div>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu}>
              <Link to={user.role === 'recruiter' ? '/recruiter' : '/dashboard'} className={styles.link}>
                Dashboard
              </Link>
              <div className={styles.avatar}>
                {user.name.charAt(0)}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
            </>
          )}
        </div>

        <button className={styles.mobileToggle}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
