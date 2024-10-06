import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    password: { type: String, require: true },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
      required: true,
    },
  },
  { timestamps: true }
);

// Tạo model từ schema
const UsersModel = mongoose.model("user", userSchema);

export default UsersModel;
