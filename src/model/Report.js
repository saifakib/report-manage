// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  profession: String,
  favoriteColors: [String],
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
