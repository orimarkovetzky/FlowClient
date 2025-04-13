import React, { useState } from "react";
import MachineGrid from "../components/Floor/MachineGrid";
import FloorFooter from "../components/Floor/FloorFooter";
import { useNavigate } from "react-router-dom";
import { demoFloor } from "../constants/demoData";

export default function Floor() {
  const navigate = useNavigate();

  // Machine data model with expanded status examples
  const [machines, setMachines] = useState(demoFloor);

  // Handle navigation to machine details
  const handleMachineClick = (machineId) => {
    navigate("/machines");
  };

  // Handle QR code scanning result
  const handleQrScanned = (machineData) => {
    try {
      // Parse the QR code data
      const machineInfo = JSON.parse(machineData);
      console.log(machineInfo);
      // Check if this machine is already in our list
      const existingMachine = machines.find((m) => m.id === machineInfo.id);

      if (existingMachine) {
        // If the machine exists, navigate to it
        handleMachineClick(machineInfo.id);
      } else {
        // If it's a new machine, you might want to add it or fetch details from API
        console.log("New machine scanned, fetching details...");

        const newMachine = {
          id: machineInfo.id,
          name: machineInfo.name || `מכונה ${machineInfo.id}`,
          type: machineInfo.type || "חדש",
          status: "waiting",
          currentProduct: "---",
          nextProduct: "---",
          timeRemaining: "--:--",
          isDelayed: false,
        };

        // Add the new machine to our list
        setMachines((prev) => [...prev, newMachine]);

        // Navigate to the new machine
        setTimeout(() => handleMachineClick(machineInfo.id), 500);
      }
    } catch (error) {
      console.error("Invalid QR code format:", error);
      alert("קוד QR לא תקין. אנא סרוק קוד של מכונה תקין.");
    }
  };

  return (
    <div className="floor-container">
      <MachineGrid
        machines={machines}
        onMachineClick={handleMachineClick}
        onAddMachine={handleQrScanned}
      />
      <FloorFooter />
    </div>
  );
}