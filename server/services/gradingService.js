function calculateCustomScore(nutrition, healthMode = 'default') {
  let score = 10;
  const { sugar = 0, saturatedFat = 0, transFat = 0, calories = 0, fat = 0, protein = 0 } = nutrition;
  if (sugar > 15) score -= 3;
  if (saturatedFat > 5) score -= 2;
  if (transFat > 0) score -= 3;
  if (calories > 400) score -= 1;
  if (healthMode === 'diabetic' && sugar > 5) score -= 2;
  if (healthMode === 'weightLoss') {
    if (calories > 300) score -= 1;
    if (fat > 10) score -= 1;
  }
  if (healthMode === 'gym') {
    if (protein > 20) score += 1;
    if (sugar > 10) score -= 2;
  }
  return Math.max(0, Math.min(10, score));
}

function calculateNutriScore(negatives = {}, positives = {}) {
  // placeholders; implement per spec
  return 'C';
}

function calculateNutriGrade(nutrition = {}) {
  const { sugar = 0, saturatedFat = 0 } = nutrition;
  if (sugar < 1 && saturatedFat < 0.7) return 'A';
  if (sugar < 5 && saturatedFat < 1.2) return 'B';
  if (sugar < 10 && saturatedFat < 2.8) return 'C';
  return 'D';
}

function calculateJapaneseGrade(nutrition = {}) {
  return 'Good';
}

module.exports = {
  calculateCustomScore,
  calculateNutriScore,
  calculateNutriGrade,
  calculateJapaneseGrade
};