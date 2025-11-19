import { RequestHandler } from "express";
import { Student } from "@shared/api";

// In-memory storage for demo (replace with database in production)
const STUDENTS_DB: Student[] = [
  {
    id: "student-1",
    name: "John Doe",
    rollNo: "101",
    class: "A",
    email: "student1@example.com",
    photoURL: undefined,
    faceEncoding: undefined,
    createdAt: new Date(),
  },
  {
    id: "student-2",
    name: "Jane Smith",
    rollNo: "102",
    class: "A",
    email: "student2@example.com",
    photoURL: undefined,
    faceEncoding: undefined,
    createdAt: new Date(),
  },
];

// Middleware to verify admin token
export const verifyAdminToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token || !token.startsWith("YWRtaW46")) {
    // Check if token starts with base64 for "admin:"
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};

// GET /api/admin/students - List all students
export const handleGetStudents: RequestHandler = (req, res) => {
  res.json(STUDENTS_DB);
};

// GET /api/admin/students/:id - Get single student
export const handleGetStudent: RequestHandler = (req, res) => {
  const { id } = req.params;
  const student = STUDENTS_DB.find((s) => s.id === id);

  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json(student);
};

// POST /api/admin/students - Create new student
export const handleCreateStudent: RequestHandler = (req, res) => {
  const { name, rollNo, class: className, email, password } = req.body;

  if (!name || !rollNo || !className || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newStudent: Student = {
    id: `student-${Date.now()}`,
    name,
    rollNo,
    class: className,
    email,
    photoURL: undefined,
    faceEncoding: undefined,
    createdAt: new Date(),
  };

  STUDENTS_DB.push(newStudent);
  res.status(201).json(newStudent);
};

// PUT /api/admin/students/:id - Update student
export const handleUpdateStudent: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { name, rollNo, class: className, email } = req.body;

  const student = STUDENTS_DB.find((s) => s.id === id);
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  if (name) student.name = name;
  if (rollNo) student.rollNo = rollNo;
  if (className) student.class = className;
  if (email) student.email = email;

  res.json(student);
};

// DELETE /api/admin/students/:id - Delete student
export const handleDeleteStudent: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = STUDENTS_DB.findIndex((s) => s.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  STUDENTS_DB.splice(index, 1);
  res.json({ message: "Student deleted" });
};
