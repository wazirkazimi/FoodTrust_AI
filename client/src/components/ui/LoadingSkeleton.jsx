import React from 'react';

export default function LoadingSkeleton({ className = '' }) {
  return <div className={`bg-gray-300 animate-pulse ${className}`}></div>;
}
