import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";
import { getProductById, updateProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading…</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm
        initial={product}
        onSubmit={(values) =>
          updateProduct(product.id, values).then(() => navigate("/products"))
        }
      />
    </div>
  );
};

export default EditProductPage;
