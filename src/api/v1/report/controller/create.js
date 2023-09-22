const reportService = require("../../../../lib/report");

// Handling the creation of a new report
const create = async (req, res, next) => {
    const { name, details } = req.body;

    try {
        // Attempting to create a new report with the provided information
        const report = await reportService.create({ name, details });

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
