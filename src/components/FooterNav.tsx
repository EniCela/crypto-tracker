import { Box, IconButton } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

const FooterNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 65,
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 -3px 12px rgba(0,0,0,0.1)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 1000,
        gap: 4,
      }}
    >
      {/* Home / Chart */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          color: pathname === "/" ? "primary.main" : "grey.500",
        }}
      >
        <ShowChartIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => navigate("/coins")}
        sx={{
          color: pathname === "/coins" ? "primary.main" : "grey.500",
        }}
      >
        <AccountBalanceWalletIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => navigate("/profile")}
        sx={{
          color: pathname === "/profile" ? "primary.main" : "grey.500",
        }}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default FooterNav;
