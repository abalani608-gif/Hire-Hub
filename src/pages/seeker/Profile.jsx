import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import Button from '../../components/common/Button';
import { User, Mail, Briefcase, GraduationCap } from 'lucide-react';

const Profile = () => {
  const { user } = useAppContext();
  
  // Local state for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    about: user?.about || '',
    skills: user?.skills?.join(', ') || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would dispatch an update to the backend
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.subtitle}>Manage your personal information and resume.</p>
      </div>

      <div className={styles.section} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%', 
          backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3rem', fontWeight: 'bold'
        }}>
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div style={{ flex: 1 }}>
          {!isEditing ? (
            <>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{formData.name}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{formData.headline}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Mail size={18} /> {user?.email}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>About</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{formData.about || 'No description provided.'}</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Skills</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {formData.skills ? formData.skills.split(',').map((skill, idx) => (
                    <span key={idx} style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--background)', borderRadius: '999px', fontSize: '0.875rem' }}>
                      {skill.trim()}
                    </span>
                  )) : <span style={{ color: 'var(--text-muted)' }}>No skills added.</span>}
                </div>
              </div>

              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </>
          ) : (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Full Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Professional Headline</label>
                <input 
                  type="text" name="headline" value={formData.headline} onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>About Me</label>
                <textarea 
                  name="about" value={formData.about} onChange={handleChange} rows="4"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>Skills (comma separated)</label>
                <input 
                  type="text" name="skills" value={formData.skills} onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button type="submit">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
