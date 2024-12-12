package com.MRPcalculationSystem.services;

import com.MRPcalculationSystem.Repository.BOMRepository;
import com.MRPcalculationSystem.dto.BOMRequest;
import com.MRPcalculationSystem.model.BOM;
import com.MRPcalculationSystem.model.BOMComponent;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BOMService {

    @Autowired
    private BOMRepository bomRepository;
    
    public List<String> getAllProducts() {
        return bomRepository.findAll()
                .stream()
                .map(BOM::getProduct)
                .toList();
    }

    public void saveBOM(BOMRequest bomRequest) {
        // Create a new BOM entity
        BOM bom = new BOM();
        bom.setProduct(bomRequest.getProduct());

        // Map the components from the request
        List<BOMComponent> components = new ArrayList<>();
        for (BOMRequest.BOMComponentRequest componentRequest : bomRequest.getComponents()) {
            BOMComponent component = new BOMComponent();
            component.setPart(componentRequest.getPart());
            component.setQuantity(componentRequest.getQuantity());
            components.add(component);
        }

        // Set the components to the BOM
        bom.setComponents(components);

        // Save the BOM entity
        bomRepository.save(bom);
    }
}
