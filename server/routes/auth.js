import express from "express";
import {
  registerUser,
  loginUser,
  checkUserEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-email", checkUserEmail);
export default router;
