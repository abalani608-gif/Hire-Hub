import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import styles from './Jobs.module.css';
import JobCard from '../../components/specific/JobCard';
import Button from '../../components/common/Button';
import { useAppContext } from '../../context/AppContext';

const Jobs = () => {
  const { jobs } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    workMode: []
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  // Filter jobs based on search term and active filters
  const filteredJobs = jobs.filter(job => {
    // Search matching
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Type matching
    const matchesType = activeFilters.type.length === 0 || 
      activeFilters.type.includes(job.jobType);
      
    // Work mode matching
    const matchesMode = activeFilters.workMode.length === 0 || 
      activeFilters.workMode.includes(job.workMode);

    return matchesSearch && matchesType && matchesMode;
  });

  return (
    <div className="container animate-fade-in">
      <div className={styles.page}>
        
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Job Type</h3>
            <div className={styles.checkboxList}>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                <label key={type} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={activeFilters.type.includes(type)}
                    onChange={() => toggleFilter('type', type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Work Mode</h3>
            <div className={styles.checkboxList}>
              {['Remote', 'Hybrid', 'On-site'].map(mode => (
                <label key={mode} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={activeFilters.workMode.includes(mode)}
                    onChange={() => toggleFilter('workMode', mode)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <Button variant="outline" className={styles.mobileFilterBtn} icon={<Filter size={16} />}>
            Show Filters
          </Button>

          <div className={styles.searchHeader}>
            <form className={styles.searchBox} onSubmit={handleSearch}>
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Search by job title, skill, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className={styles.searchBtn}>
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className={styles.resultsHeader}>
            <span>Showing {filteredJobs.length} jobs</span>
            <div>
              <select className={styles.sortSelect} defaultValue="newest">
                <option value="newest">Newest First</option>
                <option value="relevant">Most Relevant</option>
              </select>
            </div>
          </div>

          <div className={styles.jobList}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <h3>No jobs found matching your criteria.</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
