import express from "express";
import {
  getBulkUsers,
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
userRouter.use(authMiddleware);
userRouter.put("/", updateValidation, updateUserProfile);
userRouter.get("/bulk", getBulkUsers);

export default userRouter;
