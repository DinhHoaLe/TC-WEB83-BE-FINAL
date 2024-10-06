import express from "express";
import { Router } from "express";
import { logout } from "../controller/authController.js";
import {
    createInfor,
    viewProfile,
    updateProfile,
  } from "../controller/userController.js";
  
const router = express.Router();

router.post("/profile/create-infor", createInfor);

router.post("/profile/:profileId", viewProfile);

router.put("/profile/:profileId", updateProfile);

router.post("/logout", logout);

export default router;
