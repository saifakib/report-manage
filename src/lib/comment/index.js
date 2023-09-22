const { Comment } = require("../../model");
const { notFound } = require("../../utils/error");
const { findOne } = require("../report");

// Function to create comment in the database
const create = async ({ reportId, userId, comment }) => {
  const report = await findOne(reportId);
  if (!report) {
    throw notFound();
  }

  const createComment = new Comment({
    author: userId,
    report: reportId,
    comment: comment,
  });
  await createComment.save();

  return { ...createComment._doc, id: createComment.id };
};

const findComments = async (reportId) => {
  const comments = await Comment.find({ report: reportId })
    .populate("author", "name email")
    .exec();

  if (!comments) {
    throw notFound("No comments found for the report");
  }

  return comments;
};

module.exports = { create, findComments };
