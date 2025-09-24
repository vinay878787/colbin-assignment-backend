
import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import { IUser as IUserBase } from "../interfaces/user.interface";

export interface IUser extends IUserBase, Document {}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must not exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      message:
        "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.",
    },
  },
  phone: {
    type: String,
    validate: {
      validator: (value: string) => {
        if (typeof value !== "string") return false;
        if (value.trim() === "") return true; // allow empty string
        return validator.isMobilePhone(value, undefined, { strictMode: true });
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  website: {
    type: String,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
