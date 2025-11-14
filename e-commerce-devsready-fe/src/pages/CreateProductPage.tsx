import React from "react";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create Product</h1>
      <ProductForm
        onSubmit={(values) =>
          createProduct(values).then(() => navigate("/products"))
        }
      />
    </div>
  );
};

export default CreateProductPage;
