import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import AlertModal from "./modal/AlertModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addToPortfolio, removeFromPortfolio } from "../store/cryptoSlice";
import { Coin } from "../types/CoinType";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CryptoCardProps } from "../types/CryptoCardProps";

const CryptoCard: React.FC<CryptoCardProps> = ({
  id,
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
  const dispatch = useDispatch<AppDispatch>();
  const [actionType, setActionType] = useState<"add" | "remove" | null>(null);

  const portfolioCoins = useSelector(
    (state: RootState) => state.crypto.portfolio
  );
  useEffect(() => {
    console.log("Portfolio Coins:", portfolioCoins);
  }, [portfolioCoins]);

  const coin: Coin = {
    id,
    name,
    symbol,
    image: logo,
    current_price: price,
    market_cap: 0,
    market_cap_rank: 0,
    fully_diluted_valuation: null,
    total_volume: 0,
    high_24h: 0,
    low_24h: 0,
    price_change_24h: 0,
    price_change_percentage_24h: change,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    circulating_supply: 0,
    total_supply: null,
    max_supply: null,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: "",
    atl: 0,
    atl_change_percentage: 0,
    atl_date: "",
    roi: null,
    last_updated: new Date().toISOString(),
  };

  const handleAddCoinRedux = () => {
    dispatch(addToPortfolio(coin));
    setMenuOpen(false);
    setActionType("add");
    setModalOpen(true);
  };

  const handleRemoveCoinRedux = () => {
    dispatch(removeFromPortfolio(coin.id));
    setMenuOpen(false);
    setActionType("remove");
    setModalOpen(true);
  };

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
                onClick={(e) => e.stopPropagation()}
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
                  startIcon={portfolio ? <RemoveIcon /> : <AddIcon />}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    portfolio ? handleRemoveCoinRedux() : handleAddCoinRedux();
                  }}
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
            actionType === "remove"
              ? `${name} Removed from your portfolio!`
              : `${name} Added to your portfolio!`
          }
          onClose={() => {
            setModalOpen(false);
            setActionType(null);
          }}
        />
      )}
    </>
  );
};

export default CryptoCard;
