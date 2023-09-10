const reportService = require("../../../../lib/report");

// Handling the update of a report
const update = async (req, res, next) => {
    const { id } = req.params;
    
    const { name, email, phone, address, profession, favoriteColors } = req.body;

    try {
        // Attempting to update the report with the provided information
        const report = await reportService.update({
            id, name, email, phone, address, profession, favoriteColors
        });

        const response = {
            code: 201,
            message: 'Report updated successfully',
            data: report,
        }

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = update;
