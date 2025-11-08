import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  currency: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Failed to fetch products"));
  }, []);

  const handleAddToCart = (id: number) => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }} {...({} as any)}>
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.id} {...({} as any)}>
          <Card>
            <CardContent>
              <Typography variant="h6">{p.title}</Typography>
              <Typography>
                {p.price} {p.currency}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In stock: {p.stock}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleAddToCart(p.id)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
