const { Report } = require("../../model")

const create  = async ({ name, email, phone, address, profession, favoriteColors=[] }) => {

    const report = new Report({ name, email, phone, address, profession, favoriteColors });
    await report.save();
    return { ...report._doc, id: report.id };

}

module.exports = { create }