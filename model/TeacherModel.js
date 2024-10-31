import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    teacherPositionsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacherpositions",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      unique: true,
      required: true,
      match: /^[0-9]{10}$/,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    degrees: [
      {
        type: {
          type: String,
          required: true,
        },
        school: {
          type: String,
          required: true,
        },
        major: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
        isGraduated: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const TeachChersModal = mongoose.model("teacher", teacherSchema);
export default TeachChersModal;
