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
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id, res);

    return res
      .status(200)
      .json({ message: "User logged in successfully", user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};
export const logOutUser = async (req, res) => {
  try {
    res.clearCookie("jwt-token", { httpOnly: true, secure: true, sameSite: "none" });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging the user" });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting the user" });
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
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {}
};
