import { RequestHandler } from "express";
import { AttendanceRecord } from "@shared/api";

// In-memory storage for demo (replace with database in production)
const ATTENDANCE_DB: AttendanceRecord[] = [];

// Middleware to verify student token
export const verifyStudentToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token || !token.startsWith("c3R1ZGVudDo=")) {
    // Check if token starts with base64 for "student:"
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};

// GET /api/admin/attendance - Get all attendance records
export const handleGetAttendance: RequestHandler = (req, res) => {
  res.json(ATTENDANCE_DB);
};

// POST /api/student/attendance/face - Mark face attendance
export const handleMarkFaceAttendance: RequestHandler = (req, res) => {
  const { faceData } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!faceData || !token) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  // Decode token to get student info
  const decoded = Buffer.from(token, "base64").toString("utf-8");
  const [, studentId] = decoded.split(":");

  // Check if already marked today
  const today = new Date().toISOString().split("T")[0];
  const alreadyMarked = ATTENDANCE_DB.some(
    (a) => a.studentId === studentId && a.date === today,
  );

  if (alreadyMarked) {
    res.status(409).json({ error: "Already marked attendance today" });
    return;
  }

  const record: AttendanceRecord = {
    id: `attendance-${Date.now()}`,
    studentId,
    studentName: "John Doe", // In production, fetch from database
    date: today,
    time: new Date().toLocaleTimeString(),
    mode: "face",
    createdAt: new Date(),
  };

  ATTENDANCE_DB.push(record);
  res.status(201).json(record);
};

// POST /api/student/attendance/qr - Mark QR attendance
export const handleMarkQRAttendance: RequestHandler = (req, res) => {
  const { qrCode } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!qrCode || !token) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  // Decode token to get student info
  const decoded = Buffer.from(token, "base64").toString("utf-8");
  const [, studentId] = decoded.split(":");

  // Check if already marked today
  const today = new Date().toISOString().split("T")[0];
  const alreadyMarked = ATTENDANCE_DB.some(
    (a) => a.studentId === studentId && a.date === today,
  );

  if (alreadyMarked) {
    res.status(409).json({ error: "Already marked attendance today" });
    return;
  }

  // Validate QR code (in production, verify against database)
  if (!qrCode.startsWith("STU_")) {
    res.status(400).json({ error: "Invalid QR code" });
    return;
  }

  const record: AttendanceRecord = {
    id: `attendance-${Date.now()}`,
    studentId,
    studentName: "John Doe", // In production, fetch from database
    date: today,
    time: new Date().toLocaleTimeString(),
    mode: "qr",
    createdAt: new Date(),
  };

  ATTENDANCE_DB.push(record);
  res.status(201).json(record);
};
