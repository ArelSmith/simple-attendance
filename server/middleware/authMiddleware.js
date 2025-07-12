import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token required" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // bisa digunakan di controller
    next();
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
