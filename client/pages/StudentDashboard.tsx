import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  Camera,
  QrCode,
  BarChart3,
  Download,
  Calendar,
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/student-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
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
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "mark-attendance", label: "Mark Attendance", icon: Calendar },
            { id: "records", label: "My Records", icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
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
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Attendance</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <Calendar className="w-12 h-12 text-blue-100 rounded-lg p-2 bg-blue-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Attendance %</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0%</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-green-100 rounded-lg p-2 bg-green-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Absent Days</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <Calendar className="w-12 h-12 text-red-100 rounded-lg p-2 bg-red-50" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/student/face-attendance"
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-center"
                >
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Mark Face</h3>
                  <p className="text-sm text-gray-600">Use face recognition</p>
                </Link>

                <Link
                  to="/student/qr-attendance"
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-center"
                >
                  <QrCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Scan QR Code</h3>
                  <p className="text-sm text-gray-600">Scan your QR code</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mark Attendance Tab */}
        {activeTab === "mark-attendance" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Mark Attendance</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/student/face-attendance"
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white text-center hover:shadow-lg transition"
              >
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Face Recognition</h3>
                <p className="text-blue-100 mb-4">
                  Stand in front of the camera to mark attendance
                </p>
                <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                  Start
                </button>
              </Link>

              <Link
                to="/student/qr-attendance"
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 text-white text-center hover:shadow-lg transition"
              >
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">QR Code Scan</h3>
                <p className="text-purple-100 mb-4">
                  Scan the QR code displayed in your class
                </p>
                <button className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50 transition">
                  Scan
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === "records" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Attendance Records
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Mode
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
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
      </div>
    </div>
  );
}
