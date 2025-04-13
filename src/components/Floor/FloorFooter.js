import React from "react";
import { Clock, AlertTriangle, PlayCircle, UserCheck } from "lucide-react";

export default function FloorFooter() {
  return (
    <div className="floor-footer">
      <div className="status-indicator status-indicator--error">
        <div className="status-indicator-icon">
          <AlertTriangle size={24} />
        </div>
        <span>מכונה תקולה</span>
      </div>
      <div className="status-indicator status-indicator--delayed">
        <div className="status-indicator-icon">
          <Clock size={24} />
        </div>
        <span>מוצר באיחור</span>
      </div>
      <div className="status-indicator status-indicator--waiting">
        <div className="status-indicator-icon">
          <UserCheck size={24} />
        </div>
        <span>ממתין לעובד</span>
      </div>
    </div>
  );
}