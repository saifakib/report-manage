const { Report } = require("../../model"); 
const { notFound } = require("../../utils/error");

// Function to find all reports in the database
const findAll = async () => {
  const reports = await Report.find();

  // Mapping the retrieved reports to a structured format with IDs
  return reports.map((report) => ({
    ...report._doc,
    id: report.id,
  }));
};

// Function to find one report in the database
const findOne = async (id) => {
  const report = await Report.findById(id);

  return report ? report : false;
};

// Function to create a new report in the database
const create = async ({ name, email, phone, address, profession, favoriteColors = [] }) => {
  const report = new Report({ name, email, phone, address, profession, favoriteColors });
  await report.save();

  return { ...report._doc, id: report.id };
}

// Function to update an existing report in the database
const update = async ({ id, name, email, phone, address, profession, favoriteColors }) => {
  const report = await Report.findById(id);

  // If the report doesn't exist, return a 'not found' error
  if (!report) {
    return notFound();
  }

  // Creating a payload with updated information
  const payload = {
    name, email, phone, address, profession, favoriteColors,
  };

  // Overwriting the report's data with the updated payload and saving it
  report.overwrite(payload);
  await report.save();

  return {
    report: { ...report._doc, id: report.id },
    code: 200,
  };
};

// Function to remove a report from the database by ID
const remove = async (id) => {
  const report = await Report.findById(id);

  // If the report doesn't exist, throw a 'not found' error
  if (!report) {
    throw notFound();
  }

  // Deleting the report from the database and returning the result
  return Report.findByIdAndDelete(id);
};

module.exports = { findAll, findOne, create, update, remove };
