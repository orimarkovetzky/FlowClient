import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function MachineCarousel({
  machines,
  currentIndex,
  onPrev,
  onNext,
}) {
  // Calculate the previous and next indices with wrap-around
  const prevIndex = currentIndex === 0 ? machines.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === machines.length - 1 ? 0 : currentIndex + 1;

  // Current machine
  const currentMachine = machines[currentIndex];

  return (
    <div className="carousel-container">
      <button onClick={onPrev} className="nav-button nav-button-left">
        <ChevronLeft size={24} />
      </button>

      <div className="carousel-content">
        {/* Previous Machine */}
        <div className="side-machine left-machine">
          <img
            src={machines[prevIndex].imageUrl}
            alt={machines[prevIndex].name}
            className="machine-image"
          />
        </div>

        {/* Active Machine */}
        <div className="active-machine">
          <img
            src={currentMachine.imageUrl}
            alt={currentMachine.name}
            className="machine-image"
          />
          <div className="machine-label">{currentMachine.name}</div>
        </div>

        {/* Next Machine */}
        <div className="side-machine right-machine">
          <img
            src={machines[nextIndex].imageUrl}
            alt={machines[nextIndex].name}
            className="machine-image"
          />
        </div>
      </div>
      <button onClick={onNext} className="nav-button nav-button-right">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
