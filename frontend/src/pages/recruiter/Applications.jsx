import React from 'react';
import styles from '../seeker/Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

const Applications = () => {
  const { user, jobs, applications, updateApplicationStatus } = useAppContext();

  // Mock filtering jobs by recruiter's company
  const myJobs = jobs.filter(j => j.company === user.company);
  const myJobIds = myJobs.map(j => j.id);
  const myApplications = applications.filter(app => myJobIds.includes(app.jobId));

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Candidate Applications</h1>
        <p className={styles.subtitle}>Review and manage incoming job applications.</p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Applications ({myApplications.length})</h2>
        </div>

        {myApplications.length > 0 ? (
          <div style={{overflowX: 'auto'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job Role</th>
                  <th>Applied Date</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map((app, idx) => (
                  <tr key={idx}>
                    <td style={{fontWeight: 500}}>
                      <div>Candidate #{app.id}</div>
                      <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>candidate{app.id}@email.com</div>
                    </td>
                    <td>{app.jobTitle}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td><StatusBadge type={app.status} /></td>
                    <td>
                      <select 
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
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

export default Applications;
