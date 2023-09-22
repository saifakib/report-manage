const { Comment, User } = require("../../model");
const { notFound, badRequest } = require("../../utils/error");
const { findOne } = require("../report");

// Function to create comment in the database
const create = async ({ reportId, userId }) => {
  const report = await findOne(reportId);
  if (!report) {
    throw notFound("Report not found");
  }

  const user = await User.findById(userId);

  if (user.bookmarks.includes(reportId)) {
    throw badRequest("Report already in bookmarks");
  }

  // Add the reportId to the user's bookmarks
  user.bookmarks.push(reportId);
  await user.save();

  return true;
};

const userBookmarkService = async (userId) => {
  const userBookmarks = await User.findById(userId)
    .populate("bookmarks", "name details")
    .exec();

  const sanitizedUser = { ...userBookmarks._doc };
  delete sanitizedUser.password;

  return sanitizedUser;
};

module.exports = { create, userBookmarkService };
