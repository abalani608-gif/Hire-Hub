import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Briefcase, DollarSign } from 'lucide-react';
import styles from './JobCard.module.css';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const JobCard = ({ job }) => {
  const { savedJobs, saveJob } = useAppContext();
  const isSaved = savedJobs.includes(job.id);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveJob(job.id);
  };

  return (
    <Link to={`/jobs/${job.id}`} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <div className={styles.logoPlaceholder}>
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className={styles.title}>{job.title}</h3>
            <p className={styles.companyName}>{job.company}</p>
          </div>
        </div>
        <button 
          className={`${styles.bookmarkBtn} ${isSaved ? styles.saved : ''}`}
          onClick={handleSave}
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          <Bookmark size={20} className={isSaved ? styles.saved : ''} />
        </button>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <MapPin size={16} />
          {job.location}
        </div>
        <div className={styles.detailItem}>
          <Briefcase size={16} />
          {job.experience}
        </div>
        <div className={styles.detailItem}>
          <DollarSign size={16} />
          {job.salary}
        </div>
      </div>

      <div className={styles.skills}>
        <StatusBadge type={job.jobType} />
        <StatusBadge type={job.workMode} />
        {job.skills.slice(0, 2).map((skill, index) => (
          <span key={index} className={styles.skillBadge}>{skill}</span>
        ))}
        {job.skills.length > 2 && (
          <span className={styles.skillBadge}>+{job.skills.length - 2} more</span>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.postedDate}>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
        <Button variant="outline" size="sm">View Details</Button>
      </div>
    </Link>
  );
};

export default JobCard;
