package com.devsready.ecommerce.service;

import com.devsready.ecommerce.dto.ProductRequestDTO;
import com.devsready.ecommerce.dto.ProductResponseDTO;

import java.util.List;
import java.util.Map;

public interface ProductService {
    ProductResponseDTO create(ProductRequestDTO dto);
    ProductResponseDTO getById(Long id);
    List<ProductResponseDTO> getAll(String nameLike, Double minPrice, Double maxPrice);
    ProductResponseDTO update(Long id, ProductRequestDTO dto);
    ProductResponseDTO patch(Long id, Map<String,Object> updates);
    void delete(Long id);
}

