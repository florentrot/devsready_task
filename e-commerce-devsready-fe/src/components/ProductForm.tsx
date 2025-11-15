import React, { useState } from "react";
import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

interface Props {
  initial?: Partial<Product>;
  onSubmit: (values: Partial<Product>) => void;
}

const ProductForm: React.FC<Props> = ({ initial = {}, onSubmit }) => {
  const [name, setName] = useState(initial.name ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [category, setCategory] = useState(initial.category ?? "");
  const [subcategory, setSubcategory] = useState(initial.subcategory ?? "");
  const [sellerName, setSellerName] = useState(initial.sellerName ?? "");
  const [price, setPrice] = useState(initial.price ?? "");
  const [quantity, setQuantity] = useState(initial.quantity ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      category,
      subcategory,
      sellerName,
      price: price !== "" ? Number(price) : undefined,
      quantity: quantity !== "" ? Number(quantity) : undefined,
    });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setSellerName("");
    setPrice(0);
    setQuantity(0);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block font-semibold mb-1">Name*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Category</label>
        <textarea
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Subategory</label>
        <textarea
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>


      <div>
        <label className="block font-semibold mb-1">Seller Name</label>
        <textarea
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Price*</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Quantity*</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
      >
        Save
      </button>
      <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        <Link to="/products">Back to Products</Link>
      </button>
    </form>
  );
};

export default ProductForm;
