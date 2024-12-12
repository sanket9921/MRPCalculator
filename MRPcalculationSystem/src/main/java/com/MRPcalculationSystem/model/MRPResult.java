package com.MRPcalculationSystem.model;

public class MRPResult {
    private String part;
    private int requiredQuantity;
    private int onHand;
    private int toProcure;

    public String getPart() {
        return part;
    }

    public void setPart(String part) {
        this.part = part;
    }

    public int getRequiredQuantity() {
        return requiredQuantity;
    }

    public void setRequiredQuantity(int requiredQuantity) {
        this.requiredQuantity = requiredQuantity;
    }

    public int getOnHand() {
        return onHand;
    }

    public void setOnHand(int onHand) {
        this.onHand = onHand;
    }

    public int getToProcure() {
        return toProcure;
    }

    public void setToProcure(int toProcure) {
        this.toProcure = toProcure;
    }
}
