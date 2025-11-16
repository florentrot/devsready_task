import React from "react";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/ProductService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Product } from "../types/Product";
import { apiWrapper } from "../api/apiWrapper";

const CreateProduct: React.FC = () => {

  const handleSubmit = async (values: Partial<Product>) => {
    const res = await apiWrapper(createProduct(values));

    if (!res) return;

    toast.success("Product created successfully!");
  };


  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm onSubmit={handleSubmit} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
};

export default CreateProduct;
