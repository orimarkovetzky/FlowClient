import React from "react";
import MachineCard from "./MachineCard";
import AddMachineCard from "./AddMachineCard";

export default function MachineGrid({ machines, onMachineClick, onAddMachine }) {
  return (
    <div className="machine-grid">
      {machines.map((machine) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          onClick={() => onMachineClick(machine.id)}
        />
      ))}
      <AddMachineCard onClick={onAddMachine} />
    </div>
  );
}