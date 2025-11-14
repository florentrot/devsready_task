package com.devsready.ecommerce.service.impl;


import com.devsready.ecommerce.dto.ProductRequestDTO;
import com.devsready.ecommerce.dto.ProductResponseDTO;
import com.devsready.ecommerce.entity.Product;
import com.devsready.ecommerce.exception.ResourceNotFoundException;
import com.devsready.ecommerce.mapper.ProductMapper;
import com.devsready.ecommerce.repository.ProductRepository;
import com.devsready.ecommerce.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ObjectMapper objectMapper;


    @Override
    @Transactional
    public ProductResponseDTO create(ProductRequestDTO dto) {
        Product entity = productMapper.toEntity(dto);
        Product saved = productRepository.save(entity);
        return productMapper.toDto(saved);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRED)
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + id + " not found."));

        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setCategory(dto.getCategory());
        existing.setSubcategory(dto.getSubcategory());
        existing.setSellerName(dto.getSellerName());
        existing.setPrice(dto.getPrice());
        existing.setQuantity(dto.getQuantity());

        Product saved = productRepository.save(existing);
        return productMapper.toDto(saved);
    }

    @Override
    @Transactional
    public ProductResponseDTO patch(Long id, Map<String, Object> updates) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + id + " not found."));

        ProductRequestDTO partialDto = objectMapper.convertValue(updates, ProductRequestDTO.class);

        patchProduct(partialDto, existing);
        Product saved = productRepository.save(existing);
        return productMapper.toDto(saved);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRED)
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product with id " + id + " not found.");
        }
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public ProductResponseDTO getById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + id + " not found."));
        return productMapper.toDto(p);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<ProductResponseDTO> getAll(String nameLike, Double minPrice, Double maxPrice) {
        var spec = (Specification<Product>) (root, query, cb) -> {
            List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();

            if (nameLike != null && !nameLike.trim().isEmpty()) {
                String pattern = "%" + nameLike.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("name")), pattern));
            }

            if (minPrice != null && maxPrice != null) {
                predicates.add(cb.between(root.get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        List<Product> results = productRepository.findAll(spec);
        return results.stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }

    private void patchProduct(ProductRequestDTO partialDto, Product existing) {
        if (partialDto.getName() != null) {
            existing.setName(partialDto.getName());
        }
        if (partialDto.getDescription() != null) {
            existing.setDescription(partialDto.getDescription());
        }
        if (partialDto.getCategory() != null) {
            existing.setCategory(partialDto.getCategory());
        }
        if (partialDto.getSubcategory() != null) {
            existing.setSubcategory(partialDto.getSubcategory());
        }
        if (partialDto.getSellerName() != null) {
            existing.setSellerName(partialDto.getSellerName());
        }
        if (partialDto.getPrice() != null) {
            existing.setPrice(partialDto.getPrice());
        }
        if (partialDto.getQuantity() != null) {
            existing.setQuantity(partialDto.getQuantity());
        }
    }
}