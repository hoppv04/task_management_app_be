import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { userAuthVerification } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/auth", userAuthVerification);

export default userRouter;
