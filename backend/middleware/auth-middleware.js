import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
export const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
