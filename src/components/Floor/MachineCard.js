import React from "react";
import { Clock, AlertTriangle, PlayCircle, UserCheck } from "lucide-react";

export default function MachineCard({ machine, onClick }) {
  // Get status icon based on machine status
  const getStatusIcon = () => {
    switch (machine.status) {
      case "running":
        return null;
      case "delayed":
        return (
          <div className="status-circle status-circle--delayed">
            <Clock size={24} />
          </div>
        );
      case "error":
        return (
          <div className="status-circle status-circle--error">
            <AlertTriangle size={24} />
          </div>
        );
      case "waiting":
        return (
          <div className="status-circle status-circle--waiting">
            <UserCheck size={24} />
          </div>
        );
      default:
        return null;
    }
  };

  // Get timer color based on machine status
  const getTimerColor = () => {
    if (machine.status === "delayed") return "text-red-500";
    if (machine.status === "waiting") return "text-blue-600";
    return "text-green-600";
  };

  // Get timer prefix
  const getTimerPrefix = () => {
    return machine.isDelayed ? "+" : "";
  };

  return (
    <div
      className="machine-card"
      onClick={onClick}
    >
      <div className="machine-content">
        {machine.status !== "running" && (
          <div className="status-icon-container">
            {getStatusIcon()}
          </div>
        )}
        
        <div className="machine-info">
          <h2 className="machine-name">{machine.name}</h2>
          <p className="current-product">בתהליך: {machine.currentProduct}</p>
          <p className="next-product">הבא בתור: {machine.nextProduct}</p>
        </div>
        
        <div className="machine-timer">
          {machine.status === "waiting" ? (
            <div className="play-button-circle">
              <PlayCircle size={36} className="text-blue-600" />
            </div>
          ) : (
            <div className={`timer-circle ${machine.status === "delayed" ? "timer-circle--delayed" : ""}`}>
              <span className={`timer-text ${getTimerColor()}`}>
                {getTimerPrefix()}{machine.timeRemaining}
              </span>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}