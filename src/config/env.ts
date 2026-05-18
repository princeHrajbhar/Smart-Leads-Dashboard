export const env = {
  PORT: process.env.PORT || 5000,

  MONGO_URI: process.env.MONGO_URI || "",

  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET || "",

  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "",

  ACCESS_TOKEN_EXPIRES:
    process.env.ACCESS_TOKEN_EXPIRES || "15m",

  REFRESH_TOKEN_EXPIRES:
    process.env.REFRESH_TOKEN_EXPIRES || "7d",
};