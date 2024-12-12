package com.MRPcalculationSystem.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class BOM {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String product;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bom_id")
    private List<BOMComponent> components;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public List<BOMComponent> getComponents() {
        return components;
    }

    public void setComponents(List<BOMComponent> components) {
        this.components = components;
    }
}
