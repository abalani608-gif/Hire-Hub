import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2>Vercado</h2>
        <p>Find the right opportunity and build your future.</p>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/internships">Internships</Link>
          <Link to="/companies">Companies</Link>
        </div>
        <p className={styles.copyright}>Designed & Developed by Antigravity</p>
      </div>
    </footer>
  );
};

export default Footer;
