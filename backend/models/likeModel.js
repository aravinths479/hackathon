// models/Like.js
const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
});

module.exports = mongoose.model("Like", likeSchema);
