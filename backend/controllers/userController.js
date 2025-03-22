const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const createToken = require("../utils/createToken");
const cloudinary = require("../utils/cloudinary");
const validator = require("validator");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, password, avatar } = req.body;

  // Validate input data
  if (!name || !email || !password || !avatar || !validator.isEmail(email)) {
    res.status(400).json({ error: "Invalid input data" });
    return;
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Upload avatar to Cloudinary
    const myCloud = await cloudinary.uploader.upload(avatar, { folder: "avatars" });

    // Create new user object
    const newUser = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    // Create user in database
    const user = await User.create(newUser);

    // Generate JWT token
    const token = createToken(res, user._id);

    // Respond with success message and user data
    res.status(201).json({
      success: true,
      user,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Log in user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields must be filled" });
    return;
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    createToken(res, user._id);
    res.status(200).json({
      success: true,
      user,
      message: "User logged in successfully!",
    });
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

// Log out user
const logoutUser = (req, res) => {
  res.cookie("user_token", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ user: {}, message: "Logged out successfully" });
};

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("PHONE", req.body.phoneNumber)
  try {
    const user = await User.findById(req.body.id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password; 
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "User profile updated successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get user by user-id
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ message: "User doesn't exist" });
    }
    res.status(200).json({
      success: true,
      user,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
});

// Update user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      // Delete existing avatar from Cloudinary
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload new avatar to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        width: 150,
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "Avatar updated successfully",
    });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({ error: error.message });
  }
});

// Add user address
const addUserAddress = asyncHandler(async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      res.status(400).json({ error: "Address already exists" });
      return;
    }

    user.addresses.push(req.body);

    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "Address added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user address
const deleteUserAddress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user password
const updateUserPassword = asyncHandler(async (req, res) => {
  console.log("REQ.BODY", req.body)
  try {
    const user = await User.findById(req.user.id).select("+password");

    const passwordMatch = await user.matchPassword(req.body.oldPassword);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect!" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add payment method
const addPaymentMethod = asyncHandler(async (req, res) => {
  const { cardHolderName, cardNumber, expiryDate, cvv } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.paymentMethod = { cardHolderName, cardNumber, expiryDate, cvv };
    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "Payment method added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete payment method
const deletePaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.user; 

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.paymentMethod = null; // Clear the payment method
    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  updateUserAvatar,
  addUserAddress,
  deleteUserAddress,
  getUser,
  updateUserPassword,
  addPaymentMethod,
  deletePaymentMethod
};
