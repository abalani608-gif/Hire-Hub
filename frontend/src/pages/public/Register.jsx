import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import Button from '../../components/common/Button';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  
  const [role, setRole] = useState('seeker'); // seeker or recruiter
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register({ ...formData, role });
    
    if (success) {
      if (role === 'recruiter') {
        navigate('/');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create an account</h1>
          <p className={styles.subtitle}>Join Vercado to find jobs or hire talent.</p>
        </div>
        
        <div className={styles.roleSelect}>
          <div 
            className={`${styles.roleOption} ${role === 'seeker' ? styles.active : ''}`}
            onClick={() => setRole('seeker')}
          >
            I'm looking for a job
          </div>
          <div 
            className={`${styles.roleOption} ${role === 'recruiter' ? styles.active : ''}`}
            onClick={() => setRole('recruiter')}
          >
            I'm hiring
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input 
              id="name" 
              type="text" 
              className={styles.input} 
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email address</label>
            <input 
              id="email" 
              type="email" 
              className={styles.input} 
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          {role === 'recruiter' && (
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="company">Company Name</label>
              <input 
                id="company" 
                type="text" 
                className={styles.input} 
                placeholder="TechNova Inc."
                value={formData.company}
                onChange={handleChange}
                required 
              />
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              className={styles.input} 
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required 
              minLength={6}
            />
          </div>
          
          <div className={styles.optionsRow} style={{ marginTop: '0.5rem' }}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" required /> I agree to the Terms of Service
            </label>
          </div>
          
          <Button type="submit" variant="primary" fullWidth style={{ marginTop: '1rem' }}>
            Create Account
          </Button>
        </form>
        
        <p className={styles.footerText}>
          Already have an account? <Link to="/login" className={styles.footerLink}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
