import jwt, {
  Secret,
  SignOptions,
} from "jsonwebtoken";

import { env } from "../config/env";

export const generateAccessToken = (
  payload: object
) => {
  return jwt.sign(
    payload,
    env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn:
        env.ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"],
    }
  );
};

export const generateRefreshToken = (
  payload: object
) => {
  return jwt.sign(
    payload,
    env.REFRESH_TOKEN_SECRET as Secret,
    {
      expiresIn:
        env.REFRESH_TOKEN_EXPIRES as SignOptions["expiresIn"],
    }
  );
};