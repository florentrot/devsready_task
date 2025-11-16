const BASE_URL = 'http://localhost:8080/api';

export const ProductAPI = {
    getAll: `${BASE_URL}/products`,
    getById: (id: number) => `${BASE_URL}/products/${id}`,
    create: `${BASE_URL}/products`,
    update: (id: number) => `${BASE_URL}/products/${id}`,
    delete: (id: number) => `${BASE_URL}/products/${id}`
};
