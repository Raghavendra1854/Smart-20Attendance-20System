import { RequestHandler } from "express";
import { LoginRequest, LoginResponse } from "@shared/api";

// In-memory storage for demo (replace with database in production)
interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
}

const ADMINS: Admin[] = [
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "admin123",
    name: "Administrator",
  },
];

export const handleAdminLogin: RequestHandler<
  unknown,
  LoginResponse | { error: string },
  LoginRequest
> = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const admin = ADMINS.find(
    (a) => a.email === email && a.password === password,
  );

  if (!admin) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // In production, use JWT or sessions
  const token = Buffer.from(`admin:${admin.id}:${Date.now()}`).toString(
    "base64",
  );

  const response: LoginResponse = {
    token,
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  };

  res.json(response);
};
