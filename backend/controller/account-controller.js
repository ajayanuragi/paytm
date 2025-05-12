import { findBalance } from "../service/account-service.js";

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
