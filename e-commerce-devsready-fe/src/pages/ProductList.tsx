import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getAllProducts, deleteProduct } from "../services/ProductService";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<{
    nameLike?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({});

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts(filters?: { nameLike?: string; minPrice?: number; maxPrice?: number }) {
    setLoading(true);
    try {
      const data = await getAllProducts({
        nameLike: filters?.nameLike,
        minPrice: filters?.minPrice,
        maxPrice: filters?.maxPrice,
      });
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  if (loading)
    return (
      <p className="text-gray-500 text-center mt-10 text-lg font-medium">
        Loading...
      </p>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4 md:mb-0">
          Products
        </h1>
        <Link to="/products/new">
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition">
            + Add Product
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap md:flex-row items-center gap-4 my-4">
        <div>Filter by:</div>
        <input
          type="text"
          placeholder="Name"
          value={filters.nameLike || ""}
          onChange={(e) => setFilters({ ...filters, nameLike: e.target.value })}
          className="border px-3 py-2 rounded flex-1 min-w-[80px] max-w-[100px]"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value ? parseFloat(e.target.value) : undefined })
          }
          className="border px-3 py-2 rounded flex-1 min-w-[80px] max-w-[100px]"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value ? parseFloat(e.target.value) : undefined })
          }
          className="border px-3 py-2 rounded flex-1 min-w-[80px] max-w-[100px]"
        />

        <button
          onClick={() => loadProducts(filters)}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Apply Filter
        </button>

        <button
          onClick={() => {
            setFilters({});
            loadProducts({});
          }}
          className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500 transition"
        >
          Remove Filters
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10 text-lg">
          No products available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-purple-200 text-left">
              <tr>
                <th className="px-6 py-3 text-purple-900 font-semibold">Name</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Description</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Category</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Subcategory</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Seller Name</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Price</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Quantity</th>
                <th className="px-6 py-3 text-purple-900 font-semibold">Options</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 hover:bg-purple-50 transition"
                >
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.description}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">{p.subcategory}</td>
                  <td className="px-6 py-4">{p.sellerName}</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">{p.price} Lei</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">{p.quantity}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link to="#">
                      <button
                        className="bg-yellow-400 text-white px-3 py-1 rounded shadow hover:bg-yellow-500 transition cursor-not-allowed"
                        title="Not implemented yet"
                        disabled
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default ProductList;
