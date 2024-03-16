import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    confirmPassword: String,
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "artisan"],
      default: "user",
    },
    verifiedByAdmin: Boolean,
    secretKey: String
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
