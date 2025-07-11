import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/db.js";

import attendanceRoutes from "./routes/attendance.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("You are connected to the server");
});

// routes
app.use("/attendance", attendanceRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  ConnectDB();
  console.log("Server started at http://localhost:5000");
});
