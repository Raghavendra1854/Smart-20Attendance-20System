import { Link } from "react-router-dom";
import { Camera, QrCode, BarChart3, Users, Clock, Shield } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">AttendanceAI</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/admin-login"
              className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Admin
            </Link>
            <Link
              to="/student-login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Student
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Smart Attendance System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Revolutionize your attendance management with AI-powered face recognition and QR code scanning. Fast, accurate, and completely secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admin-login"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/student-login"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Student Portal
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {/* Face Recognition */}
          <div className="bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-xl transition">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Face Recognition
            </h3>
            <p className="text-gray-600 mb-4">
              AI-powered face detection with real-time identification. Students can mark attendance instantly by standing in front of the camera.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Real-time detection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Secure face encoding
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Unknown face alerts
              </li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-8 border border-purple-100 hover:border-purple-300 hover:shadow-xl transition">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <QrCode className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              QR Code Scanning
            </h3>
            <p className="text-gray-600 mb-4">
              Generate unique QR codes for each student. Scan with any phone to instantly mark attendance with timestamp verification.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Unique student codes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Duplicate prevention
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Mobile friendly
              </li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-2xl p-8 border border-indigo-100 hover:border-indigo-300 hover:shadow-xl transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Advanced Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Comprehensive dashboard with monthly analytics, attendance trends, and visual reports for better insights.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Monthly trends
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Visual reports
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                PDF export
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose AttendanceAI?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Clock className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Lightning Fast</h4>
                <p className="text-blue-100">Mark attendance in seconds with real-time processing</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Easy Management</h4>
                <p className="text-blue-100">Simple student management and bulk operations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Secure & Reliable</h4>
                <p className="text-blue-100">Bank-grade security with encrypted face data</p>
              </div>
            </div>
            <div className="flex gap-4">
              <BarChart3 className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Smart Insights</h4>
                <p className="text-blue-100">Detailed analytics and attendance patterns</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-8">Ready to transform your attendance management?</p>
          <Link
            to="/admin-login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-blue-600">Features</Link></li>
                <li><Link to="/" className="hover:text-blue-600">Pricing</Link></li>
                <li><Link to="/" className="hover:text-blue-600">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-blue-600">About</Link></li>
                <li><Link to="/" className="hover:text-blue-600">Blog</Link></li>
                <li><Link to="/" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-blue-600">Docs</Link></li>
                <li><Link to="/" className="hover:text-blue-600">API</Link></li>
                <li><Link to="/" className="hover:text-blue-600">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-blue-600">Privacy</Link></li>
                <li><Link to="/" className="hover:text-blue-600">Terms</Link></li>
                <li><Link to="/" className="hover:text-blue-600">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 AttendanceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
