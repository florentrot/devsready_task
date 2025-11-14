import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import CreateProductPage from "./pages/CreateProductPage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<CreateProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
