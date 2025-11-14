package com.devsready.ecommerce.specification;

import com.devsready.ecommerce.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecs {

    public static Specification<Product> nameLike(String nameLike) {
        return (root, query, cb) -> {
            if (nameLike == null || nameLike.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + nameLike.trim().toLowerCase() + "%";
            return cb.like(cb.lower(root.get("name")), pattern);
        };
    }

    public static Specification<Product> minPrice(Double minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) {
                return null;
            }
            return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
        };
    }

    public static Specification<Product> maxPrice(Double maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) {
                return null;
            }
            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }
}

