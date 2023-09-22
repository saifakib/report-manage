const reportService = require("../../../../lib/report");

const findSingle = async (req, res, next) => {
    const id = req.params.id;

    try {
        const report = await reportService.findSingle({ id });
        const response = {
            data: report,
            links: {
                self: `reports/${report.id}`,
				comments: `/reports/${report.id}/comments`,
            }
        }

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

module.exports = findSingle;