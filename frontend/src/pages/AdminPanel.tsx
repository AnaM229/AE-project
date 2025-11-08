import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ProductForm from "../components/ProductForm";
import api from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  currency: string;
}

const AdminPanel: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const handleEditSave = async () => {
    if (!editProduct) return;
    try {
      await api.put(`/products/${editProduct.id}`, {
        title: editProduct.title,
        price: editProduct.price,
        stock: editProduct.stock,
        currency: editProduct.currency,
      });
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (role !== "admin") {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Access denied — Admins only
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🛠️ Admin Panel
      </Typography>

      {/* Formular pentru creare produs */}
      <ProductForm refreshProducts={fetchProducts} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Existing Products</Typography>
        {products.length === 0 ? (
          <Typography>No products found.</Typography>
        ) : (
          products.map((p) => (
            <Box
              key={p.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                py: 1,
              }}
            >
              <Typography>
                {p.title} — {p.price} {p.currency} (Stock: {p.stock})
              </Typography>
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => setEditProduct(p)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Modal pentru editare produs */}
      <Dialog open={!!editProduct} onClose={() => setEditProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={editProduct?.title || ""}
            onChange={(e) =>
              setEditProduct((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
              )
            }
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct((prev) =>
                prev ? { ...prev, price: Number(e.target.value) } : prev
              )
            }
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={editProduct?.stock || ""}
            onChange={(e) =>
              setEditProduct((prev) =>
                prev ? { ...prev, stock: Number(e.target.value) } : prev
              )
            }
          />
          <TextField
            margin="dense"
            label="Currency"
            fullWidth
            value={editProduct?.currency || ""}
            onChange={(e) =>
              setEditProduct((prev) =>
                prev ? { ...prev, currency: e.target.value } : prev
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProduct(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;
