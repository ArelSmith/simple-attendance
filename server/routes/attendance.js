import { Router } from "express";
import {
  createAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
} from "../controllers/attendanceController.js";

const router = Router();

router.get("/", getAllAttendance);
router.get("/:id", getAttendanceById);
router.post("/", createAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
