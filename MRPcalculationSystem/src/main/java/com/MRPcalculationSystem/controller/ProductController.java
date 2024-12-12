package com.MRPcalculationSystem.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRPcalculationSystem.services.ProductService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/api/products")
    public List<String> getAllProducts() {
        return productService.getAllProducts();
    }
}
