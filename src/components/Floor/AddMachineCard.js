import React, { useState } from "react";
import { Plus } from "lucide-react";
import QrScanner from "./QrScanner";

export default function AddMachineCard({ onClick }) {
  const [isScanning, setIsScanning] = useState(false);

  // Start QR scanning process
  const handleScanClick = async () => {
    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("המצלמה אינה נתמכת בדפדפן זה");
        return;
      }

      // Try to actually access the camera before showing the scanner
      await navigator.mediaDevices.getUserMedia({ video: true });

      // If we got here, camera access was successful
      setIsScanning(true);
    } catch (error) {
      console.error("Camera error:", error);

      if (error.name === "NotAllowedError") {
        alert("אנא אשר גישה למצלמה כדי לסרוק את קוד ה-QR");
      } else if (error.name === "NotFoundError") {
        alert("לא נמצאה מצלמה במכשיר זה");
      } else {
        alert("לא ניתן לגשת למצלמה: " + error.message);
      }
    }
  };
  // Handle successful QR code scan
  const handleQrCodeScanned = (machineData) => {
    console.log("Machine QR code scanned:", machineData);
    setIsScanning(false);

    // Process the scanned machine data
    if (machineData && typeof onClick === "function") {
      onClick(machineData);
    }
  };

  // Cancel scanning
  const handleCancelScan = () => {
    setIsScanning(false);
  };

  return (
    <>
      {isScanning ? (
        <QrScanner onScan={handleQrCodeScanned} onCancel={handleCancelScan} />
      ) : (
        <div className="add-machine-card" onClick={handleScanClick}>
          <div className="add-machine-content">
            <div className="add-icon-circle">
              <Plus size={48} strokeWidth={3} className="add-icon" />
            </div>
            <p className="add-text">הוספת ארגז</p>
          </div>
        </div>
      )}
    </>
  );
}
