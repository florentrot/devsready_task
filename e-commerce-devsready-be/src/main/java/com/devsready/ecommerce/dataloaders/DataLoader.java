package com.devsready.ecommerce.dataloaders;

import com.devsready.ecommerce.entity.Product;
import com.devsready.ecommerce.repository.ProductRepository;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Value("${csv.products.path}")
    private String csvFilePath;

    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {

        if (productRepository.count() > 0) {
            return;
        }

        InputStream is = getClass().getResourceAsStream(csvFilePath);
        Reader reader = new BufferedReader(new InputStreamReader(is));

        ColumnPositionMappingStrategy<Product> strategy = new ColumnPositionMappingStrategy<>();
        strategy.setType(Product.class);

        CsvToBean<Product> csvToBean = new CsvToBeanBuilder<Product>(reader)
                .withType(Product.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();

        List<Product> products = csvToBean.parse();
        productRepository.saveAll(products);
    }
}


