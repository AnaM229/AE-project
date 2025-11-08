import React from "react";
import { Container, Typography } from "@mui/material";
import ProductList from "../components/ProductList";

const Dashboard: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🛍️ Products
      </Typography>
      <ProductList />
    </Container>
  );
};

export default Dashboard;
