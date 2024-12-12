import React, { useState } from "react";
import axios from "axios";

const BOMForm = () => {
  const [productName, setProductName] = useState("");
  const [components, setComponents] = useState([{ part: "", quantity: 0 }]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleComponentChange = (index, field, value) => {
    const updatedComponents = [...components];
    updatedComponents[index][field] = value;
    setComponents(updatedComponents);
  };

  const addComponent = () => {
    setComponents([...components, { part: "", quantity: 0 }]);
  };

  const removeComponent = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      product: productName,
      components: components,
    };
  
    try {
      await axiosInstance.post("/bom", payload);
      alert("BOM saved successfully!");
    } catch (error) {
      console.error("Error saving BOM:", error);
      alert("Failed to save BOM. Please try again.");
    }
  };
  

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Bill of Materials (BOM) Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleProductNameChange}
            placeholder="Enter product name"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div>
          <h3>Components:</h3>
          {components.map((component, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                value={component.part}
                onChange={(e) => handleComponentChange(index, "part", e.target.value)}
                placeholder="Component Name"
                required
                style={{
                  flex: 2,
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <input
                type="number"
                value={component.quantity}
                onChange={(e) => handleComponentChange(index, "quantity", e.target.value)}
                placeholder="Quantity"
                min="0"
                required
                style={{
                  flex: 1,
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <button
                type="button"
                onClick={() => removeComponent(index)}
                style={{
                  flex: "none",
                  padding: "8px 12px",
                  border: "none",
                  backgroundColor: "#d9534f",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addComponent}
            style={{
              display: "block",
              marginTop: "10px",
              padding: "8px 15px",
              border: "none",
              backgroundColor: "#5bc0de",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Component
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#5cb85c",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit BOM
        </button>
      </form>
    </div>
  );
};

export default BOMForm;
