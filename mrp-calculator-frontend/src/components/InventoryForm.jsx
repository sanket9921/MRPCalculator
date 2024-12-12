import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const InventoryForm = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [part, setPart] = useState("");
  const [onHand, setOnHand] = useState(0);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get("/inventory");
      setInventoryList(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { part, onHand };
      await axiosInstance.post("/inventory", payload);
      alert("Inventory added/updated successfully!");
      fetchInventory();
      setPart("");
      setOnHand(0);
    } catch (error) {
      console.error("Error saving inventory:", error);
      alert("Failed to save inventory. Please try again.");
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/inventory/${id}`);
      alert("Inventory deleted successfully!");
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory:", error);
      alert("Failed to delete inventory. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Manage Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Part Name:</label>
          <input
            type="text"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            placeholder="Enter part name"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>On Hand Quantity:</label>
          <input
            type="number"
            value={onHand}
            onChange={(e) => setOnHand(e.target.value)}
            placeholder="Enter quantity"
            min="0"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#5cb85c", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Add/Update Inventory
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <h3>Inventory List</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Part</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>On Hand</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.part}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.onHand}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: "5px 10px", backgroundColor: "#d9534f", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryForm;
