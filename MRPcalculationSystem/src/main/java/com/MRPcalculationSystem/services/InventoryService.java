package com.MRPcalculationSystem.services;


import com.MRPcalculationSystem.Repository.InventoryRepository;
import com.MRPcalculationSystem.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory addOrUpdateInventory(Inventory inventory) {
        Inventory existingInventory = inventoryRepository.findByPart(inventory.getPart());
        if (existingInventory != null) {
            existingInventory.setOnHand(existingInventory.getOnHand() + inventory.getOnHand());
            return inventoryRepository.save(existingInventory);
        }
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }
}
