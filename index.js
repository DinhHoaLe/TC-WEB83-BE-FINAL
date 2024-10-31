import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import connectDB from "./connect.js";
import cookieParser from "cookie-parser";
import {
  getTeachers,
  createTeacher,
  getTeacherPositions,
  createTeacherPosition,
  getTeachersPage,
} from "./controller/teacherController.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
connectDB();
// app.use(morgan("dev"));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/teachers", getTeachers);
app.get("/teachers-page ", getTeachersPage);
app.post("/teachers", createTeacher);
app.get("/teacher-positions", getTeacherPositions);
app.post("/teacher-positions", createTeacherPosition);
