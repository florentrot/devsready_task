import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onDelete }) => {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id} style={{ marginBottom: "10px" }}>
          <strong>{p.name}</strong> — ${p.price}
          <div>
            <Link to={`/products/${p.id}/edit`}>Edit</Link>
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
