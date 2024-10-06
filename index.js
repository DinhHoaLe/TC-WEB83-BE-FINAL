import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import authRoute from "./routers/authRoute.js";
import userRoute from "./routers/userRoute.js";
import authMiddleware from "./authMiddleware.js";
import connectDB from "./connect.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());


connectDB();
// app.use(morgan("dev"));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", authMiddleware.authMiddleware, userRoute);
