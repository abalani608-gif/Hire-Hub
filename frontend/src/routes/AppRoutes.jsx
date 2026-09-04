import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/public/Home';
import Jobs from '../pages/public/Jobs';
import Internships from '../pages/public/Internships';
import Companies from '../pages/public/Companies';
import JobDetails from '../pages/public/JobDetails';
import InternshipDetails from '../pages/public/InternshipDetails';
import CompanyDetails from '../pages/public/CompanyDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="internships" element={<Internships />} />
        <Route path="companies" element={<Companies />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="internships/:id" element={<InternshipDetails />} />
        <Route path="companies/:id" element={<CompanyDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
