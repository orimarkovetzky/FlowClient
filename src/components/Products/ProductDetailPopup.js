import React from "react";

export default function ProductDetailPopup({ product, onClose }) {
  if (!product) return null;

  // Function to render process steps (if available)
  const renderProcessSteps = () => {
    if (!product.processSteps) return null;

    return (
      <div className="popup-bottom-data">
        <div className="process-steps">
          {product.processSteps.map((step, index) => {
            const isCompleted = step.endDate && step.endTime;
            const isLast = index === product.processSteps.length - 1;

            return (
              <div
                key={index}
                className={`process-step ${isCompleted ? "completed" : ""} ${
                  isLast && !isCompleted ? "current" : ""
                }`}
              >
                <div className="step-info">
                  <div className="step-name">
                    {step.name} {step.id}
                  </div>
                  <div className="step-times">
                    <div>
                      זמן התחלה: {step.startDate} {step.startTime}
                    </div>
                    <div>
                      זמן סיום: {isCompleted ? `${step.endDate} ${step.endTime}` : "---"}
                    </div>
                  </div>
                </div>
                {!isLast && <div className="step-arrow">←</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const iconColorField = product.isRing ? "borderColor" : "backgroundColor";
  const iconClass = product.isRing ? "ring" : "finger";
  return (
    <div className="popup-overlay">
      <div className="product-detail-popup">
        <div className="popup-header">
          <h2>פרטי מוצר</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="popup-content">
          <div className={`product-item__icon`}>
            <div className="product-item__status-icon big">
              <div
                style={{ [iconColorField]: product.color }}
                className={`product-item__status-icon__inner ${iconClass}`}
              ></div>
            </div>
          </div>

          <div className="product-details-grid">
            <div>
              <div className="detail-label">שם</div>
              <div className="detail-value product-name">{product.name}</div>
            </div>
            <div>
              <div className="detail-label">מק"ט</div>
              <div className="detail-value">{product.id || "134252"}</div>
            </div>
            <div>
              <div className="detail-label">צבע</div>
              <div className="detail-value">
                <span>{product.colorName || "שחור"}</span>
              </div>
            </div>
            <div>
              <div className="detail-label">כמות</div>
              <div className="detail-value">{product.units}</div>
            </div>
            <div>
              <div className="detail-label">הזמנה</div>
              <div className="detail-value">{product.order || "IM302"}</div>
            </div>
            <div>
              <div className="detail-label">כניסה</div>
              <div className="detail-value">
                {product.date} {product.time}
              </div>
            </div>
          </div>
        </div>
        {renderProcessSteps()}
      </div>
    </div>
  );
}
