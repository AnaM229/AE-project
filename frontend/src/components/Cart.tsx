import React, { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Button
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../store/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (id: number, currentQty: number) => {
    dispatch(updateCartItem({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id: number, currentQty: number) => {
    if (currentQty > 1) dispatch(updateCartItem({ id, quantity: currentQty - 1 }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🛒 My Cart
      </Typography>

      {status === "loading" ? (
        <Typography>Loading...</Typography>
      ) : items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDecrease(item.id!, item.quantity)}>
                      <Remove />
                    </IconButton>
                    {item.quantity}
                    <IconButton onClick={() => handleIncrease(item.id!, item.quantity)}>
                      <Add />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {item.price?.toFixed(2)} {item.currency || "RON"}
                  </TableCell>
                  <TableCell align="center">
                    {(item.price! * item.quantity).toFixed(2)} {item.currency || "RON"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleRemove(item.id!)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {items.length > 0 && (
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Typography variant="h6">Total: {total.toFixed(2)} RON</Typography>
          <Button variant="outlined" color="error" sx={{ mt: 1 }} onClick={handleClear}>
            Clear Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
