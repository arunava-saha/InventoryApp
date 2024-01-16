const Profile = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(500).json({ Error: "Fill All Fields" });
    }
    const user = await Profile.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ Error: "User is already Registered with this Email" });
    }
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const profile = await Profile.create({
      ...req.body,
      hashedPassword,
    });
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "2hr" });
    return res.status(200).json({
      message: "User Registered Successfully",
      profile,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      Error: "Error in Registering the profile",
      error,
    });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(500).json({ Error: "Fill All Fields" });
    }
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ Error: "User is not Registered" });
    }
    const login = await bcrypt.compare(password, profile.hashedPassword);
    if (!login) {
      return res.status(500).json({ Error: "User is not Authenticate" });
    }
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "2hr" });
    return res.status(200).json({
      message: "User Login Successfully",
      profile,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      Error: "Error in Signing in the profile",
      error,
    });
  }
};

exports.currentCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    const profile = await Profile.findOne({ email });
    return res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      Error: "Error in Signing in the profile",
      error,
    });
  }
};
