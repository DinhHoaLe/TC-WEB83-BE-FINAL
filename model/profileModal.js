import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  birthplace: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  educationalProcess: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const ProfileModal = mongoose.model("Profile", ProfileSchema);
export default ProfileModal;
