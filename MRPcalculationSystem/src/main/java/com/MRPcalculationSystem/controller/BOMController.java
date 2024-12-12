package com.MRPcalculationSystem.controller;


import com.MRPcalculationSystem.dto.BOMRequest;
import com.MRPcalculationSystem.services.BOMService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bom")
public class BOMController {

    @Autowired
    private BOMService bomService;

    @PostMapping
    public ResponseEntity<String> saveBOM(@RequestBody BOMRequest bomRequest) {
        bomService.saveBOM(bomRequest);
        return ResponseEntity.ok("BOM saved successfully");
    }
}
