import { Router } from "express";
import { getAllAttendance } from "../controllers/attendanceController.js";

const router = Router();

router.get("/", getAllAttendance);

export default router;
