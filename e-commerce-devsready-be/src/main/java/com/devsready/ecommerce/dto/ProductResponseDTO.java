package com.devsready.ecommerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String subcategory;
    private String sellerName;
    private Double price;
    private Integer quantity;
}

