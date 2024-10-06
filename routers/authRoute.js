import express from "express";
import {
  create,
  login,
  forgotPassword,
  resetPassword,
  logout
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", create);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
