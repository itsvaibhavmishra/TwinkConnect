// User database from DB
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  // Accepts objest as parameter that defines the fields of users
  {
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
    avatar: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (email) {
          return String(email)
            .toLowerCase()
            .match(
              // regex for email validation
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        message: (props) => `Invalid Email: ${props.value}`,
      },
    },

    // Passwords schema
    password: { type: String, required: [true, "Password is required"] },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },

    createdAt: { type: Date },
    updatedAt: { type: Date },

    verified: { type: Boolean, default: false },
  }
);

userSchema.method.correctPassword = async function (
  canditatePassword, // provided by user
  userPassword // from db
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

// creating model for schema
const User = mongoose.model("User", userSchema);

export default User;
