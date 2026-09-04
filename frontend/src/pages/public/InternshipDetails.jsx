import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { formatDate } from '../../utils/dateFormatter';
import styles from './Details.module.css';

const InternshipDetails = () => {
  const { id } = useParams();
  const { internships, savedJobs, saveJob, appliedJobs, applyJob } = useContext(AppContext);
  const internship = internships.find(i => i.id === id);

  if (!internship) return <div className={styles.container}>Internship not found</div>;

  const isSaved = savedJobs.includes(id);
  const isApplied = appliedJobs.includes(id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{internship.title}</h2>
        <Link to={`/companies/${internship.companyId}`} className={styles.companyLink}>{internship.company}</Link>
        <p className={styles.meta}>{internship.location} • {internship.duration} • {internship.workMode}</p>
        <p className={styles.date}>{formatDate(internship.postedDate)}</p>
        {internship.fresherFriendly && <span className={styles.badge}>Fresher Friendly</span>}
      </div>

      <div className={styles.actions}>
        <button 
          onClick={() => applyJob(id)} 
          className={`${styles.btn} ${isApplied ? styles.applied : ''}`}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
        <button 
          onClick={() => saveJob(id)} 
          className={`${styles.btnOutline} ${isSaved ? styles.saved : ''}`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className={styles.section}>
        <h3>Stipend</h3>
        <p>{internship.stipend}</p>
      </div>

      <div className={styles.section}>
        <h3>Skills Required</h3>
        <div className={styles.skills}>
          {internship.skills.map(s => <span key={s} className={styles.skill}>{s}</span>)}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Description</h3>
        <p>{internship.description}</p>
      </div>
    </div>
  );
};

export default InternshipDetails;
