import mongoose, { Document, Schema } from "mongoose";
import { Role } from "./role.enum";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.SALES
    },

    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;