import express from "express";
import {
  signinUser,
  signupUser,
  updateUserProfile,
} from "../controller/user-controller.js";
import {
  signinValidation,
  signupValidation,
  updateValidation,
} from "../validation/validation.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
const userRouter = express.Router();
userRouter.post("/signup", signupValidation, signupUser);
userRouter.post("/signin", signinValidation, signinUser);
userRouter.put("/", authMiddleware, updateValidation, updateUserProfile);

export default userRouter;
