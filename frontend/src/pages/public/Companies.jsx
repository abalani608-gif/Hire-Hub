import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import styles from './Companies.module.css';

const Companies = () => {
  const { companies } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filteredCompanies = useMemo(() => {
    let result = companies;
    if (search) {
      result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()));
    }
    return result;
  }, [companies, search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Companies ({filteredCompanies.length})</h2>
        <input 
          type="text" 
          placeholder="Search by name or industry..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className={styles.input} 
        />
      </div>
      
      <div className={styles.companyGrid}>
        {filteredCompanies.map(company => (
          <div key={company.id} className={styles.card}>
            <img src={company.logo} alt={company.name} className={styles.logo} />
            <h3>{company.name}</h3>
            <p className={styles.industry}>{company.industry}</p>
            <p>{company.location}</p>
            <Link to={`/companies/${company.id}`} className={styles.link}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
