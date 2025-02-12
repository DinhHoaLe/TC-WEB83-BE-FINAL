import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true, 
  },
  des: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
  isDeleted: {
    type: Boolean,
    default: false, 
  },
}, { timestamps: true });

const TeacherPositionModel = mongoose.model("teacherpositions", teacherPositionSchema);

export default TeacherPositionModel;