import React from 'react';

/**
 * Reusable Badge Component
 * Types: 'success' | 'warning' | 'info' | 'danger'
 */
const Badge = ({ text, type = 'info' }) => {
  return (
    <span className={`badge badge-${type}`}>
      {text}
    </span>
  );
};

export default Badge;