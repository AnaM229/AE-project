import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import { Container } from "@mui/material";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? children : <Navigate to="/login" replace />;
};

const NotFound = () => (
  <Container sx={{ mt: 8, textAlign: "center" }}>
    <h2>404 - Page not found</h2>
  </Container>
);

const AppContent = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};

// === Wrapping cu Provider și BrowserRouter ===
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
