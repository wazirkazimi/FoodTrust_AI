import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const GradingPanel = ({ scores }) => {
  const grades = [
    {
      name: 'Custom Score',
      grade: scores.customScore,
      type: 'score',
      description: 'Personalized based on your health goals'
    },
    {
      name: 'Nutri-Score',
      grade: scores.nutriScore,
      type: 'grade',
      description: 'European health grading system',
      flag: '🇪🇺'
    },
    {
      name: 'Nutri-Grade',
      grade: scores.nutriGrade,
      type: 'grade',
      description: 'Singapore health grading system',
      flag: '🇸🇬'
    },
    {
      name: 'Japanese Grade',
      grade: scores.japaneseGrade,
      type: 'grade',
      description: 'Japanese nutritional balance',
      flag: '🇯🇵'
    }
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Health Grades</h3>

      <div className="grid grid-cols-2 gap-4">
        {grades.map((item) => (
          <div key={item.name} className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center mb-2">
              {item.flag && <span className="text-lg mr-1">{item.flag}</span>}
              <Badge variant="grade" size="lg">
                {item.type === 'score' ? `${item.grade}/10` : item.grade}
              </Badge>
            </div>
            <h4 className="font-medium text-gray-800 text-sm mb-1">
              {item.name}
            </h4>
            <p className="text-xs text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GradingPanel;