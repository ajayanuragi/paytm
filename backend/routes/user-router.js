import express from "express";
import { signinUser, signupUser } from "../controller/user-controller.js";
import {
  signinValidation,
  signupValidation,
} from "../validation/validation.js";
const userRouter = express.Router();
userRouter.post("/signup", signupValidation, signupUser);
userRouter.post("/signin", signinValidation, signinUser);

export default userRouter;