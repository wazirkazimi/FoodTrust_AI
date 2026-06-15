// Grading algorithms for FoodTrust AI

/**
 * Calculate Custom Health Score (0-10)
 * @param {Object} nutrition - Nutrition data per 100g
 * @param {String} healthMode - User's health mode
 * @returns {Number} Score from 0-10
 */
function calculateCustomScore(nutrition, healthMode = 'default') {
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
 * Calculate Nutri-Score (A-E)
 * Based on European Nutri-Score system
 * @param {Object} nutrition - Nutrition data per 100g
 * @returns {String} Grade A-E
 */
function calculateNutriScore(nutrition) {
  const { calories, sugar, fat, saturatedFat, fiber, protein } = nutrition;

  // Negative points (0-10 each, max 40 total)
  let negativePoints = 0;

  // Energy points
  if (calories <= 335) negativePoints += 0;
  else if (calories <= 670) negativePoints += 1;
  else if (calories <= 1005) negativePoints += 2;
  else if (calories <= 1340) negativePoints += 3;
  else if (calories <= 1675) negativePoints += 4;
  else if (calories <= 2010) negativePoints += 5;
  else if (calories <= 2345) negativePoints += 6;
  else if (calories <= 2680) negativePoints += 7;
  else if (calories <= 3015) negativePoints += 8;
  else if (calories <= 3350) negativePoints += 9;
  else negativePoints += 10;

  // Sugar points
  if (sugar <= 4.5) negativePoints += 0;
  else if (sugar <= 9) negativePoints += 1;
  else if (sugar <= 13.5) negativePoints += 2;
  else if (sugar <= 18) negativePoints += 3;
  else if (sugar <= 22.5) negativePoints += 4;
  else if (sugar <= 27) negativePoints += 5;
  else if (sugar <= 31) negativePoints += 6;
  else if (sugar <= 36) negativePoints += 7;
  else if (sugar <= 40) negativePoints += 8;
  else if (sugar <= 45) negativePoints += 9;
  else negativePoints += 10;

  // Saturated fat points
  if (saturatedFat <= 1) negativePoints += 0;
  else if (saturatedFat <= 2) negativePoints += 1;
  else if (saturatedFat <= 3) negativePoints += 2;
  else if (saturatedFat <= 4) negativePoints += 3;
  else if (saturatedFat <= 5) negativePoints += 4;
  else if (saturatedFat <= 6) negativePoints += 5;
  else if (saturatedFat <= 7) negativePoints += 6;
  else if (saturatedFat <= 8) negativePoints += 7;
  else if (saturatedFat <= 9) negativePoints += 8;
  else if (saturatedFat <= 10) negativePoints += 9;
  else negativePoints += 10;

  // Sodium points (assuming 0 for now as we don't have sodium data)
  negativePoints += 0;

  // Positive points (0-5 each, max 15 total)
  let positivePoints = 0;

  // Fiber points
  if (fiber <= 0.9) positivePoints += 0;
  else if (fiber <= 1.9) positivePoints += 1;
  else if (fiber <= 2.8) positivePoints += 2;
  else if (fiber <= 3.7) positivePoints += 3;
  else if (fiber <= 4.7) positivePoints += 4;
  else positivePoints += 5;

  // Protein points
  if (protein <= 1.6) positivePoints += 0;
  else if (protein <= 3.2) positivePoints += 1;
  else if (protein <= 4.8) positivePoints += 2;
  else if (protein <= 6.4) positivePoints += 3;
  else if (protein <= 8.0) positivePoints += 4;
  else positivePoints += 5;

  // Calculate final score
  const finalScore = negativePoints - positivePoints;

  // Return grade
  if (finalScore <= -1) return 'A';
  else if (finalScore <= 2) return 'B';
  else if (finalScore <= 10) return 'C';
  else if (finalScore <= 18) return 'D';
  else return 'E';
}

/**
 * Calculate Nutri-Grade (A-D) - Singapore system
 * @param {Object} nutrition - Nutrition data per 100g
 * @returns {String} Grade A-D
 */
function calculateNutriGrade(nutrition) {
  const { sugar, saturatedFat } = nutrition;

  if (sugar < 1 && saturatedFat < 0.7) return 'A';
  else if (sugar < 5 && saturatedFat < 1.2) return 'B';
  else if (sugar < 10 && saturatedFat < 2.8) return 'C';
  else return 'D';
}

/**
 * Calculate Japanese Nutritional Grade
 * Based on balance and micronutrient presence
 * @param {Object} nutrition - Nutrition data per 100g
 * @returns {String} Grade Excellent/Good/Fair/Poor
 */
function calculateJapaneseGrade(nutrition) {
  const { calories, sugar, fat, protein, fiber } = nutrition;

  // Calculate balance score based on macronutrient ratios
  const carbRatio = (calories * 0.5) / 4; // Estimated carbs
  const fatRatio = fat / 9;
  const proteinRatio = protein / 4;

  const total = carbRatio + fatRatio + proteinRatio;
  const carbPercent = carbRatio / total;
  const fatPercent = fatRatio / total;
  const proteinPercent = proteinRatio / total;

  // Ideal ratios: Carbs 45-65%, Protein 10-35%, Fat 20-35%
  let balanceScore = 0;

  if (carbPercent >= 0.45 && carbPercent <= 0.65) balanceScore += 1;
  if (proteinPercent >= 0.10 && proteinPercent <= 0.35) balanceScore += 1;
  if (fatPercent >= 0.20 && fatPercent <= 0.35) balanceScore += 1;

  // Micronutrient presence
  if (fiber > 3) balanceScore += 1;

  // Negative factors
  if (sugar > 10) balanceScore -= 1;
  if (fat > 20) balanceScore -= 1;

  if (balanceScore >= 4) return 'Excellent';
  else if (balanceScore >= 2) return 'Good';
  else if (balanceScore >= 0) return 'Fair';
  else return 'Poor';
}

/**
 * Calculate all grades for a product
 * @param {Object} nutrition - Nutrition data per 100g
 * @param {String} healthMode - User's health mode
 * @returns {Object} All calculated scores
 */
function calculateAllGrades(nutrition, healthMode = 'default') {
  return {
    customScore: calculateCustomScore(nutrition, healthMode),
    nutriScore: calculateNutriScore(nutrition),
    nutriGrade: calculateNutriGrade(nutrition),
    japaneseGrade: calculateJapaneseGrade(nutrition)
  };
}

module.exports = {
  calculateCustomScore,
  calculateNutriScore,
  calculateNutriGrade,
  calculateJapaneseGrade,
  calculateAllGrades
};