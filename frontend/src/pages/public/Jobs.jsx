import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import styles from './Jobs.module.css';
import { formatDate } from '../../utils/dateFormatter';

const Jobs = () => {
  const { jobs } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [sort, setSort] = useState('newest');

  const filteredJobs = useMemo(() => {
    let result = jobs;
    if (search) {
      result = result.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));
    }
    if (jobType) {
      result = result.filter(j => j.type === jobType);
    }
    if (workMode) {
      result = result.filter(j => j.workMode === workMode);
    }
    if (sort === 'newest') {
      result = [...result].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }
    return result;
  }, [jobs, search, jobType, workMode, sort]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Filters</h3>
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className={styles.input} />
        
        <label>Job Type</label>
        <select value={jobType} onChange={e => setJobType(e.target.value)} className={styles.select}>
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <label>Work Mode</label>
        <select value={workMode} onChange={e => setWorkMode(e.target.value)} className={styles.select}>
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <label>Sort</label>
        <select value={sort} onChange={e => setSort(e.target.value)} className={styles.select}>
          <option value="newest">Newest</option>
          <option value="salary">Salary (mock)</option>
        </select>
      </div>
      
      <div className={styles.content}>
        <h2>Jobs ({filteredJobs.length})</h2>
        <div className={styles.grid}>
          {filteredJobs.map(job => (
            <div key={job.id} className={styles.card}>
              <h3>{job.title}</h3>
              <p className={styles.company}>{job.company}</p>
              <p>{job.location} • {job.type} • {job.workMode}</p>
              <p className={styles.date}>{formatDate(job.postedDate)}</p>
              <Link to={`/jobs/${job.id}`} className={styles.link}>View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
