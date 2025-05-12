import {
  authenticateUser,
  createUser,
  getAllUser,
  getUsersByFilter,
  updateUser,
} from "../service/user-service.js";

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

export const updateUserProfile = async (req, res) => {
  try {
    await updateUser(req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    if (error.message === "WEAK_PASSWORD") {
      return res.status(411).json({
        success: false,
        message: "Password is too weak",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBulkUsers = async (req, res) => {
  const { filter } = req.query;
  try {
    let users;
    if (filter) {
      users = await getUsersByFilter(filter);
    } else {
      users = await getAllUser();
    }

    res.status(200).json({
      success: true,
      users: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};
