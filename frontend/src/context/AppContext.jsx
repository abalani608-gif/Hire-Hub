import React, { createContext, useState, useEffect } from 'react';
import { mockUsers, jobs, internships, companies } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedSaved = localStorage.getItem('savedJobs');
    if (storedSaved) setSavedJobs(JSON.parse(storedSaved));
    
    const storedApplied = localStorage.getItem('appliedJobs');
    if (storedApplied) setAppliedJobs(JSON.parse(storedApplied));
  }, []);

  const login = (email, password) => {
    const usersArray = Object.values(mockUsers);
    const foundUser = usersArray.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const saveJob = (id) => {
    let newSaved;
    if (savedJobs.includes(id)) {
      newSaved = savedJobs.filter(jobId => jobId !== id);
    } else {
      newSaved = [...savedJobs, id];
    }
    setSavedJobs(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  const applyJob = (id) => {
    if (!appliedJobs.includes(id)) {
      const newApplied = [...appliedJobs, id];
      setAppliedJobs(newApplied);
      localStorage.setItem('appliedJobs', JSON.stringify(newApplied));
    }
  };

  return (
    <AppContext.Provider value={{ user, login, logout, jobs, internships, companies, savedJobs, saveJob, appliedJobs, applyJob }}>
      {children}
    </AppContext.Provider>
  );
};
