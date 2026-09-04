import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import styles from './Internships.module.css';
import { formatDate } from '../../utils/dateFormatter';

const Internships = () => {
  const { internships } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [duration, setDuration] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [fresherFriendly, setFresherFriendly] = useState(false);

  const filteredInternships = useMemo(() => {
    let result = internships;
    if (search) {
      result = result.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase()));
    }
    if (duration) {
      result = result.filter(i => i.duration.includes(duration));
    }
    if (workMode) {
      result = result.filter(i => i.workMode === workMode);
    }
    if (fresherFriendly) {
      result = result.filter(i => i.fresherFriendly);
    }
    return result;
  }, [internships, search, duration, workMode, fresherFriendly]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Filters</h3>
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className={styles.input} />
        
        <label>Duration</label>
        <select value={duration} onChange={e => setDuration(e.target.value)} className={styles.select}>
          <option value="">All</option>
          <option value="3">3 months</option>
          <option value="4">4 months</option>
          <option value="6">6 months</option>
        </select>

        <label>Work Mode</label>
        <select value={workMode} onChange={e => setWorkMode(e.target.value)} className={styles.select}>
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={fresherFriendly} onChange={e => setFresherFriendly(e.target.checked)} />
          Fresher Friendly
        </label>
      </div>
      
      <div className={styles.content}>
        <h2>Internships ({filteredInternships.length})</h2>
        <div className={styles.grid}>
          {filteredInternships.map(internship => (
            <div key={internship.id} className={styles.card}>
              <h3>{internship.title}</h3>
              <p className={styles.company}>{internship.company}</p>
              <p>{internship.location} • {internship.duration} • {internship.workMode}</p>
              {internship.fresherFriendly && <span className={styles.badge}>Fresher Friendly</span>}
              <p className={styles.date}>{formatDate(internship.postedDate)}</p>
              <Link to={`/internships/${internship.id}`} className={styles.link}>View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internships;
