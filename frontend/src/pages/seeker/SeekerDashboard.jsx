import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Bookmark, FileText } from 'lucide-react';
import styles from './Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

const SeekerDashboard = () => {
  const { user, applications, savedJobs } = useAppContext();

  const myApplications = applications.filter(app => true); // In real app, filter by user ID

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back, {user.name}!</h1>
        <p className={styles.subtitle}>Here is what's happening with your job search.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FileText size={24} /></div>
          <div className={styles.statInfo}>
            <h3>{myApplications.length}</h3>
            <p>Applied Jobs</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: 'var(--success-bg)', color: 'var(--success)'}}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{myApplications.filter(a => a.status === 'Shortlisted').length}</h3>
            <p>Shortlisted</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: 'var(--warning-bg)', color: 'var(--warning)'}}>
            <Bookmark size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{savedJobs.length}</h3>
            <p>Saved Jobs</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Applications</h2>
          <Link to="/applied-jobs"><Button variant="ghost" size="sm">View All</Button></Link>
        </div>
        
        {myApplications.length > 0 ? (
          <div style={{overflowX: 'auto'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Job Role</th>
                  <th>Company</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.slice(0, 5).map(app => (
                  <tr key={app.id}>
                    <td style={{fontWeight: 500}}>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td><StatusBadge type={app.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>You haven't applied to any jobs yet.</p>
            <Link to="/jobs"><Button variant="outline" style={{marginTop: '1rem'}}>Find Jobs</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerDashboard;
