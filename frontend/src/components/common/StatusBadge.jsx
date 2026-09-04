import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ type, text }) => {
  // Normalize type for CSS class (e.g. "Full-time" -> "full_time")
  const normalizedType = type.toLowerCase().replace('-', '_').replace(' ', '_');
  
  const className = `${styles.badge} ${styles[normalizedType] || ''}`;

  return (
    <span className={className}>
      {text || type}
    </span>
  );
};

export default StatusBadge;
