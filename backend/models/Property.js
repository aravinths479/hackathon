// models/Property.js
const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  place: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  nearbyHospitals: { type: String },
  nearbyColleges: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }, // Add this line
});

module.exports = mongoose.model("Property", PropertySchema);
