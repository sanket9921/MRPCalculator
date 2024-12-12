package com.MRPcalculationSystem.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.MRPcalculationSystem.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Inventory findByPart(String part);

}
