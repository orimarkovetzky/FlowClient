import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import MachineCarousel from "../components/Machines/MachineCarousel";
import QueuePanel from "../components/Machines/QueuePanel";
import SettingsPanel from "../components/Machines/SettingsPanel";
import { demoMachines } from "../constants/demoData";
import { getAllMachines } from "../api/machinesApi";
import { handleApiError } from "../api/handleError";

export default function Machines() {
  // Data model for machines
  const [machines, setMachines] = useState(demoMachines);

  // State for currently selected machine index
  const [currentMachineIndex, setCurrentMachineIndex] = useState(0);

  // Get current machine
  const currentMachine = machines[currentMachineIndex];

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getAllMachines();
        setMachines(data);
      } catch (err) {
        handleApiError(err);
      }
    };
    fetchMachines();
  }, []);

  // Navigate to previous machine
  const prevMachine = () => {
    setCurrentMachineIndex((prev) =>
      prev === 0 ? machines.length - 1 : prev - 1
    );
  };

  // Navigate to next machine
  const nextMachine = () => {
    setCurrentMachineIndex((prev) =>
      prev === machines.length - 1 ? 0 : prev + 1
    );
  };

  // Handler for updating the products order in a machine
  const updateProductsOrder = (machineId, updatedProducts) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.id === machineId
          ? { ...machine, products: updatedProducts }
          : machine
      )
    );
  };

  const reportError = (machineId) => {
    alert(`דיווח על תקלה במכונה ${machineId}`);
    // this would send data to an API
  };

  // Get more info function
  const getMoreInfo = (machineId) => {
    alert(`מציג מידע נוסף על מכונה ${machineId}`);
    // this would fetch additional data
  };

  return (
    <div className="machines-container">
      <MachineCarousel
        machines={machines}
        currentIndex={currentMachineIndex}
        onPrev={prevMachine}
        onNext={nextMachine}
      />

      <div className="machines">
        <SettingsPanel
          machine={currentMachine}
          onReportError={reportError}
          onGetMoreInfo={getMoreInfo}
        />
        <QueuePanel
          machine={currentMachine}
          onUpdateProducts={(updatedProducts) =>
            updateProductsOrder(currentMachine.id, updatedProducts)
          }
        />
      </div>
    </div>
  );
}
