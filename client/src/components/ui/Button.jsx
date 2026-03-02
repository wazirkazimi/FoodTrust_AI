import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
