const commentService = require("../../../../lib/comment");

// Put a comment of a report
const create = async (req, res, next) => {
    const { id } = req.params;
    const { comment } = req.body;
    
    try {
        const report = await commentService.create({ reportId: id, userId: req.user.id, comment });

        const response = {
            code: 201,
            message: 'Comment created successfully',
            data: report,
        }

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = create;
