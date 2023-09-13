const commentService = require("../../../../lib/comment");

// Get all reports
const findReportComments = async (_, res, next) => {
    const { id } = req.params;
  try {
    const comments = await commentService.findComments(id);

    res.status(200).json({
        data: comments
    })
  } catch (err) {
    next(err);
  }
};

module.exports = findReportComments;
