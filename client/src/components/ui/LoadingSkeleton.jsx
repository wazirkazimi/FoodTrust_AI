import React from 'react';

const LoadingSkeleton = ({
  className = '',
  lines = 1,
  height = 'h-4',
  width = 'w-full'
}) => {
  if (lines === 1) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`} />
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 rounded ${height} ${
            index === lines - 1 ? 'w-3/4' : width
          }`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;