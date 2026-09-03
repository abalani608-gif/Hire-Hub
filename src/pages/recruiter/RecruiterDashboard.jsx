import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, FileText } from 'lucide-react';
import styles from '../seeker/Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

const RecruiterDashboard = () => {
  const { user, jobs, applications } = useAppContext();

  // Mock filtering jobs by recruiter's company
  const myJobs = jobs.filter(j => j.company === user.company);
  const myJobIds = myJobs.map(j => j.id);
  const myApplications = applications.filter(app => myJobIds.includes(app.jobId));

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Company Dashboard</h1>
        <p className={styles.subtitle}>{user.company}</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Briefcase size={24} /></div>
          <div className={styles.statInfo}>
            <h3>{myJobs.length}</h3>
            <p>Active Jobs</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: 'var(--success-bg)', color: 'var(--success)'}}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{myApplications.length}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: 'var(--warning-bg)', color: 'var(--warning)'}}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{myApplications.filter(a => a.status === 'Shortlisted').length}</h3>
            <p>Shortlisted</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Applications</h2>
          <Link to="/recruiter/applications"><Button variant="ghost" size="sm">View All</Button></Link>
        </div>
        
        {myApplications.length > 0 ? (
          <div style={{overflowX: 'auto'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job Role</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.slice(0, 5).map((app, idx) => (
                  <tr key={idx}>
                    <td style={{fontWeight: 500}}>Candidate #{app.id}</td>
                    <td>{app.jobTitle}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td><StatusBadge type={app.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No applications received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
