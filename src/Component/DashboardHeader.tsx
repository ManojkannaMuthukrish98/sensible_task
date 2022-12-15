import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, cursor: "pointer" }}>
      <AppBar position="static" sx={{ background: "#E3CD81FF" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            SENSIBULL STOCKS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardHeader;
