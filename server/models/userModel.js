// User database from DB
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

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

    // OTP schema
    otp: { type: String },
    otp_expiry_time: { type: Date },
  }
);

// hook for otp
userSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();

  // hasing otp
  this.otp = bcrypt.hash(this.otp, 14);
});

// method for otp decrypt
userSchema.methods.correctOTP = async function (
  canditateOTP, // provided by user
  userOTP // from db
) {
  return await bcrypt.compare(canditateOTP, userOTP);
};

// method for password decrypt
userSchema.methods.correctPassword = async function (
  canditatePassword, // provided by user
  userPassword // from db
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

// method for reset password decrypt
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // hashing passwordResetToken
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.passwordResetExpires = Date.now() = 10*60*1000;

  return resetToken;
};

// creating model for schema
const User = mongoose.model("User", userSchema);

export default User;
