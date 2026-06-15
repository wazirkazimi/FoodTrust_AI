import React from 'react';
import { getGradeColor, getGradeBgColor } from '../../utils/gradingAlgorithms';

const GradeCircle = ({
  grade,
  score,
  size = 'md',
  showScore = true,
  className = ''
}) => {
  const sizes = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl',
    xl: 'w-24 h-24 text-3xl'
  };

  const bgColor = getGradeBgColor(grade);

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className={`w-full h-full rounded-full ${bgColor} flex items-center justify-center font-bold border-2`}>
        {grade}
      </div>
      {showScore && score !== undefined && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {score}/10
        </div>
      )}
    </div>
  );
};

export default GradeCircle;