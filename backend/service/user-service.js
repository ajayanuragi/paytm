import { User } from "../model/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { Account } from "../model/account-model.js";
import { findBalance } from "./account-service.js";

export const createUser = async ({
  username,
  password,
  firstName,
  lastName,
}) => {
  const existingUser = await findUser(username);
  if (existingUser) throw new Error("USERNAME_TAKEN");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    firstName,
    lastName,
    password: hashedPassword,
  });

  const initialBalance = Math.floor(Math.random() * 10000 * 100) + 100;
  await Account.create({
    userId: user._id,
    balance: initialBalance,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

export const authenticateUser = async ({ username, password }) => {
  const user = await findUser(username);
  if (!user) throw new Error("INVALID_CREDENTIALS");
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("INVALID_CREDENTIALS");
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const updateUser = async (userId, updates) => {
  const updateData = {};
  if (updates.firstName) {
    updateData.firstName = updates.firstName;
  }
  if (updates.lastName) {
    updateData.lastName = updates.lastName;
  }
  if (updates.password) {
    if (updates.password.length < 6) {
      throw new Error("WEAK_PASSWORD");
    }
    updateData.password = await bcrypt.hash(updates.password, 10);
  }
  await User.updateOne({ _id: userId }, updateData);
};

export const getUsersByFilter = async (filter) => {
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  }).select("-password");
  return users;
};
export const getAllUser = async () => {
  const users = await User.find();
  return users;
};

export const getUserProfile = async (userId) => {
  if (!userId) throw new Error("USER_ID_REQUIRED");
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("USER_NOT_FOUND");
  const balance = await findBalance(userId)
  user.balance = balance
  return user;
};

const findUser = async (username) => {
  return await User.findOne({ username });
};
