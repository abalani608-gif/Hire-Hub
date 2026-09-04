import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import JobCard from '../../components/specific/JobCard';
import Button from '../../components/common/Button';

const SavedJobs = () => {
  const { savedJobs, jobs } = useAppContext();

  // Find the full job objects for the saved IDs
  const savedJobObjects = jobs.filter(job => savedJobs.includes(job.id));

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Saved Jobs</h1>
        <p className={styles.subtitle}>Jobs you've bookmarked for later.</p>
      </div>

      {savedJobObjects.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {savedJobObjects.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className={styles.section} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className={styles.emptyState}>
            <p>You have no saved jobs.</p>
            <Link to="/jobs"><Button variant="outline" style={{marginTop: '1rem'}}>Browse Jobs</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
