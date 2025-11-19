import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Camera,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

export default function FaceAttendance() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "scanning" | "detected" | "not_detected" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/student-login");
    }
  }, [navigate]);

  const startCamera = async () => {
    try {
      setCameraActive(true);
      setStatus("scanning");
      setMessage("Camera starting...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setTimeout(() => {
          setMessage(
            "Face recognition active. Position your face in the camera.",
          );
          // Simulate face detection
          simulateFaceDetection();
        }, 1500);
      }
    } catch (error) {
      setCameraActive(false);
      setStatus("error");
      setMessage("Unable to access camera. Please check permissions.");
    }
  };

  const simulateFaceDetection = () => {
    // Simulate face detection after 3 seconds
    setTimeout(() => {
      // Randomly detect or not detect face for demo
      const detected = Math.random() > 0.3;

      if (detected) {
        setStatus("detected");
        setMessage("Face detected! Processing...");
        setStudentName("John Doe");

        // Simulate marking attendance
        setTimeout(() => {
          markAttendance();
        }, 1500);
      } else {
        setStatus("not_detected");
        setMessage("Face not recognized. Please try again.");
      }
    }, 3000);
  };

  const markAttendance = async () => {
    try {
      const response = await fetch("/api/student/attendance/face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
        },
        body: JSON.stringify({
          faceData: "encoded_face_data",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("✓ Attendance marked successfully!");
        stopCamera();
      } else {
        throw new Error("Failed to mark attendance");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to mark attendance. Please try again.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const handleRetry = () => {
    stopCamera();
    setStatus("idle");
    setMessage("");
    setStudentName("");
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
          <h1 className="text-2xl font-bold text-gray-900">
            Face Recognition Attendance
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Camera Preview */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full bg-black aspect-video flex items-center justify-center">
              {!cameraActive ? (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold">
                    Camera Preview
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Click "Start Face Scan" to begin
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

              {/* Status Overlay */}
              {cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-blue-500 rounded-full opacity-50 animate-pulse"></div>
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
                  : status === "error" || status === "not_detected"
                    ? "bg-red-50 border border-red-200"
                    : status === "detected"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              {status === "success" ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : status === "error" || status === "not_detected" ? (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`font-semibold ${
                    status === "success"
                      ? "text-green-900"
                      : status === "error" || status === "not_detected"
                        ? "text-red-900"
                        : "text-blue-900"
                  }`}
                >
                  {status === "success"
                    ? "Attendance Marked"
                    : status === "scanning"
                      ? "Scanning Face"
                      : status === "detected"
                        ? "Face Detected"
                        : status === "not_detected"
                          ? "Face Not Detected"
                          : "Error"}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    status === "success"
                      ? "text-green-700"
                      : status === "error" || status === "not_detected"
                        ? "text-red-700"
                        : "text-blue-700"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Student Info (if detected) */}
          {studentName && status !== "not_detected" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Recognized Student
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {studentName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {studentName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            {!cameraActive ? (
              <button
                onClick={startCamera}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                <Camera className="w-5 h-5 inline-block mr-2" />
                Start Face Scan
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
              >
                Stop
              </button>
            )}

            {(status === "not_detected" || status === "error") && (
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Instructions</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Ensure your face is clearly visible</li>
                <li>✓ Position yourself in good lighting</li>
                <li>✓ Face the camera directly</li>
                <li>✓ Remove glasses if possible</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
