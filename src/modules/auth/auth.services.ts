import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../user/user.model";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt";

import { JwtPayloadType } from "./auth.types";

export const registerService = async (body: any) => {
  const { name, email, password, role } = body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

export const loginService = async (body: any) => {
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid Credentials");
  }

  const payload: JwtPayloadType = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const refreshTokenService = async (
  refreshToken: string
) => {
  const user = await User.findOne({
    refreshToken,
  });

  if (!user) {
    throw new Error("Invalid Refresh Token");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  );

  const payload: JwtPayloadType = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(payload);

  return accessToken;
};