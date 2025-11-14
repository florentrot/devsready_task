package com.devsready.ecommerce.dto;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {
    @NotBlank
    private String name;
    private String description;
    private String category;
    private String subcategory;
    private String sellerName;
    @NotNull @Positive
    private Double price;
    @NotNull @PositiveOrZero
    private Integer quantity;
}


