import { RequestHandler } from "express";
import { LoginRequest, LoginResponse } from "@shared/api";

// In-memory storage for demo (replace with database in production)
interface StudentAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  rollNo: string;
  class: string;
}

const STUDENTS: StudentAccount[] = [
  {
    id: "student-1",
    email: "student1@example.com",
    password: "student123",
    name: "John Doe",
    rollNo: "101",
    class: "A",
  },
  {
    id: "student-2",
    email: "student2@example.com",
    password: "student123",
    name: "Jane Smith",
    rollNo: "102",
    class: "A",
  },
];

export const handleStudentLogin: RequestHandler<
  unknown,
  LoginResponse | { error: string },
  LoginRequest
> = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const student = STUDENTS.find(
    (s) => s.email === email && s.password === password,
  );

  if (!student) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // In production, use JWT or sessions
  const token = Buffer.from(`student:${student.id}:${Date.now()}`).toString(
    "base64",
  );

  const response: LoginResponse = {
    token,
    user: {
      id: student.id,
      email: student.email,
      name: student.name,
    },
  };

  res.json(response);
};
