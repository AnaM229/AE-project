import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../api/axiosInstance";

interface ProductFormProps {
  refreshProducts?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ refreshProducts }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [currency, setCurrency] = useState("RON");

  const handleSubmit = async () => {
    try {
      await api.post("/products", {
        title,
        price: Number(price),
        stock: Number(stock),
        currency,
      });
      alert("Product created!");
      setTitle("");
      setPrice("");
      setStock("");
      refreshProducts?.();
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Add Product</Typography>
      <TextField
        label="Title"
        value={title}
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Price"
        value={price}
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Stock"
        value={stock}
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setStock(e.target.value)}
      />
      <TextField
        label="Currency"
        value={currency}
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
};

export default ProductForm;
