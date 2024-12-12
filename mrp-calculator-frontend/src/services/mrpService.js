import axiosInstance from "../api/axiosInstance";

const fetchInventory = async () => {
  try {
    const response = await axiosInstance.get("/inventory");
    setInventoryList(response.data);
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

const handleSubmitInventory = async (e) => {
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

const handleDeleteInventory = async (id) => {
  try {
    await axiosInstance.delete(`/inventory/${id}`);
    alert("Inventory deleted successfully!");
    fetchInventory();
  } catch (error) {
    console.error("Error deleting inventory:", error);
    alert("Failed to delete inventory. Please try again.");
  }
};

const handleSubmitBOM = async (e) => {
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

const handleSubmitMRP = async (e) => {
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
