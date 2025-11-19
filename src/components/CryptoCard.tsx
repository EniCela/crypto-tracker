import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import AlertModal from "./AlertModal";

interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change: number;
  onClick?: () => void;
  portfolio?: boolean; 
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  logo,
  price,
  change,
  onClick,
  portfolio = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddCoin = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  const handleRemoveCoin = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          boxShadow: 1,
          cursor: "pointer",
          "&:hover": { boxShadow: 3 },
        }}
        onClick={onClick}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={logo} alt={name} sx={{ width: 40, height: 40, mr: 2 }} />
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {symbol.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              ${price.toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              color={change >= 0 ? "success.main" : "error.main"}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </Typography>
          </Box>

          <Box sx={{ position: "relative" }} ref={menuRef}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            {menuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 1,
                  backgroundColor: "background.paper",
                  p: 1,
                  borderRadius: 1.5,
                  boxShadow: 3,
                  zIndex: 10,
                  minWidth: 140,
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    color: "#fff",
                    background: portfolio
                      ? "linear-gradient(90deg, #ff5f6d 0%, #ffc371 100%)"
                      : "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                    "&:hover": {
                      background: portfolio
                        ? "linear-gradient(90deg, #ffc371 0%, #ff5f6d 100%)"
                        : "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
                    },
                  }}
                  onClick={portfolio ? handleRemoveCoin : handleAddCoin}
                >
                  {portfolio ? "Remove Coin" : "Add Coin"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Modal Alert */}
      {modalOpen && (
        <AlertModal
          message={
            portfolio
              ? `${name} u hoq nga portofoli tuaj!`
              : `${name} u shtua në portofolin tuaj!`
          }
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default CryptoCard;
