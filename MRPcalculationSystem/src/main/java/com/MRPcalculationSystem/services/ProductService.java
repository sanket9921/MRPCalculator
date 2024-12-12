package com.MRPcalculationSystem.services;


import com.MRPcalculationSystem.Repository.BOMRepository;
import com.MRPcalculationSystem.model.BOM;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final BOMRepository bomRepository;

    public ProductService(BOMRepository bomRepository) {
        this.bomRepository = bomRepository;
    }

    public List<String> getAllProducts() {
        // Fetch all BOM entries and extract product names
        return bomRepository.findAll()
                .stream()
                .map(BOM::getProduct)
                .toList();
    }
}
