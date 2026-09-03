import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../seeker/Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import Button from '../../components/common/Button';

const PostJob = () => {
  const { postJob } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    workMode: 'Remote',
    experience: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process string lists into arrays
    const formattedData = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    };

    postJob(formattedData);
    navigate('/recruiter/jobs');
  };

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Post a New Job</h1>
        <p className={styles.subtitle}>Fill out the details below to attract top talent.</p>
      </div>

      <div className={styles.section}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Job Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Location *</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Salary Range</label>
              <input type="text" name="salary" placeholder="e.g. ₹10,00,000 - ₹15,00,000/yr" value={formData.salary} onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Experience</label>
              <input type="text" name="experience" placeholder="e.g. 2-4 years" value={formData.experience} onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Work Mode</label>
              <select name="workMode" value={formData.workMode} onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Job Description *</label>
            <textarea name="description" rows="4" required value={formData.description} onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Responsibilities (one per line) *</label>
            <textarea name="responsibilities" rows="4" required value={formData.responsibilities} onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Requirements (one per line) *</label>
            <textarea name="requirements" rows="4" required value={formData.requirements} onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Required Skills (comma separated) *</label>
            <input type="text" name="skills" required placeholder="e.g. React, Node.js, CSS" value={formData.skills} onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button type="submit" size="lg">Post Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
