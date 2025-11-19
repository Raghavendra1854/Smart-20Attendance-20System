import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Filter } from "lucide-react";

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  mode: "face" | "qr";
}

export default function AttendanceRecords() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    }
    fetchRecords();
  }, [navigate]);

  const fetchRecords = async () => {
    try {
      const response = await fetch("/api/admin/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter((record) => {
    if (filterDate && record.date !== filterDate) return false;
    if (filterMode && record.mode !== filterMode) return false;
    return true;
  });

  const getModeColor = (mode: string) => {
    return mode === "face"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const getModeLabel = (mode: string) => {
    return mode === "face" ? "Face Recognition" : "QR Code";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Attendance Records
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode
              </label>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Modes</option>
                <option value="face">Face Recognition</option>
                <option value="qr">QR Code</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Student Name
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
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Loading records...
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      {records.length === 0
                        ? "No attendance records yet"
                        : "No records match the selected filters"}
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {record.studentName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.time}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getModeColor(
                            record.mode,
                          )}`}
                        >
                          {getModeLabel(record.mode)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRecords.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRecords.length} of {records.length} records
          </div>
        )}
      </div>
    </div>
  );
}
