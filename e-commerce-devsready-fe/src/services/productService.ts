import type { Product } from "../types/Product";

const API_URL = "http://localhost:8080/api/products";

export interface ProductFilters {
  nameLike?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function getAllProducts(filters?: ProductFilters): Promise<Product[]> {
  const query = new URLSearchParams();

  if (filters?.nameLike) query.append("nameLike", filters.nameLike);
  if (filters?.minPrice !== undefined) query.append("minPrice", filters.minPrice.toString());
  if (filters?.maxPrice !== undefined) query.append("maxPrice", filters.maxPrice.toString());

  const res = await fetch(`${API_URL}?${query.toString()}`);
  return res.json();
}


export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
