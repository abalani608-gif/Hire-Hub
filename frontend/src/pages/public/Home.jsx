import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './Home.module.css';

const Home = () => {
  const { jobs, internships, companies } = useContext(AppContext);
  
  const featuredJobs = jobs?.slice(0, 6) || [];
  const featuredInternships = internships?.slice(0, 3) || [];
  const topCompanies = companies?.slice(0, 4) || [];

  return (
    <div className={styles.home}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <h1>Find the Right Job.<br/><span>Build Your Future.</span></h1>
        <p>Explore thousands of job opportunities and internships from top companies.</p>
        
        <div className={styles.searchBar}>
          <input type="text" placeholder="Job title, skills, or company" className={styles.searchInput} />
          <input type="text" placeholder="City, state, or 'Remote'" className={styles.searchInput} />
          <button className={styles.searchBtn}>Search</button>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Jobs</h2>
          <Link to="/jobs" className={styles.viewAll}>View All Jobs &rarr;</Link>
        </div>
        <div className={styles.grid}>
          {featuredJobs.map(job => (
            <div key={job.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>{job.title}</h3>
                  <p className={styles.cardCompany}>{job.company} &bull; {job.location}</p>
                </div>
              </div>
              <div className={styles.cardTags}>
                <span className={styles.tag}>{job.jobType || job.type}</span>
                <span className={styles.tag}>{job.workMode}</span>
                <span className={styles.tag}>{job.experience}</span>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.salary}>{job.salary}</span>
                <Link to={`/jobs/${job.id}`} className={styles.applyBtn}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED INTERNSHIPS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Internships</h2>
          <Link to="/internships" className={styles.viewAll}>View All Internships &rarr;</Link>
        </div>
        <div className={styles.grid}>
          {featuredInternships.map(intern => (
            <div key={intern.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>{intern.title}</h3>
                  <p className={styles.cardCompany}>{intern.company} &bull; {intern.location}</p>
                </div>
              </div>
              <div className={styles.cardTags}>
                <span className={styles.tag}>Internship</span>
                <span className={styles.tag}>{intern.workMode}</span>
                <span className={styles.tag}>{intern.duration}</span>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.salary}>{intern.stipend}</span>
                <Link to={`/internships/${intern.id}`} className={styles.applyBtn}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Top Companies</h2>
          <Link to="/companies" className={styles.viewAll}>View All Companies &rarr;</Link>
        </div>
        <div className={styles.companyGrid}>
          {topCompanies.map(company => (
            <Link to={`/companies/${company.id}`} key={company.id} className={styles.companyCard}>
              <div className={styles.companyLogo}>{company.name.charAt(0)}</div>
              <h3 className={styles.companyName}>{company.name}</h3>
              <p className={styles.companyIndustry}>{company.industry}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
