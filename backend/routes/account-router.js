import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { getBalance, transferMoney } from "../controller/account-controller.js";
const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, getBalance)
accountRouter.post('/transfer',authMiddleware, transferMoney)

export default accountRouter;
