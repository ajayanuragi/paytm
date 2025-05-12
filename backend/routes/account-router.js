import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { getBalance } from "../controller/account-controller.js";
const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, getBalance)

export default accountRouter;
