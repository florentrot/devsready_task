package com.devsready.ecommerce.entity;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @CsvBindByName(column = "name")
    private String name;

    @CsvBindByName(column = "description")
    private String description;
    @CsvBindByName(column = "category")
    private String category;
    @CsvBindByName(column = "subcategory")
    private String subcategory;
    @CsvBindByName(column = "seller_name")
    private String sellerName;

    @Column(nullable = false)
    @CsvBindByName(column = "price")
    private Double price;

    @Column(nullable = false)
    @CsvBindByName(column = "quantity")
    private Integer quantity;

    @CsvBindByName(column = "created_at")
    @CsvDate("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    @CsvBindByName(column = "updated_at")
    @CsvDate("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = createdAt;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
