package com.MRPcalculationSystem.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.MRPcalculationSystem.model.BOM;

public interface BOMRepository extends JpaRepository<BOM, Long> {
    BOM findByProduct(String product);

}
