import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, CheckCircle } from 'lucide-react';
import styles from './JobDetails.module.css';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { useAppContext } from '../../context/AppContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, savedJobs, saveJob, applications, applyForJob, user } = useAppContext();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Find job from mock data
    const foundJob = jobs.find(j => j.id === parseInt(id));
    if (foundJob) {
      setJob(foundJob);
    }
  }, [id, jobs]);

  if (!job) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Job not found</h2>
        <Button onClick={() => navigate('/jobs')} style={{ marginTop: '1rem' }}>Back to Jobs</Button>
      </div>
    );
  }

  const isSaved = savedJobs.includes(job.id);
  const hasApplied = applications.some(app => app.jobId === job.id);

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    applyForJob(job.id);
  };

  return (
    <div className="container animate-fade-in">
      <div className={styles.page}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.titleInfo}>
              <div className={styles.logo}>{job.company.charAt(0)}</div>
              <div>
                <h1 className={styles.title}>{job.title}</h1>
                <div className={styles.company}>{job.company}</div>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <StatusBadge type={job.jobType} />
                  <StatusBadge type={job.workMode} />
                </div>
              </div>
            </div>
            
            <div className={styles.actions}>
              <Button 
                variant={isSaved ? 'outline' : 'secondary'} 
                onClick={() => saveJob(job.id)}
              >
                {isSaved ? 'Saved' : 'Save Job'}
              </Button>
              <Button 
                variant="primary" 
                onClick={handleApply}
                disabled={hasApplied}
                icon={hasApplied && <CheckCircle size={18} />}
              >
                {hasApplied ? 'Applied' : 'Apply Now'}
              </Button>
            </div>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <MapPin className={styles.metaIcon} size={20} />
              <div>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{job.location}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <DollarSign className={styles.metaIcon} size={20} />
              <div>
                <span className={styles.metaLabel}>Salary</span>
                <span className={styles.metaValue}>{job.salary}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <Briefcase className={styles.metaIcon} size={20} />
              <div>
                <span className={styles.metaLabel}>Experience</span>
                <span className={styles.metaValue}>{job.experience}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <Clock className={styles.metaIcon} size={20} />
              <div>
                <span className={styles.metaLabel}>Posted Date</span>
                <span className={styles.metaValue}>{new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <div className={styles.mainColumn}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Job Description</h2>
              <p>{job.description}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Responsibilities</h2>
              <ul className={styles.list}>
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Requirements</h2>
              <ul className={styles.list}>
                {job.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Required Skills</h2>
              <div className={styles.skillsList}>
                {job.skills.map((skill, idx) => (
                  <span key={idx} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.sideColumn}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>About the Company</h3>
              <p className={styles.sideCardText}>{job.aboutCompany}</p>
              <Button variant="outline" fullWidth style={{ marginTop: '1rem' }}>
                View Company Profile
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
