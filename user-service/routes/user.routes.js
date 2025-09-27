import express from "express";
import { createUser, getAllUser, loginUser } from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", createUser);
userRouter.get("/", getAllUser);

export default userRouter;
