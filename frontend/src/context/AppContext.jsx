import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user on startup if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Error loading user", error);
        }
      }
      setLoading(false);
    };
    
    loadUser();
    fetchJobs();
  }, []);

  // Fetch applications when user changes
  useEffect(() => {
    if (user) {
      fetchApplications();
    } else {
      setApplications([]);
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = user.role === 'recruiter' ? '/applications/recruiter' : '/applications/me';
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications", error);
    }
  };

  // Auth Functions
  const login = async (email, password, role) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return true;
      }
      alert(data.message || 'Login failed');
      return false;
    } catch (error) {
      alert('Error logging in');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return true;
      }
      alert(data.message || 'Registration failed');
      return false;
    } catch (error) {
      alert('Error registering');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Seeker Functions
  const saveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const applyForJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/applications/${jobId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchApplications(); // refresh apps
        alert('Applied successfully');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to apply');
      }
    } catch (error) {
      alert('Error applying');
    }
  };

  // Recruiter Functions
  const postJob = async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(jobData)
      });
      if (res.ok) {
        fetchJobs(); // refresh jobs
        alert('Job posted successfully');
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      alert('Error posting job');
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchJobs();
      }
    } catch (error) {
      alert('Error deleting job');
    }
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/applications/${appId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchApplications();
      }
    } catch (error) {
      alert('Error updating status');
    }
  };

  const value = {
    user,
    jobs,
    applications,
    savedJobs,
    loading,
    login,
    logout,
    register,
    saveJob,
    applyForJob,
    postJob,
    deleteJob,
    updateApplicationStatus
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
