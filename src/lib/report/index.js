const { Report } = require("../../model");
const { notFound } = require("../../utils/error")



const findAll = async () => {
  const reports = await Report.find();

  return reports.map((report) => ({
    ...report._doc,
    id: report.id,
  }));
};


const create = async ({ name, email, phone, address, profession, favoriteColors=[] }) => {

    const report = new Report({ name, email, phone, address, profession, favoriteColors });
    await report.save();
    return { ...report._doc, id: report.id };

}

const update = async({ id, name, email, phone, address, profession, favoriteColors }) => {
    const report = await Report.findById(id);

    if (!report) {
      return notFound();
    }
  
    const payload = {
        name, email, phone, address, profession, favoriteColors,
    };
  
    report.overwrite(payload);
    await report.save();
  
    return {
      report: { ...report._doc, id: report.id },
      code: 200,
    };
};

const remove = async (id) => {
  const report = await Report.findById(id);

  if (!report) {
    throw notFound();
  }

  return Report.findByIdAndDelete(id);
};


module.exports = { findAll, create, update, remove }