import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import Button from '../../components/common/Button';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate finding role by email - hacky mock logic
    const role = email.includes('recruiter') ? 'recruiter' : 'seeker';
    
    const success = await login(email, password, role);
    
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
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Enter your details to access your account.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email address</label>
            <input 
              id="email" 
              type="email" 
              className={styles.input} 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              className={styles.input} 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className={styles.forgotLink}>Forgot password?</a>
          </div>
          
          <Button type="submit" variant="primary" fullWidth style={{ marginTop: '1rem' }}>
            Sign In
          </Button>
        </form>
        
        <div className={styles.divider}>OR</div>
        
        <Button 
          variant="outline" 
          fullWidth 
          onClick={async () => {
            // Google Login is just a Demo Login for the portfolio
            alert("Google OAuth is not configured. Logging you in with a Demo Account (aditya@example.com) instead.");
            const success = await login("aditya@example.com", "password123", "seeker");
            if (success) navigate('/');
          }}
        >
          Continue with Google (Demo)
        </Button>
        
        <p className={styles.footerText}>
          Don't have an account? <Link to="/register" className={styles.footerLink}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
