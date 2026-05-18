import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import jwt from "jsonwebtoken";

import { JwtPayloadType } from "../modules/auth/auth.types";

export interface AuthRequest extends Request {
  user?: JwtPayloadType;
}

export const protect: RequestHandler = (
  req,
  res,
  next
): void => {
  try {
    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayloadType;

    (req as AuthRequest).user =
      decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

    return;
  }
};