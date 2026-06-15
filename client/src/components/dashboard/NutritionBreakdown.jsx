import React from 'react';
import Card from '../ui/Card';

const NutritionBreakdown = ({ nutrition }) => {
  const nutrients = [
    { name: 'Calories', value: nutrition.calories, unit: 'kcal', max: 400, good: 200 },
    { name: 'Sugar', value: nutrition.sugar, unit: 'g', max: 15, good: 5 },
    { name: 'Fat', value: nutrition.fat, unit: 'g', max: 20, good: 10 },
    { name: 'Saturated Fat', value: nutrition.saturatedFat, unit: 'g', max: 5, good: 2 },
    { name: 'Trans Fat', value: nutrition.transFat, unit: 'g', max: 0, good: 0 },
    { name: 'Protein', value: nutrition.protein, unit: 'g', max: 50, good: 15 },
    { name: 'Fiber', value: nutrition.fiber, unit: 'g', max: 30, good: 5 }
  ];

  const getBarColor = (value, max, good) => {
    if (value <= good) return 'bg-success';
    if (value <= max) return 'bg-warning';
    return 'bg-danger';
  };

  const getBarWidth = (value, max) => {
    return Math.min((value / max) * 100, 100);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Nutrition Breakdown</h3>

      <div className="space-y-4">
        {nutrients.map((nutrient) => {
          const width = getBarWidth(nutrient.value, nutrient.max);
          const color = getBarColor(nutrient.value, nutrient.max, nutrient.good);

          return (
            <div key={nutrient.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {nutrient.name}
                </span>
                <span className="text-sm text-gray-600">
                  {nutrient.value}{nutrient.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${color}`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0{nutrient.unit}</span>
                <span>{nutrient.max}{nutrient.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-gray-600">Good</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-gray-600">Moderate</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            <span className="text-gray-600">High</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NutritionBreakdown;