const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productName: String,
  imageUrl: String,
  barcodeNumber: String,
  fssaiNumber: String,
  fssaiStatus: { type: String, enum: ['valid', 'invalid', 'unverified'] },
  vegStatus: { type: String, enum: ['veg', 'nonVeg', 'unknown'], default: 'unknown' },
  nutritionData: {
    calories: Number,
    sugar: Number,
    fat: Number,
    saturatedFat: Number,
    transFat: Number,
    protein: Number,
    fiber: Number
  },
  scores: {
    customScore: Number,
    nutriScore: String,
    nutriGrade: String,
    japaneseGrade: String
  },
  healthMode: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);
