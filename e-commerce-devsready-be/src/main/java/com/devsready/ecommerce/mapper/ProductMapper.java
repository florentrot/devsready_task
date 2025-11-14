package com.devsready.ecommerce.mapper;

import com.devsready.ecommerce.dto.ProductRequestDTO;
import com.devsready.ecommerce.dto.ProductResponseDTO;
import com.devsready.ecommerce.entity.Product;
import org.mapstruct.Mapper;


@Mapper
public interface ProductMapper {
    ProductResponseDTO toDto(Product product);
    Product toEntity(ProductRequestDTO dto);
}



