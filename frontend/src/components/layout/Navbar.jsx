import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>Vercado</div>
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>☰</button>
        <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
          <NavLink to='/' className={({isActive}) => isActive ? styles.active : ''} end>Home</NavLink>
          <NavLink to='/jobs' className={({isActive}) => isActive ? styles.active : ''}>Jobs</NavLink>
          <NavLink to='/internships' className={({isActive}) => isActive ? styles.active : ''}>Internships</NavLink>
          <NavLink to='/companies' className={({isActive}) => isActive ? styles.active : ''}>Companies</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
