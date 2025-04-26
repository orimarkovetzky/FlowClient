import React from "react";
import MachineCard from "./MachineCard";
import AddMachineCard from "./AddMachineCard";

export default function MachineGrid({ machines, onMachineClick, onAddMachine }) {
  // Define fixed positions for the U-shape (8 positions, excluding center)
  const positions = [
    "top-right",
    "top-center", 
    "top-left",      
    "middle-right",  
    "middle-left",  
    "bottom-right",
    "bottom-left" 
  ];
  
  // Map machines to available positions, only up to the number of machines we have
  const positionedMachines = {};
  
  // Assign machines to positions, only up to the number of machines available
  positions.forEach((position, index) => {
    if (index < machines.length) {
      positionedMachines[position] = machines[index];
    }
  });

  // Render all positions, with or without machines
  const renderPositions = () => {
    return positions.map(position => {
      const machine = positionedMachines[position];
      const className = `machine-position-${position}`;
      
      if (!machine) {
        // Return empty placeholder to maintain grid structure
        return <div key={position} className={className}></div>;
      }
      
      return (
        <div key={machine.id} className={className}>
          <MachineCard
            machine={machine}
            onClick={() => onMachineClick(machine.id)}
          />
        </div>
      );
    });
  };

  return (
    <div className="machine-grid">
      {/* All positioned machines */}
      {renderPositions()}
      
      {/* Center position - always the Add button */}
      <div className="machine-position-center">
        <AddMachineCard onClick={onAddMachine} />
      </div>
    </div>
  );
}