import { User } from "../model/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

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

const findUser = async (username) => {
  return await User.findOne({ username });
};
