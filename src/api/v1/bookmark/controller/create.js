const bookmarkService = require("../../../../lib/bookmark");

// Put a comment of a report
const bookmark = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        await bookmarkService.create({ reportId: id, userId: req.user.id });

        const response = {
            code: 201,
            message: 'Report added in user bookmarks',
        }

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

module.exports = bookmark;
