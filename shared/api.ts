/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Authentication Interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Student Interfaces
export interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  email: string;
  photoURL?: string;
  faceEncoding?: string;
  createdAt: Date;
}

export interface CreateStudentRequest {
  name: string;
  rollNo: string;
  class: string;
  email: string;
  password: string;
  photo?: File;
}

// Attendance Interfaces
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  mode: "face" | "qr";
  createdAt: Date;
}

export interface MarkAttendanceRequest {
  faceData?: string;
  qrCode?: string;
}

// Admin Dashboard Response
export interface AdminDashboardStats {
  totalStudents: number;
  todaysAttendance: number;
  attendanceRate: number;
  monthlyData: Array<{
    date: string;
    count: number;
  }>;
}
