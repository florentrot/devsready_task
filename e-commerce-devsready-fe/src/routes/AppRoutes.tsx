import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "../pages/ProductList";
import CreateProduct from "../pages/CreateProduct";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<CreateProduct />} />
        <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
);

export default AppRoutes;
