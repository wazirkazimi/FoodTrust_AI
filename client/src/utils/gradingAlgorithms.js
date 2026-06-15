// Grading algorithms for FoodTrust AI (Frontend version)
// These should match the backend implementation

/**
 * Calculate Custom Health Score (0-10)
 * @param {Object} nutrition - Nutrition data per 100g
 * @param {String} healthMode - User's health mode
 * @returns {Number} Score from 0-10
 */
export function calculateCustomScore(nutrition, healthMode = 'default') {
  let score = 10; // Start with perfect score

  const { calories, sugar, fat, saturatedFat, transFat, protein } = nutrition;

  // Base penalties
  if (sugar > 15) score -= 3;
  if (saturatedFat > 5) score -= 2;
  if (transFat > 0) score -= 3;
  if (calories > 400) score -= 1;

  // Health mode modifiers
  switch (healthMode) {
    case 'diabetic':
      if (sugar > 5) score -= 2;
      break;
    case 'weightLoss':
      if (calories > 300) score -= 1;
      if (fat > 10) score -= 1;
      break;
    case 'gym':
      if (protein > 20) score += 1; // Bonus for high protein
      if (sugar > 10) score -= 2;
      break;
  }

  return Math.max(0, Math.min(10, score));
}

/**
 * Get color for grade
 * @param {String} grade - Grade letter
 * @returns {String} Tailwind color class
 */
export function getGradeColor(grade) {
  const colors = {
    A: 'text-success',
    B: 'text-green-500',
    C: 'text-yellow-500',
    D: 'text-orange-500',
    E: 'text-danger',
    Excellent: 'text-success',
    Good: 'text-green-500',
    Fair: 'text-yellow-500',
    Poor: 'text-danger'
  };
  return colors[grade] || 'text-gray-500';
}

/**
 * Get background color for grade badge
 * @param {String} grade - Grade letter
 * @returns {String} Tailwind background class
 */
export function getGradeBgColor(grade) {
  const colors = {
    A: 'bg-success/10 text-success border-success/20',
    B: 'bg-green-500/10 text-green-500 border-green-500/20',
    C: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    D: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    E: 'bg-danger/10 text-danger border-danger/20',
    Excellent: 'bg-success/10 text-success border-success/20',
    Good: 'bg-green-500/10 text-green-500 border-green-500/20',
    Fair: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Poor: 'bg-danger/10 text-danger border-danger/20'
  };
  return colors[grade] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
}

/**
 * Get veg/non-veg indicator color
 * @param {String} vegStatus - 'veg', 'nonVeg', or 'unknown'
 * @returns {Object} Colors for dot and text
 */
export function getVegIndicator(vegStatus) {
  switch (vegStatus) {
    case 'veg':
      return { dot: 'bg-success', text: 'text-success', label: 'Veg' };
    case 'nonVeg':
      return { dot: 'bg-danger', text: 'text-danger', label: 'Non-Veg' };
    default:
      return { dot: 'bg-gray-400', text: 'text-gray-400', label: 'Unknown' };
  }
}