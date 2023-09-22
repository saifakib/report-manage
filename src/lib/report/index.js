const { Report } = require("../../model");
const defaults = require("../../config/default");
const { notFound } = require("../../utils/error");

/**
 * Find all reports
 * Pagination
 * Searching
 * Sorting
 * @param {*} param0
 * @returns
 */
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  const reports = await Report.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return reports.map((report) => ({
    ...report._doc,
    id: report.id,
  }));
};

/**
 * Find a single report
 * @param {*} param0
 * @returns
 */
const findSingle = async ({ id }) => {
  if (!id) throw new Error("ID id required");

  const report = await Report.findById(id);

  if (!report) {
    throw notFound();
  }

  return {
    ...report._doc,
    id: report.id,
  };
};

// Function to find one report in the database
const findOne = async (id) => {
  const report = await Report.findById(id);

  return report ? report : false;
};

/**
 * Count all report
 * @param {*} param0
 * @returns
 */
const count = ({ search = "" }) => {
  const filter = {
    name: { $regex: search, $options: "i" },
  };
  return Report.count(filter);
};

/**
 * Create a report
 * @returns 
 */
const create = async ({ name, details = "" }) => {
  if (!name) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }
  const report = new Report({
    name,
    details,
  });
  await report.save();

  return { ...report._doc, id: report.id };
};

// Function to update an existing report in the database
const update = async ({ id, name, details }) => {
  const report = await Report.findById(id);

  if (!report) {
    return notFound();
  }

  const payload = {
    name,
    details,
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

  if (!report) {
    throw notFound();
  }

  return Report.findByIdAndDelete(id);
};

module.exports = { findAll, findSingle, findOne, create, update, remove, count };
