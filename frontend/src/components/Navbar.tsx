import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, role, token } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          AE Shop
        </Typography>

        <div>
          {token ? (
            <>
              {role === "admin" && (
                <Button color="inherit" onClick={() => navigate("/admin")}>
                  Admin Panel
                </Button>
              )}
              <Button color="inherit" onClick={() => navigate("/cart")}>
                Cart
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout ({email})
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
