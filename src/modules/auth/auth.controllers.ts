import { Request, Response } from "express";

import {
  loginService,
  refreshTokenService,
  registerService,
} from "./auth.services";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerService(
      req.body
    );

    res.status(201).json({
      success: true,
      user,
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
    const data = await loginService(req.body);

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
) => {
  try {
    const { refreshToken } = req.body;

    const accessToken =
      await refreshTokenService(
        refreshToken
      );

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};