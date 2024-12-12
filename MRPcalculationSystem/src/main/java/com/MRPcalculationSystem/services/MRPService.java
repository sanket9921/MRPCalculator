package com.MRPcalculationSystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MRPcalculationSystem.Repository.BOMRepository;
import com.MRPcalculationSystem.Repository.InventoryRepository;
import com.MRPcalculationSystem.Repository.ProductionOrderRepository;
import com.MRPcalculationSystem.model.BOM;
import com.MRPcalculationSystem.model.BOMComponent;
import com.MRPcalculationSystem.model.Inventory;
import com.MRPcalculationSystem.model.MRPResult;
import com.MRPcalculationSystem.model.ProductionOrder;

import java.util.ArrayList;
import java.util.List;

@Service
public class MRPService {

    @Autowired
    private BOMRepository bomRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductionOrderRepository productionOrderRepository;

    public List<MRPResult> calculateMRP(Long productionOrderId) {
        ProductionOrder productionOrder = productionOrderRepository.findById(productionOrderId)
                .orElseThrow(() -> new RuntimeException("Production Order not found"));

        List<BOM> allBOMs = bomRepository.findAll();
        BOM bom = null;
        for (BOM b : allBOMs) {
            if (b.getProduct().equals(productionOrder.getProduct())) {
                bom = b;
                break;
            }
        }

        if (bom == null) {
            throw new RuntimeException("BOM not found for product: " + productionOrder.getProduct());
        }

        List<Inventory> inventoryList = inventoryRepository.findAll();

        List<MRPResult> results = new ArrayList<>();
        for (BOMComponent component : bom.getComponents()) {
            int requiredQuantity = component.getQuantity() * productionOrder.getQuantity();
            int onHand = getInventoryLevel(inventoryList, component.getPart());
            int toProcure = Math.max(0, requiredQuantity - onHand);

            MRPResult result = new MRPResult();
            result.setPart(component.getPart());
            result.setRequiredQuantity(requiredQuantity);
            result.setOnHand(onHand);
            result.setToProcure(toProcure);

            results.add(result);
        }

        return results;
    }

    private int getInventoryLevel(List<Inventory> inventoryList, String part) {
        for (Inventory inventory : inventoryList) {
            if (inventory.getPart().equals(part)) {
                return inventory.getOnHand();
            }
        }
        return 0;
    }
}
