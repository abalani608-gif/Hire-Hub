import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Globe, Mail, MessageSquare } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <Briefcase size={24} />
              HireHub
            </Link>
            <p className={styles.description}>
              Connecting top talent with the best companies. Find your dream job or internship today.
            </p>
          </div>
          
          <div className={styles.column}>
            <h4>For Candidates</h4>
            <div className={styles.links}>
              <Link to="/jobs" className={styles.link}>Browse Jobs</Link>
              <Link to="/jobs?type=Internship" className={styles.link}>Browse Internships</Link>
              <Link to="/dashboard" className={styles.link}>Candidate Dashboard</Link>
              <Link to="/saved-jobs" className={styles.link}>Saved Jobs</Link>
            </div>
          </div>
          
          <div className={styles.column}>
            <h4>For Employers</h4>
            <div className={styles.links}>
              <Link to="/recruiter/post-job" className={styles.link}>Post a Job</Link>
              <Link to="/recruiter" className={styles.link}>Employer Dashboard</Link>
              <Link to="/companies" className={styles.link}>Pricing</Link>
            </div>
          </div>
          
          <div className={styles.column}>
            <h4>HireHub</h4>
            <div className={styles.links}>
              <Link to="/about" className={styles.link}>About Us</Link>
              <Link to="/contact" className={styles.link}>Contact</Link>
              <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link to="/terms" className={styles.link}>Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} HireHub. All rights reserved.</p>
          <div className={styles.social}>
            <a href="#" className={styles.link}><Globe size={20} /></a>
            <a href="#" className={styles.link}><Mail size={20} /></a>
            <a href="#" className={styles.link}><MessageSquare size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
