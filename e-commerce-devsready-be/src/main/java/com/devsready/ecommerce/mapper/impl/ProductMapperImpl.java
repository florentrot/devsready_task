package com.devsready.ecommerce.mapper.impl;

import com.devsready.ecommerce.dto.ProductRequestDTO;
import com.devsready.ecommerce.dto.ProductResponseDTO;
import com.devsready.ecommerce.entity.Product;
import com.devsready.ecommerce.mapper.ProductMapper;
import org.springframework.stereotype.Component;

@Component
public class ProductMapperImpl implements ProductMapper {
    @Override
    public ProductResponseDTO toDto(Product product) {
        if (product == null) {
            return null;
        }
        ProductResponseDTO responseDTO = new ProductResponseDTO();
        responseDTO.setId(product.getId());
        responseDTO.setName(product.getName());
        responseDTO.setDescription(product.getDescription());
        responseDTO.setCategory(product.getCategory());
        responseDTO.setSubcategory(product.getSubcategory());
        responseDTO.setSellerName(product.getSellerName());
        responseDTO.setPrice(product.getPrice());
        responseDTO.setQuantity(product.getQuantity());
        return responseDTO;
    }

    @Override
    public Product toEntity(ProductRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setSubcategory(dto.getSubcategory());
        product.setSellerName(dto.getSellerName());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        return product;
    }

}
