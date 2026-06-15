import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../ui/Card';
import GradeCircle from '../ui/GradeCircle';

ChartJS.register(ArcElement, Tooltip, Legend);

const HealthScoreCard = ({ score, grade, title, subtitle }) => {
  const chartData = {
    datasets: [{
      data: [score, 10 - score],
      backgroundColor: [
        '#7C3AED', // Primary purple
        '#E5E7EB'  // Light gray
      ],
      borderWidth: 0,
      cutout: '70%'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        <GradeCircle grade={grade} score={score} />
      </div>

      <div className="relative h-32 flex items-center justify-center">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{score}</div>
            <div className="text-xs text-gray-500">out of 10</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HealthScoreCard;