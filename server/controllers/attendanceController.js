import Attendance from "../models/Attendance.js";

// READ
export const getAllAttendance = async (_req, res) => {
  try {
    const list = await Attendance.find().populate("user", "name email");
    return res.json(list);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching attendance", error: err.message });
  }
};

// READ by ID
export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json(attendance);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching attendance", error: err.message });
  }
};

// CREATE, UPDATE, DELETE
export const createAttendance = async (req, res) => {
  try {
    const { user, name, date, task, status } = req.body;
    const userId = req.user?.id || req.body.user;

    const data = new Attendance({
      user: userId,
      name,
      date,
      task,
      status,
    });
    const savedData = await data.save();
    return res.status(201).json(savedData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating attendance", error: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating attendance", error: err.message });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Attendance.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting attendance", error: err.message });
  }
};
