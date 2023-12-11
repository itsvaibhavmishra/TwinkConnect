import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
    avatar: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    status: { type: String, default: "Hey There! I ❤️ Using TwinkChat 😸" },

    // Passwords schema
    password: { type: String, required: [true, "Password is required"] },
    passwordChangedAt: { type: Date },
  },
  {
    // adds created at and updated at
    timestamps: "true",
  }
);

// creating model for schema
const User = mongoose.model("User", userSchema);

export default User;
