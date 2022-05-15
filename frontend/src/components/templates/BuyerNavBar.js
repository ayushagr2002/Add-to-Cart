import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const VendorNavBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/BuyerDashboard")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/BuyerDashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/BuyerProfile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/BuyerOrder")}>
            Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/BuyerFavorites")}>
              Favorites
          </Button>
          <Button color="inherit" onClick={() => navigate("/logout")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default VendorNavBar;
