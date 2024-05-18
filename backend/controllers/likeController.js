// controllers/likeController.js
const Like = require("../models/likeModel");
const Property = require("../models/Property")

exports.likeProperty = async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.user._id; // Assuming the authenticated user's id is available in req.user
    
  try {
    // Check if the user has already liked the property
    const existingLike = await Like.findOne({ user: userId, property: propertyId });
    if (existingLike) {
      return res.status(400).json({ error: "You have already liked this property" });
    }
    await Property.updateOne({ _id: propertyId }, { $inc: { likes: 1 } });
    // Create a new like
    const newLike = new Like({ user: userId, property: propertyId });

    await newLike.save();
    console.log(newLike);
    res.status(200).json({ message: "Property liked successfully" });
  } catch (error) {
    console.error("Error liking property:", error);
    res.status(500).json({ error: "Failed to like property" });
  }
};
