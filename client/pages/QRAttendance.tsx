import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  QrCode,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

export default function QRAttendance() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error" | "duplicate">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [scannedCode, setScannedCode] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/student-login");
    }
  }, [navigate]);

  const startScanner = async () => {
    try {
      setScannerActive(true);
      setStatus("scanning");
      setMessage("QR Scanner active. Point your camera at the QR code.");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Simulate QR code detection
        simulateQRDetection();
      }
    } catch (error) {
      setScannerActive(false);
      setStatus("error");
      setMessage("Unable to access camera. Please check permissions.");
    }
  };

  const simulateQRDetection = () => {
    // Simulate QR code detection after 3 seconds
    setTimeout(() => {
      const code = "STU_" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setScannedCode(code);
      processQRCode(code);
    }, 3000);
  };

  const processQRCode = async (code: string) => {
    try {
      const response = await fetch("/api/student/attendance/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
        },
        body: JSON.stringify({ qrCode: code }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("✓ Attendance marked successfully!");
        stopScanner();
      } else if (response.status === 409) {
        setStatus("duplicate");
        setMessage(
          "You have already marked attendance today. Try again tomorrow."
        );
      } else {
        throw new Error(data.message || "Failed to mark attendance");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to process QR code. Please try again."
      );
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setScannerActive(false);
    }
  };

  const handleRetry = () => {
    stopScanner();
    setStatus("idle");
    setMessage("");
    setScannedCode("");
  };

  const handleManualEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("qrCode") as string;
    if (code) {
      setScannedCode(code);
      processQRCode(code);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link
            to="/student/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">QR Code Attendance</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Scanner Preview */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full bg-black aspect-video flex items-center justify-center">
              {!scannerActive ? (
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold">QR Scanner</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Click "Start Scanning" to begin
                  </p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
              <canvas ref={canvasRef} className="hidden" />

              {/* QR Frame Overlay */}
              {scannerActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 border-4 border-green-500">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`rounded-lg p-6 flex gap-4 items-start ${
                status === "success"
                  ? "bg-green-50 border border-green-200"
                  : status === "error" || status === "duplicate"
                  ? "bg-red-50 border border-red-200"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              {status === "success" ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : status === "error" || status === "duplicate" ? (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`font-semibold ${
                    status === "success"
                      ? "text-green-900"
                      : status === "error" || status === "duplicate"
                      ? "text-red-900"
                      : "text-yellow-900"
                  }`}
                >
                  {status === "success"
                    ? "Attendance Marked"
                    : status === "scanning"
                    ? "Scanning QR Code"
                    : status === "duplicate"
                    ? "Already Marked"
                    : "Error"}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    status === "success"
                      ? "text-green-700"
                      : status === "error" || status === "duplicate"
                      ? "text-red-700"
                      : "text-yellow-700"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Scanned Code Display */}
          {scannedCode && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Scanned Code
              </h3>
              <p className="text-2xl font-mono font-bold text-gray-900">
                {scannedCode}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {new Date().toLocaleString()}
              </p>
            </div>
          )}

          {/* Manual Entry Option */}
          {status === "idle" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Or Enter QR Code Manually
              </h3>
              <form onSubmit={handleManualEntry} className="flex gap-3">
                <input
                  type="text"
                  name="qrCode"
                  placeholder="Enter QR code..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            {!scannerActive ? (
              <button
                onClick={startScanner}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                <QrCode className="w-5 h-5 inline-block mr-2" />
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
              >
                Stop
              </button>
            )}

            {(status === "error" || status === "duplicate") && (
              <button
                onClick={handleRetry}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Try Again
              </button>
            )}

            {status === "success" && (
              <Link
                to="/student/dashboard"
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition text-center"
              >
                Back to Dashboard
              </Link>
            )}
          </div>

          {/* Instructions */}
          {status === "idle" && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">Instructions</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✓ Ensure QR code is clearly visible</li>
                <li>✓ Position code within the frame</li>
                <li>✓ Keep your device steady</li>
                <li>✓ Good lighting is recommended</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
