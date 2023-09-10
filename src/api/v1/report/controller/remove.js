const reportService = require("../../../../lib/report");

const remove = async (req, res, next) => {
    const { id } = req.params;

    try {
        await reportService.remove(id);
        res.status(204).end();
    } catch (err) {
        next(err)
    }
}

module.exports = remove;