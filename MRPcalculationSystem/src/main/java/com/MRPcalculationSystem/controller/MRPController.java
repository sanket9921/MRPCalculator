package com.MRPcalculationSystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.MRPcalculationSystem.services.MRPCalculationService;

import java.util.Map;

@RestController
@RequestMapping("/api/mrp")
@CrossOrigin(origins = "*")
public class MRPController {
    @Autowired
    private MRPCalculationService mrpCalculationService;

    @PostMapping("/calculate")
    public Map<String, Object> calculateMRP(@RequestParam String product, @RequestParam int quantity) {
        return mrpCalculationService.calculateRequirements(product, quantity);
    }
}
