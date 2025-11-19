import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAdminLogin } from "./routes/admin-auth";
import { handleStudentLogin } from "./routes/student-auth";
import {
  verifyAdminToken,
  handleGetStudents,
  handleGetStudent,
  handleCreateStudent,
  handleUpdateStudent,
  handleDeleteStudent,
} from "./routes/admin-students";
import {
  verifyStudentToken,
  handleGetAttendance,
  handleMarkFaceAttendance,
  handleMarkQRAttendance,
} from "./routes/attendance";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication Routes
  app.post("/api/admin/login", handleAdminLogin);
  app.post("/api/student/login", handleStudentLogin);

  // Admin Routes
  app.get("/api/admin/students", verifyAdminToken, handleGetStudents);
  app.get("/api/admin/students/:id", verifyAdminToken, handleGetStudent);
  app.post("/api/admin/students", verifyAdminToken, handleCreateStudent);
  app.put("/api/admin/students/:id", verifyAdminToken, handleUpdateStudent);
  app.delete("/api/admin/students/:id", verifyAdminToken, handleDeleteStudent);

  // Attendance Routes
  app.get("/api/admin/attendance", verifyAdminToken, handleGetAttendance);
  app.post(
    "/api/student/attendance/face",
    verifyStudentToken,
    handleMarkFaceAttendance,
  );
  app.post(
    "/api/student/attendance/qr",
    verifyStudentToken,
    handleMarkQRAttendance,
  );

  return app;
}
