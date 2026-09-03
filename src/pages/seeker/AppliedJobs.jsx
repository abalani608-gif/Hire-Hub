import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

const AppliedJobs = () => {
  const { applications } = useAppContext();

  // In a real app, this would filter by the logged-in user's ID
  const myApplications = applications;

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Applied Jobs</h1>
        <p className={styles.subtitle}>Track the status of all your job applications.</p>
      </div>

      <div className={styles.section}>
        {myApplications.length > 0 ? (
          <div style={{overflowX: 'auto'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Job Role</th>
                  <th>Company</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map(app => (
                  <tr key={app.id}>
                    <td style={{fontWeight: 500}}>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td><StatusBadge type={app.status} /></td>
                    <td>
                      <Link to={`/jobs/${app.jobId}`}>
                        <Button variant="ghost" size="sm">View Job</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>You haven't applied to any jobs yet.</p>
            <Link to="/jobs"><Button variant="outline" style={{marginTop: '1rem'}}>Browse Jobs</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
