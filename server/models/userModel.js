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

    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },

    verified: { type: Boolean, default: false },

    // OTP schema
    otp: { type: String },
    otp_expiry_time: { type: Date },

    // Users friends
    friends: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

    // Current Online Status
    status: {
      type: String,
      enum: ["Online", "Offline"],
    },

    // socket io
    socket_id: { type: String },
  }
);

// hook for otp
userSchema.pre("save", async function (next) {
  if (!this.isModified("otp") || !this.otp) return next();

  // hasing otp
  this.otp = await bcrypt.hash(this.otp.toString(), 14);

  next();
});

// hook for password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  // hasing password
  this.password = await bcrypt.hash(this.password, 14);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew || !this.password)
    return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// method for password decrypt
userSchema.methods.correctPassword = async function (
  canditatePassword, // provided by user
  userPassword // from db
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

// method for otp decrypt
userSchema.methods.correctOTP = async function (
  canditateOTP, // provided by user
  userOTP // from db
) {
  return await bcrypt.compare(canditateOTP, userOTP);
};

// method for changed password
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

// method for reset password decrypt
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // hashing passwordResetToken
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// creating model for schema
const User = mongoose.model("User", userSchema);

export default User;
