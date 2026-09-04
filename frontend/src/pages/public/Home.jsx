import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './Home.module.css';

const Home = () => {
  const { jobs, internships, companies } = useContext(AppContext);
  const featuredJobs = jobs.slice(0, 3);
  const featuredInternships = internships.slice(0, 3);
  const topCompanies = companies.slice(0, 3);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Find Your Dream Job</h1>
        <p>Explore thousands of opportunities with Vercado.</p>
        <Link to="/jobs" className={styles.btn}>Browse Jobs</Link>
      </section>

      <section className={styles.section}>
        <h2>Featured Jobs</h2>
        <div className={styles.grid}>
          {featuredJobs.map(job => (
            <div key={job.id} className={styles.card}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <Link to={`/jobs/${job.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Featured Internships</h2>
        <div className={styles.grid}>
          {featuredInternships.map(internship => (
            <div key={internship.id} className={styles.card}>
              <h3>{internship.title}</h3>
              <p>{internship.company}</p>
              <Link to={`/internships/${internship.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Top Companies</h2>
        <div className={styles.grid}>
          {topCompanies.map(company => (
            <div key={company.id} className={styles.card}>
              <h3>{company.name}</h3>
              <Link to={`/companies/${company.id}`}>View Profile</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Why Choose Vercado</h2>
        <p>We connect the best talent with the best companies.</p>
      </section>

      <section className={styles.section}>
        <h2>How It Works</h2>
        <p>1. Create Profile &rarr; 2. Find Jobs &rarr; 3. Apply</p>
      </section>
    </div>
  );
};

export default Home;
