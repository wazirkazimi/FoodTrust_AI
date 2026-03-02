import React from 'react';

export default function Badge({ children, color = 'primary', className = '' }) {
  const bg = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white'
  }[color];

  return <span className={`${bg} px-2 py-1 rounded-full text-xs ${className}`}>{children}</span>;
}
