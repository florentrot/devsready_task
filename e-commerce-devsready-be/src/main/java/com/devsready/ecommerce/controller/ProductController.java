package com.devsready.ecommerce.controller;

import com.devsready.ecommerce.dto.ProductRequestDTO;
import com.devsready.ecommerce.dto.ProductResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Products", description = "Product Endpoints")
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public interface ProductController {

    @Operation(
            summary = "List of products",
            description = "Get all products based on criteria"
    )
    @ApiResponse(responseCode = "200", description = "List of products",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ProductResponseDTO.class)))
    @GetMapping
    ResponseEntity<List<ProductResponseDTO>> getAll(
            @Parameter(description = "Name filter") @RequestParam(required = false) String name,
            @Parameter(description = "Minimum price filter") @RequestParam(required = false) Double minPrice,
            @Parameter(description = "Maximum price filter") @RequestParam(required = false) Double maxPrice
    );

    @Operation(summary = "Get product by id")
    @ApiResponse(responseCode = "200", description = "Product found")
    @ApiResponse(responseCode = "404", description = "Product not found")
    @GetMapping("/{id}")
    ResponseEntity<ProductResponseDTO> getById(
            @Parameter(description = "product id", example = "1") @PathVariable Long id
    );

    @Operation(summary = "Create product")
    @ApiResponse(responseCode = "201", description = "Product created")
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @PostMapping
    ResponseEntity<ProductResponseDTO> create(@RequestBody ProductRequestDTO dto);

    @Operation(summary = "Update product")
    @ApiResponse(responseCode = "200", description = "Product updated")
    @ApiResponse(responseCode = "404", description = "Product not found")
    @PutMapping("/{id}")
    ResponseEntity<ProductResponseDTO> update(
            @Parameter(description = "product id", example = "1") @PathVariable Long id,
            @RequestBody ProductRequestDTO dto
    );

    @Operation(summary = "Patch product")
    @ApiResponse(responseCode = "200", description = "Product partially updated")
    @ApiResponse(responseCode = "404", description = "Product not found")
    @PatchMapping("/{id}")
    ResponseEntity<ProductResponseDTO> patch(
            @Parameter(description = "product id", example = "1") @PathVariable Long id,
            @RequestBody Map<String, Object> updates
    );

    @Operation(summary = "Delete product by id")
    @ApiResponse(responseCode = "204", description = "Product deleted")
    @ApiResponse(responseCode = "404", description = "Product not found")
    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(
            @Parameter(description = "product id", example = "1") @PathVariable Long id
    );
}
