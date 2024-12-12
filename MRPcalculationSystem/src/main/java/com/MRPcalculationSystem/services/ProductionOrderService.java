package com.MRPcalculationSystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MRPcalculationSystem.Repository.ProductionOrderRepository;
import com.MRPcalculationSystem.model.ProductionOrder;

import java.util.List;

@Service
public class ProductionOrderService {

    @Autowired
    private ProductionOrderRepository productionOrderRepository;

    public List<ProductionOrder> getAllProductionOrders() {
        return productionOrderRepository.findAll();
    }

    public ProductionOrder getProductionOrderById(Long id) {
        return productionOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Production order not found"));
    }
}
