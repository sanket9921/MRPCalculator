import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BOMForm from "./components/BOMForm";
import InventoryForm from "./components/InventoryForm";
import ProductionOrderForm from "./components/ProductionOrderForm";
import NavBar from "./components/NavBar";


const App = () => {
  return (
    <Router>
      <NavBar /> {/* Add NavBar here */}

      <Routes>
        <Route path="/" element={<ProductionOrderForm />} />
        <Route path="/AddProduct" element={<BOMForm/>} />
        <Route path="/AddInventory" element={<InventoryForm/>} />

      </Routes>
    </Router>
  );
};

export default App;
