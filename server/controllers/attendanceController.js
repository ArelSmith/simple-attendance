import Attendance from "../models/Attendance.js";

export const getAllAttendance = async (_req, res) => {
  const list = await Attendance.find();
  return res.json("Berhasil terkoneksi!");
};
