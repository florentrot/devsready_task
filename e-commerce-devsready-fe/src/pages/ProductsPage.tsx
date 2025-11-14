import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import ProductList from "../components/ProductList";
import ProductFilters from "../components/ProductFilters";
import { getAllProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = (filters?: any) => {
    getAllProducts(filters).then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <ProductFilters onFilter={(f) => loadProducts(f)} />

      <Link to="/products/create">Create Product</Link>

      <ProductList
        products={products}
        onDelete={(id) => deleteProduct(id).then(() => loadProducts())}
      />
    </div>
  );
};

export default ProductsPage;
