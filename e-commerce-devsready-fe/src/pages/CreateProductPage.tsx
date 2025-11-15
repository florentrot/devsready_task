import React from "react";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Product } from "../types/Product";

const CreateProductPage: React.FC = () => {

  const handleSubmit = async (values: Partial<Product>) => {
    try {
      await createProduct(values);
      toast.success("Product created successfully!");
    } catch (error: any) {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm onSubmit={handleSubmit} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
};

export default CreateProductPage;
