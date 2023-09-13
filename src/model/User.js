// models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: [
    {
      type: Schema.ObjectId,
      ref: "Report",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
