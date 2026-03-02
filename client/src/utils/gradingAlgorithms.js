// placeholder for grading algorithms to be shared between frontend (if needed) and backend

export function calculateCustomScore(nutrition, healthMode = 'default') {
  let score = 10;
  const { sugar, saturatedFat, transFat, calories, fat, protein } = nutrition;
  if (sugar > 15) score -= 3;
  if (saturatedFat > 5) score -= 2;
  if (transFat > 0) score -= 3;
  if (calories > 400) score -= 1;
  // health mode modifiers
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
