import { ProductAPI } from "../api/api";
import { HTTP_METHOD } from "../constants/http-methods";
import type { Product } from "../types/Product";
import type { ProductFilters } from "../types/ProductFilters";
import type { ValidationErrorResponse } from "../types/ValidationErrorResponse"

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      throw data as ValidationErrorResponse;
    }
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function getAllProducts(filters?: ProductFilters): Promise<Product[]> {
  const query = new URLSearchParams();

  if (filters?.nameLike) query.append("nameLike", filters.nameLike);
  if (filters?.minPrice !== undefined) query.append("minPrice", filters.minPrice.toString());
  if (filters?.maxPrice !== undefined) query.append("maxPrice", filters.maxPrice.toString());

  const res = await fetch(`${ProductAPI.getAll}?${query.toString()}`);
  return res.json();
}


export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${ProductAPI.getById(id)}`);
  return res.json();
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const res = await fetch(ProductAPI.create, {
    method: HTTP_METHOD.POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleResponse<Product>(res);
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${ProductAPI.update(id)}`, {
    method: HTTP_METHOD.PUT,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  await fetch(`${ProductAPI.delete(id)}`, { method: HTTP_METHOD.DELETE });
}
