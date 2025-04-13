import { router } from "./constants/router";
import Header from "./layout/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./assets/css/styles.css";
import "./assets/css/header.css";

// machines page css
import "./assets/css/machines/machines.css";
import "./assets/css/machines/machineCarousel.css";
import "./assets/css/machines/settingsPanel.css";
import "./assets/css/machines/queuePanel.css";

// products page css
import "./assets/css/products/products.css";
import "./assets/css/products/productActionsPanel.css";
import "./assets/css/products/productDetailPanel.css";
import "./assets/css/products/productsCategories.css";

// floor css
import "./assets/css/floor/addMachineCard.css";
import "./assets/css/floor/floorFooter.css";
import "./assets/css/floor/machineCard.css";
import "./assets/css/floor/machineGrid.css";
import "./assets/css/floor/qrScanner.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {router.map((items) => (
          <Route path={items.url} element={items.component} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
