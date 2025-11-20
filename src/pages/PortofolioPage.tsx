import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import Header from "../components/HeaderPage";
import CryptoList from "../components/CryptoList";
import ChartFilter from "../components/ChartFilter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getApi } from "../services/getApi";
import { setCoins } from "../store/cryptoSlice";
import { Coin } from "../types/CoinType";

const FILTER_API_MAP: Record<string, string | null> = {
  "1H": "1h",
  "1D": "1",
  "1W": "7",
  "1M": "30",
  "1Y": "365",
  "All": null,
};

const PortofolioPage: React.FC = () => {
  const [coinsData, setCoinsData] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const dispatch = useDispatch<AppDispatch>();

  const fetchCryptoData = async (pageNumber: number, filter: string) => {
    try {
      setLoading(true);
      let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${pageNumber}`;
      
      const filterParam = FILTER_API_MAP[filter];
      if (filterParam) {
        url += `&days=${filterParam}`;
      }

      const response = await getApi(url);
      if (pageNumber === 1) {
        setCoinsData(response);
      } else {
        setCoinsData((prev) => [...prev, ...response]);
      }
      dispatch(setCoins(response));

      if (response.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchCryptoData(1, selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    if (page > 1) {
      fetchCryptoData(page, selectedFilter);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <div>
      <Header title="OverView of Situation" count={"152 345 2345 "} />

      <ChartFilter selected={selectedFilter} onChange={handleFilterChange} />

      <Box sx={{ mt: 2 }}>
        <CryptoList coins={coinsData} portfolio={false} />
      </Box>

      {/* Load More button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          mb: 5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: "none",
            background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
            },
          }}
          onClick={handleLoadMore}
          disabled={loading || !hasMore}
        >
          {loading ? "Loading..." : hasMore ? "Load More" : "No more coins"}
        </Button>
        {!hasMore && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            You have reached the end of the list.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default PortofolioPage;

