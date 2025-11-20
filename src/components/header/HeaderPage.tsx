/**
 * Header is a reusable top section component that displays a title and an optional count value.
 * It uses MUI's AppBar without shadow for a clean look and can show a numeric value (e.g., portfolio total).
 */

import React from "react";
import { AppBar, Typography, Box } from "@mui/material";

interface HeaderProps {
  title: string;
  count?: string | number;
}

const Header: React.FC<HeaderProps> = ({ title, count }) => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        padding: "10px 0",
        boxShadow: "none",
        color: "black",
      }}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, paddingLeft: "6px 14px", color: "#5E626F" }}
        >
          {title}
        </Typography>

        {count !== undefined && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {count} USD
            </Typography>
          </Box>
        )}
      </Box>
    </AppBar>
  );
};

export default Header;
