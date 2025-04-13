import React, { useState, useEffect } from "react";

export default function SettingsPanel({ machine, onReportError, onGetMoreInfo }) {
  const [settings, setSettings] = useState({
    currentNitrogen: machine.currentNitrogen,
    currentTemp: machine.currentTemp,
    nextNitrogen: machine.nextNitrogen,
    nextTemp: machine.nextTemp,
  });

  const [allowEdit, setAllowEdit] = useState(false);

  useEffect(() => {
    setSettings({
      currentNitrogen: machine.currentNitrogen,
      currentTemp: machine.currentTemp,
      nextNitrogen: machine.nextNitrogen,
      nextTemp: machine.nextTemp,
    });
  }, [machine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Save settings:", settings);
    setAllowEdit(prev => !prev);
  };

  const handleAllowEdit = () => {
    setAllowEdit(prev => !prev);
  }

  return (
    <div className="settings-panel">
      <h2 className="settings-panel__title">הגדרות מכונה</h2>

      <div className="settings-section">
        <p className="settings-section__title">הגדרות נוכחיות:</p>
        <div className="settings-row">
          <div className="settings-value">
            <label className="settings-value__label">חנקן (ליטר/דקה):</label>
            <input
              type="number"
              name="currentNitrogen"
              value={settings.currentNitrogen}
              disabled={!allowEdit}
              onChange={handleChange}
              className="settings-value__input"
            />
          </div>
          <div className="settings-value">
            <label className="settings-value__label">מעלות (C°):</label>
            <input
              type="number"
              name="currentTemp"
              value={settings.currentTemp}
              disabled={!allowEdit}
              onChange={handleChange}
              className="settings-value__input"
            />
          </div>
        </div>

        <p className="settings-section__title">הגדרות מצב הבא:</p>
        <div className="settings-row">
          <div className="settings-value">
            <label className="settings-value__label">חנקן (ליטר/דקה):</label>
            <input
              type="number"
              name="nextNitrogen"
              value={settings.nextNitrogen}
              disabled={!allowEdit}
              onChange={handleChange}
              className="settings-value__input"
            />
          </div>
          <div className="settings-value">
            <label className="settings-value__label">מעלות (C°):</label>
            <input
              type="number"
              name="nextTemp"
              value={settings.nextTemp}
              disabled={!allowEdit}
              onChange={handleChange}
              className="settings-value__input"
            />
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button
          onClick={allowEdit ? handleSave : handleAllowEdit}
          style={{
            backgroundImage: allowEdit ? "linear-gradient(to top, #00a81c, #46f864)" : 
            "linear-gradient(to top,rgb(107, 107, 107),rgb(197, 197, 197))"
          }}
          className="settings-actions__button"
        >
          {allowEdit ? "שמור שינויים" : "אפשר עריכה"}
        </button>
        <button
          onClick={() => onGetMoreInfo(machine.id)}
          className="settings-actions__button settings-actions__button--info"
        >
          מידע נוסף
        </button>
        <button
          onClick={() => onReportError(machine.id)}
          className="settings-actions__button settings-actions__button--error"
        >
          תקלת מכונה
        </button>
      </div>
    </div>
  );
}
