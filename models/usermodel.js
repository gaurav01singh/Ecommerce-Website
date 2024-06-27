import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      retuired: true,
      trime: true,
    },
    email: {
      type: String,
      retuired: true,
      unique: true,
    },
    password: {
      type: String,
      retuired: true,
    },
    phone: {
      type: String,
      retuired: true,
    },
    address: {
      type: {},
      retuired: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userschema);
