import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './CompanyDetails.module.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const { companies, jobs, internships } = useContext(AppContext);
  const company = companies.find(c => c.id === id);

  if (!company) return <div className={styles.container}>Company not found</div>;

  const companyJobs = jobs.filter(j => j.companyId === id);
  const companyInternships = internships.filter(i => i.companyId === id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={company.logo} alt={company.name} className={styles.logo} />
        <div>
          <h2>{company.name}</h2>
          <p className={styles.industry}>{company.industry}</p>
          <p>{company.location}</p>
          <a href={company.website} target="_blank" rel="noreferrer" className={styles.website}>Visit Website</a>
        </div>
      </div>

      <div className={styles.section}>
        <h3>About Us</h3>
        <p>{company.description}</p>
        <p><strong>Company Size:</strong> {company.companySize}</p>
      </div>

      <div className={styles.section}>
        <h3>Open Positions ({companyJobs.length + companyInternships.length})</h3>
        
        {companyJobs.length > 0 && (
          <div className={styles.list}>
            <h4>Jobs</h4>
            {companyJobs.map(job => (
              <div key={job.id} className={styles.card}>
                <h5>{job.title}</h5>
                <p>{job.location} • {job.type}</p>
                <Link to={`/jobs/${job.id}`} className={styles.link}>View Job</Link>
              </div>
            ))}
          </div>
        )}

        {companyInternships.length > 0 && (
          <div className={styles.list}>
            <h4>Internships</h4>
            {companyInternships.map(intern => (
              <div key={intern.id} className={styles.card}>
                <h5>{intern.title}</h5>
                <p>{intern.location} • {intern.duration}</p>
                <Link to={`/internships/${intern.id}`} className={styles.link}>View Internship</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
