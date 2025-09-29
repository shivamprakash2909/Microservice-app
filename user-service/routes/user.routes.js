import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  loginUser,
  logOutUser,
} from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/logout", logOutUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
