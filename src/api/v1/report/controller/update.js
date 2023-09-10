const reportService = require("../../../../lib/report");

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address, profession, favoriteColors } = req.body;

    try {
        const report = await reportService.update({
            id, name, email, phone, address, profession, favoriteColors
        });

        const response = {
            code: 201,
            message: 'Report updated successfully' ,
            data: report,
        }

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = update;