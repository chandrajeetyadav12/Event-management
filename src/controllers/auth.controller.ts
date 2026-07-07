import { Request, Response } from "express";

import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,

  
} from "../services/auth.service";
import User from "../models/User";
interface ResetPasswordParams {
  token: string;
}
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(
      req.user?.userId
    ).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const forgotPasswordController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await forgotPassword(
          req.body.email
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  export const resetPasswordController =
  async (
    req: Request<ResetPasswordParams>,
    res: Response
  ) => {
    try {
      const result =
        await resetPassword(
          req.params.token,
          req.body.password
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };