import { generateToken } from "../lib/jwt.js";
import { User } from "../models/user.models.js";
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    generateToken(user._id, res);
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      message: "User created Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "All users:", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
