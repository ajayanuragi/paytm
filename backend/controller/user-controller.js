import { authenticateUser, createUser } from "../service/user-service.js";

export const signupUser = async (req, res) => {
  try {
    const token = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    if (error.message === "USERNAME_TAKEN") {
      return res.status(411).json({
        success: false,
        message: "Username already taken",
      });
    }
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

export const signinUser = async (req, res) => {
  try {
    const token = await authenticateUser(req.body);
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(411).json({
        success: false,
        message: "Wrong username or password",
      });
    }
    res.status(500).json({
      success: false,
      message: "Signin failed",
      error: error.message,
    });
  }
};
