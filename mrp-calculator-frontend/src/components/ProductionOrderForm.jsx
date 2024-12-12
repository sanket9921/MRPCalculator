import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const ProductionOrderForm = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [results, setResults] = useState(null);
  const [productList, setProductList] = useState([]);

  // Fetch product list (Replace the URL with your API endpoint if dynamic fetching is needed)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProductList(response.data); // Assuming API returns an array of product names
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/mrp/calculate", null, {
        params: { product, quantity },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error calculating MRP:", error);
      alert("Failed to calculate MRP. Please check your inputs.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>MRP Calculation</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Product:</label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="" disabled>
              Select a product
            </option>
            {productList.map((prod, index) => (
              <option key={index} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
            min="1"
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#5cb85c", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Calculate MRP
        </button>
      </form>
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h3>Net Requirements</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Part</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Required Quantity</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>On Hand</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>To Be Procured</th>
              </tr>
            </thead>
            <tbody>
              {results.netRequirements.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.part}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.requiredQuantity}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.onHand}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.toBeProcured}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Planned Orders</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Part</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Order Quantity</th>
              </tr>
            </thead>
            <tbody>
              {results.plannedOrders.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.part}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.orderQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductionOrderForm;
