import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import attendanceRoutes from "./routes/attendance.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready 1234");
});

// routes
app.use("/attendance", attendanceRoutes);

app.listen(5000, () => {
  ConnectDB();
  console.log("Server started at http://localhost:5000");
});
