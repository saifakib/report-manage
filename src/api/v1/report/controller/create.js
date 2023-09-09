const reportService = require("../../../../lib/report");

const create = async (req, res, next) => {
    const { name, email, phone, address, profession, favoriteColors } = req.body;

    try {
        const report = await reportService.create({ name, email, phone, address, profession, favoriteColors });

        const response = {
            code: 201,
			message: 'Report create successful',
			data: {
				report: report,
			}
        };

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = create;