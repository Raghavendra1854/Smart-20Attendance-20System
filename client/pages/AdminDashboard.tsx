import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  Calendar,
  BarChart3,
  LogOut,
  Plus,
  Settings,
  Camera,
  QrCode,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 flex-wrap">
          {[
            { id: "overview", label: "Overview", icon: BarChart3, link: null },
            {
              id: "students",
              label: "Students",
              icon: Users,
              link: "/admin/students",
            },
            {
              id: "attendance",
              label: "Attendance",
              icon: Calendar,
              link: "/admin/attendance",
            },
            {
              id: "face-recognition",
              label: "Face Recognition",
              icon: Camera,
              link: null,
            },
            { id: "qr-code", label: "QR Code", icon: QrCode, link: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const element = tab.link ? (
              <Link
                key={tab.id}
                to={tab.link}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </Link>
            ) : (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
            return element;
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-100 rounded-lg p-2 bg-blue-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Today's Attendance</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <Calendar className="w-12 h-12 text-green-100 rounded-lg p-2 bg-green-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Attendance Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0%</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-purple-100 rounded-lg p-2 bg-purple-50" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Monthly Analytics
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>Chart will be displayed here</p>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Manage Students
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus className="w-5 h-5" />
                Add Student
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Roll No.
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Face Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No students added yet. Click "Add Student" to get started.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Attendance Records
            </h2>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Mode
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No attendance records yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Face Recognition Tab */}
        {activeTab === "face-recognition" && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Face Recognition Management
            </h2>
            <p className="text-gray-600 mb-6">
              Configure and manage face recognition settings for the system.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Configure
            </button>
          </div>
        )}

        {/* QR Code Tab */}
        {activeTab === "qr-code" && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              QR Code Management
            </h2>
            <p className="text-gray-600 mb-6">
              Generate and manage QR codes for students.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Manage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
