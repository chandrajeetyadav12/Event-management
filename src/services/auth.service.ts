import User from "../models/User";
import {
  comparePassword,
  hashPassword,
} from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async (
  data: RegisterInput
) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(
    data.password
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString(),user.role);

  return {
    user,
    token,
  };
};

export const loginUser = async (
  data: LoginInput
) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id.toString(),user.role);

  return {
    user,
    token,
  };
};