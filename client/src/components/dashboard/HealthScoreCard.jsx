import React from 'react';
import GradeCircle from '../ui/GradeCircle';

export default function HealthScoreCard({ score }) {
  return (
    <div className="flex items-center">
      <GradeCircle score={score} />
      <div className="ml-4">
        <h3 className="font-semibold">Health Score</h3>
        <p>{score}/10</p>
      </div>
    </div>
  );
}
