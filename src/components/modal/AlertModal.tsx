// AlertModal is a reusable modal component that displays a message overlaying the screen.
// Use it for alerting users when click add or remove actions are performed.

import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 3,
          boxShadow: 5,
          minWidth: 300,
          maxWidth: 400,
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {message}
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
            },
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default AlertModal;
