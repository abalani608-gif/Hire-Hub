import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { AppContext } from '../../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Pass role as seeker for now, since it's just a mock
    const success = await login(email, password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password. Try demo login.');
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const success = await login("aditya@example.com", "password123");
    if (success) navigate('/');
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.leftPane}>
        <div className={styles.brandingInfo}>
          <div className={styles.logo}>V</div>
          <h1 className={styles.brandTitle}>Vercado</h1>
          <p className={styles.brandSubtitle}>
            Your journey to the perfect career starts here.
          </p>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.check}>✓</span> Access thousands of premium jobs
            </div>
            <div className={styles.featureItem}>
              <span className={styles.check}>✓</span> Connect with top industry recruiters
            </div>
            <div className={styles.featureItem}>
              <span className={styles.check}>✓</span> One-click application process
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.rightPane}>
        <div className={styles.authCard}>
          <div className={styles.mobileHeader}>
             <div className={styles.logoSmall}>V</div>
             <h1 className={styles.brandTitleSmall}>Vercado</h1>
          </div>
          
          <div className={styles.header}>
            <h2 className={styles.title}>Welcome back</h2>
            <p className={styles.subtitle}>Enter your details to access your account.</p>
          </div>
          
          {error && <div className={styles.errorAlert}>{error}</div>}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">Email address</label>
              <input 
                id="email" 
                type="email" 
                className={styles.input} 
                placeholder="aditya@example.com"
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <button type="submit" className={styles.primaryBtn}>
              Sign In
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>OR</span>
          </div>
          
          <button onClick={handleDemoLogin} className={styles.demoBtn}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" className={styles.googleIcon}/>
            Continue with Google (Demo)
          </button>
          
          <p className={styles.footerText}>
            Don't have an account? <Link to="/register" className={styles.footerLink}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
