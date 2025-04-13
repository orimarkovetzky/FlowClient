import React, { useState } from "react";

export default function ProductActionsPanel({
  product,
  category,
  onUpdateStatus,
  onUpdateProduct,
}) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    units: product?.units || 0,
    processTime: product?.processTime || "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct(product.id, category, formData);
    setEditMode(false);
  };

  // Reset form data when product changes
  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        units: product.units,
        processTime: product.processTime,
      });
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="product-actions-panel">
      <div className="product-actions-panel__header">
        <h3>פעולות</h3>
      </div>
      <div className="product-actions-panel__content">
        {editMode ? (
          <form onSubmit={handleSubmit} className="product-edit-form">
            <div className="form-group">
              <label htmlFor="name">שם מוצר:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="units">מספר יחידות:</label>
              <input
                type="number"
                id="units"
                name="units"
                value={formData.units}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="processTime">זמן תהליך (שעות):</label>
              <input
                type="text"
                id="processTime"
                name="processTime"
                value={formData.processTime}
                onChange={handleChange}
              />
            </div>
            <div className="product-actions-buttons">
              <button type="submit" className="save-button">
                שמור שינויים
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setEditMode(false)}
              >
                בטל
              </button>
            </div>
          </form>
        ) : (
          <div className="product-status-actions">
            <div className="product-actions-buttons">
              <button
                onClick={() => setEditMode(true)}
                className="edit-button"
              >
                ערוך מוצר
              </button>
              
              {category === "new" && (
                <button
                  onClick={() => onUpdateStatus(product.id, "new", "inProcess")}
                  className="start-process-button"
                >
                  התחל תהליך
                </button>
              )}
              
              {category === "inProcess" && (
                <button
                  onClick={() => onUpdateStatus(product.id, "inProcess", "completed")}
                  className="complete-button"
                >
                  סיים תהליך
                </button>
              )}
              
              {category === "completed" && (
                <button
                  onClick={() => onUpdateStatus(product.id, "completed", "new")}
                  className="recycle-button"
                >
                  מחזור מוצר
                </button>
              )}
            </div>
            
            {category === "inProcess" && (
              <div className="machine-actions">
                <button className="assign-machine-button">
                  שבץ למכונה
                </button>
                {product.machine && (
                  <button className="show-machine-button">
                    צפה במכונה
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}