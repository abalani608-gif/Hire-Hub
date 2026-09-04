import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../seeker/Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

const ManageJobs = () => {
  const { user, jobs, deleteJob } = useAppContext();

  // Mock filtering jobs by recruiter's company
  const myJobs = jobs.filter(j => j.company === user.company);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      deleteJob(id);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Jobs</h1>
        <p className={styles.subtitle}>View, edit, or delete your active job postings.</p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Active Postings ({myJobs.length})</h2>
          <Link to="/recruiter/post-job"><Button size="sm">Post New Job</Button></Link>
        </div>

        {myJobs.length > 0 ? (
          <div style={{overflowX: 'auto'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map(job => (
                  <tr key={job.id}>
                    <td style={{fontWeight: 500}}>
                      <Link to={`/jobs/${job.id}`} style={{color: 'var(--primary)', textDecoration: 'none'}}>
                        {job.title}
                      </Link>
                    </td>
                    <td>{job.location}</td>
                    <td><StatusBadge type={job.jobType} /></td>
                    <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)} style={{color: 'var(--danger)'}}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>You haven't posted any jobs yet.</p>
            <Link to="/recruiter/post-job"><Button variant="outline" style={{marginTop: '1rem'}}>Post a Job</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
