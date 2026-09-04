import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/public/Home';
import Jobs from '../pages/public/Jobs';
import JobDetails from '../pages/public/JobDetails';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

// Seeker Pages
import SeekerDashboard from '../pages/seeker/SeekerDashboard';
import Profile from '../pages/seeker/Profile';
import AppliedJobs from '../pages/seeker/AppliedJobs';
import SavedJobs from '../pages/seeker/SavedJobs';

// Recruiter Pages
import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import PostJob from '../pages/recruiter/PostJob';
import ManageJobs from '../pages/recruiter/ManageJobs';
import Applications from '../pages/recruiter/Applications';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with MainLayout (Navbar + Footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Authenticated Routes with DashboardLayout (Sidebar) */}
        <Route element={<DashboardLayout />}>
          {/* Seeker Routes */}
          <Route path="/dashboard" element={<SeekerDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/recruiter/post-job" element={<PostJob />} />
          <Route path="/recruiter/jobs" element={<ManageJobs />} />
          <Route path="/recruiter/applications" element={<Applications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
