const bookmarkService = require("../../../../lib/bookmark");

// Get all reports
const userBookmarkReports = async (req, res, next) => {
  try {
    const bookmarkReports = await bookmarkService.userBookmarkService(req.user.id);
    
    res.status(200).json({
        data: bookmarkReports
    })
  } catch (err) {
    next(err);
  }
};

module.exports = userBookmarkReports;
