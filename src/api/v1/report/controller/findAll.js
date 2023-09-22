const reportService = require("../../../../lib/report");
const defaults = require('../../../../config/default');
const  query = require('../../../../utils/query');

// Get all reports
const findAll = async (req, res, next) => {

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;
	const search = req.query.search || defaults.search;

    try {
        const reports = await reportService.findAll({ page, limit, sortType, sortBy, search });

        const data = query.getTransformedItems({ 
            items: reports, 
            selection: ['id', 'name', 'details', 'updatedAt', 'createdAt'],
            path: '/reports' 
        });

         // pagination
         const totalItems = await reportService.count({ search });
         const pagination = query.getPagination({ totalItems, page, limit });


        // HATEOAS Links
        const links = query.getHATEOASForALLItems({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page
        });

        res.status(200).json({
            data,
            pagination,
            links
        })
    } catch (err) {
        next(err)
    }
}

module.exports = findAll;