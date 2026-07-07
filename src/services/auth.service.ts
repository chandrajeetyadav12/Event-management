import User from "../models/User";
import {
  comparePassword,
  hashPassword,
} from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

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



export const forgotPassword =
  async (email: string) => {
    const user =
      await User.findOne({ email });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const resetToken =
      crypto
        .randomBytes(32)
        .toString("hex");

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpire =
      new Date(
        Date.now() +
          15 * 60 * 1000
      );

    await user.save();

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const html = `
      <h2>Password Reset</h2>

      <p>You requested a password reset.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>
        This link expires in 15 minutes.
      </p>
    `;

    await sendEmail(
      user.email,
      "Reset Password",
      html
    );

    return {
      message:
        "Password reset email sent",
    };
  };

  export const resetPassword =
  async (
    token: string,
    password: string
  ) => {
    const user =
      await User.findOne({
        resetPasswordToken:
          token,
        resetPasswordExpire: {
          $gt: new Date(),
        },
      });

    if (!user) {
      throw new Error(
        "Invalid or expired token"
      );
    }

    const hashedPassword =
      await hashPassword(
        password
      );

    user.password =
      hashedPassword;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    return {
      message:
        "Password updated successfully",
    };
  };