import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import styles from './Home.module.css';
import Button from '../../components/common/Button';
import JobCard from '../../components/specific/JobCard';
import { useAppContext } from '../../context/AppContext';

const Home = () => {
  const { jobs } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`);
  };

  const featuredJobs = jobs.slice(0, 6); // First 6 jobs as featured

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>
            Find the Right Job. <br /><span>Build Your Future.</span>
          </h1>
          <p className={styles.subtitle}>
            Explore thousands of job opportunities and internships from top companies.
          </p>

          <form className={styles.searchBox} onSubmit={handleSearch}>
            <div className={styles.inputGroup}>
              <Search size={20} className="text-muted" />
              <input 
                type="text" 
                placeholder="Job title, skills, or company" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <MapPin size={20} className="text-muted" />
              <input 
                type="text" 
                placeholder="City, state, or 'Remote'" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg">Search</Button>
          </form>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Jobs</h2>
          <div className={styles.jobGrid}>
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Button variant="outline" size="lg" onClick={() => navigate('/jobs')}>
              View All Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
