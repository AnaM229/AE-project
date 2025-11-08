import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

export interface CartItem {
  id?: number;
  ProductId: number;
  title?: string;
  price?: number;
  quantity: number;
  currency?: string;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: CartState = {
  items: [],
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await api.get("/cart");
  return res.data;
});

// create 
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload: { productId: number; quantity: number }) => {
    const res = await api.post("/cart/add", payload);
    return res.data;
  }
);

// update
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (payload: { id: number; quantity: number }) => {
    const res = await api.put(`/cart/${payload.id}`, { quantity: payload.quantity });
    return res.data;
  }
);

// delete
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id: number) => {
    await api.delete(`/cart/${id}`);
    return id;
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const existing = state.items.find(
          (i) => i.ProductId === action.payload.ProductId
        );
        if (existing) {
          existing.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
