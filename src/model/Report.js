// models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, id: true, strict: false }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
