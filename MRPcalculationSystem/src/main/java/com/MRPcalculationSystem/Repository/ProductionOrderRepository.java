package com.MRPcalculationSystem.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.MRPcalculationSystem.model.ProductionOrder;

public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, Long> {
}
