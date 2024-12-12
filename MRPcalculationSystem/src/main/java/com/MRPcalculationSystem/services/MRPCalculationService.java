package com.MRPcalculationSystem.services;


import com.MRPcalculationSystem.Repository.BOMRepository;
import com.MRPcalculationSystem.Repository.InventoryRepository;
import com.MRPcalculationSystem.model.BOM;
import com.MRPcalculationSystem.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MRPCalculationService {
    @Autowired
    private BOMRepository bomRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public Map<String, Object> calculateRequirements(String product, int quantity) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> netRequirements = new ArrayList<>();
        List<Map<String, Object>> plannedOrders = new ArrayList<>();

        BOM bom = bomRepository.findByProduct(product);
        if (bom == null) {
            throw new IllegalArgumentException("BOM not found for product: " + product);
        }

        for (var component : bom.getComponents()) {
            String part = component.getPart();
            int requiredQuantity = component.getQuantity() * quantity;

            Inventory inventory = inventoryRepository.findByPart(part);
            int onHand = inventory != null ? inventory.getOnHand() : 0;

            int toBeProcured = Math.max(0, requiredQuantity - onHand);

            Map<String, Object> netRequirement = new HashMap<>();
            netRequirement.put("part", part);
            netRequirement.put("requiredQuantity", requiredQuantity);
            netRequirement.put("onHand", onHand);
            netRequirement.put("toBeProcured", toBeProcured);

            netRequirements.add(netRequirement);

            if (toBeProcured > 0) {
                Map<String, Object> plannedOrder = new HashMap<>();
                plannedOrder.put("part", part);
                plannedOrder.put("orderQuantity", toBeProcured);
                plannedOrders.add(plannedOrder);
            }
        }

        response.put("netRequirements", netRequirements);
        response.put("plannedOrders", plannedOrders);
        return response;
    }
}
