import {
  RequestHandler,
} from "express";

import { AuthRequest } from "./auth.middleware";

export const authorize = (
  ...roles: string[]
): RequestHandler => {
  return (
    req,
    res,
    next
  ): void => {
    const authReq =
      req as AuthRequest;

    if (
      !authReq.user
    ) {
      res.status(401).json({
        success: false,
        message:
          "Unauthorized",
      });

      return;
    }

    if (
      !roles.includes(
        authReq.user.role
      )
    ) {
      res.status(403).json({
        success: false,
        message:
          "Forbidden",
      });

      return;
    }

    next();
  };
};