import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderApp: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 70,
        bgcolor: "white",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        boxShadow: "0 3px 10px rgba(122, 121, 121, 0.1)",
        zIndex: 1100,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Crypto Tracker
      </Typography>
    </Box>
  );
};

export default HeaderApp;
