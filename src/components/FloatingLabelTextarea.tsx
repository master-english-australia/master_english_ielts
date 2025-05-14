'use client';

import React from 'react';
import styles from './FloatingLabelTextarea.module.css';

interface FloatingLabelTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}; 