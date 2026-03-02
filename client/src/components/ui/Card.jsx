import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-card rounded-3xl shadow-lg p-4 ${className}`}>{children}</div>
  );
}
