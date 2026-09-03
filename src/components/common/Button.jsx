import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md', // sm, md, lg
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
