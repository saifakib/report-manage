const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
	{
		comment: String,
		author: {
			type: Schema.ObjectId,
			ref: 'User',
		},
		report: {
			type: Schema.ObjectId,
			ref: 'Report',
		},
	},
	{ timestamps: true, id: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;