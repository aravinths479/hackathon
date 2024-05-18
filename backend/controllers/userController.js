const User = require("../models/userModel");
const Property  = require("../models/Property")
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, firstName, lastName, phone, role, password } = req.body;

  try {
    const user = await User.signup(
      email,
      firstName,
      lastName,
      phone,
      role,
      password
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, firstName, lastName, phone, role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, phone, role } = req.body;

  // Validate the input
  if ( !firstName || !lastName || !phone || !role) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.role = role;

    // Save the updated user
    console.log(user);
    const updatedUser = await user.save();

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};


module.exports = { signupUser, loginUser, updateUserProfile };
