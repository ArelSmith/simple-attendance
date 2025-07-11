import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["WIP", "Pending", "Done"],
    required: true,
  },
});
export default mongoose.model("Attendance", AttendanceSchema);
