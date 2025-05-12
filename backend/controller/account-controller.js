import mongoose from "mongoose";
import { findBalance, transferAmount } from "../service/account-service.js";

export const getBalance = async (req, res) => {
  try {
    const balance = await findBalance(req.user.id);
    res.status(200).json({
      success: true,
      message: "Balance fetched successfully",
      balance: balance,
    });
  } catch (error) {
    if (error.message === "Account not found") {
      res.status(400).json({
        success: false,
        message: "Account not found",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const transferMoney = async (req, res) => {
  try {
    const { to, amount } = req.body;
    const senderId = req.user.id;
    if (!to || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid Input: "to" and "amount" are required, and "amount" must be greater tha zero',
      });
    }
    if (!mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account ID provided.",
      });
    }

    const result = await transferAmount(senderId, to, amount);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    let errorMessage = "Something went wrong";
    let statusCode = 500;
    if (error.message === "Insufficient balance") {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.message === "Account not found") {
      errorMessage = "Invalid Account";
      statusCode = 400;
    }
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: error.message,
    });
  }
};
