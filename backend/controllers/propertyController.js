
const Property = require('../models/Property');
const mailService = require("../services/mailService")

exports.createProperty = async (req, res) => {
  console.log(req.user);
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges, imageUrl } = req.body;
  try {
    const newProperty = new Property({
      user: req.user._id,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      imageUrl,
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMyProperty = async (req,res)=>{
  try {
    // Retrieve user ID from authenticated user token
    const userId = req.user.id;

    // Fetch properties based on user ID
    const properties = await Property.find({ user: userId });

    // Return properties as response
    res.json(properties);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('user');
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



exports.updateProperty = async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges, imageUrl } = req.body;
  console.log(req.body);
  const updatedProperty = {
    place,
    area,
    bedrooms,
    bathrooms,
    nearbyHospitals,
    nearbyColleges,
    imageUrl,
  };

  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, { $set: updatedProperty }, { new: true });

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await property.remove();

    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.sendInfoToSeller = async (req, res) => {
  // Extract necessary information from the request
  const { email } = req.user; // Assuming user details are available in req.user
  const propertyId = req.params.propertyId;

  try {
    // Fetch property details using propertyId
    const property = await Property.findById(propertyId);
    console.log(property);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Construct email content
    const emailContent = `
      <h2>Interested Buyer</h2>
      <p>The user with email ${email} is interested in buying the property:</p>
      <p><strong>Property ID:</strong> ${property._id}</p>
      <p><strong>Property Name:</strong> ${property.place}</p>
      <p><strong>Area:</strong> ${property.area}</p>
      <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
      <p><strong>Nearby Hospitals:</strong> ${property.nearbyHospitals}</p>
      <p><strong>Nearby Colleges:</strong> ${property.nearbyColleges}</p>
    `;

    // Send email using mailService
    await mailService.sendEmail(
      email,
      "Interest in Property",
      "Interest in Property",
      emailContent
    );

    console.log(`Email sent successfully to: ${email}`);
    console.log("Mail sent");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

  