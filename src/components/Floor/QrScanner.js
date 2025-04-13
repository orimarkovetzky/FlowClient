import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import jsQR from "jsqr";

export default function QrScanner({ onScan, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  const stopCamera = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }
  };

  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrame;

    const startScanning = async () => {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
        });

        // Connect stream to video element
        video.srcObject = stream;

        video.play();

        // Start scanning loop
        scanQRCode();
      } catch (err) {
        setError("לא ניתן לגשת למצלמה. אנא ודא שיש לך הרשאה להשתמש במצלמה.");
        console.log("Error accessing camera:", err);
      }
    };

    const scanQRCode = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        // If QR code found
        if (code) {
          console.log("QR code detected:", code.data);

          // Stop camera and scanning
          stopScanning();

          // Call the onScan callback with the QR data
          if (onScan) {
            onScan(code.data);
          }
          return;
        }
      }

      // Continue scanning
      animationFrame = requestAnimationFrame(scanQRCode);
    };

    const stopScanning = () => {
      stopCamera();

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

    startScanning();

    // Cleanup function
    return () => {
      stopScanning();
    };
  }, [onScan]);

  return (
    <div className="qr-scanner">
      <div className="qr-scanner__header">
        <h2>סריקת קוד QR</h2>
        <button className="qr-scanner__close" onClick={handleCancel}>
          <X size={24} />
        </button>
      </div>
      <div className="qr-scanner__viewport">
        <video ref={videoRef} className="qr-scanner__video" />
        <canvas ref={canvasRef} className="qr-scanner__canvas" />
        <div className="qr-scanner__overlay">
          <div className="qr-scanner__target"></div>
        </div>
      </div>
      {error && <div className="qr-scanner__error">{error}</div>}
      <div className="qr-scanner__instructions">
        כוון את המצלמה לקוד ה-QR של המכונה
      </div>
    </div>
  );
}
