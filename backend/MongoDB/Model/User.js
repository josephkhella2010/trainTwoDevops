import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    items: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false, // removes __v
    timestamps: true, // adds createdAt and updatedAt
  },
);

export default mongoose.model("User", userSchema, "users");
