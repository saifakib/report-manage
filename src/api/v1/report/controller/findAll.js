const reportService = require("../../../../lib/report");

const findAll = async (_, res, next) => {

    try {

        const reports = await reportService.findAll()

        res.status(200).json({
            data: reports
        })

    } catch (err) {
        next(err)
    }
}

module.exports = findAll;