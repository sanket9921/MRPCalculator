package com.MRPcalculationSystem.dto;

import java.util.List;

public class BOMRequest {
    private String product;
    private List<BOMComponentRequest> components;

    // Getters and Setters
    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public List<BOMComponentRequest> getComponents() {
        return components;
    }

    public void setComponents(List<BOMComponentRequest> components) {
        this.components = components;
    }

    public static class BOMComponentRequest {
        private String part;
        private int quantity;

        // Getters and Setters
        public String getPart() {
            return part;
        }

        public void setPart(String part) {
            this.part = part;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
