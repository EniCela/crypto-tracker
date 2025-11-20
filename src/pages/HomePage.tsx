import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
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
  All: null,
};

const HomePage: React.FC = () => {
  const [coinsPages, setCoinsPages] = useState<Record<number, Coin[]>>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const dispatch = useDispatch<AppDispatch>();

  const fetchCryptoData = async (pageNumber: number, filter: string) => {
    try {
      setLoading(true);
      let url = `/coins/markets?vs_currency=usd&per_page=20&page=${pageNumber}`;
      const filterParam = FILTER_API_MAP[filter];
      if (filterParam) {
        url += `&days=${filterParam}`;
      }

      const response = await getApi(url);
      setCoinsPages((prev) => ({ ...prev, [pageNumber]: response }));
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
    setCoinsPages({});
    fetchCryptoData(1, selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    if (!coinsPages[page]) {
      fetchCryptoData(page, selectedFilter);
    }
  }, [page, selectedFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCryptoData(page, selectedFilter);
    }, 10000);

    return () => clearInterval(interval);
  }, [page, selectedFilter]);

  const handleLoadMore = () => setPage((prev) => prev + 1);
  const handleFilterChange = (value: string) => setSelectedFilter(value);
  const coinsData = Object.values(coinsPages).flat();

  return (
    <div>
      <Box
        sx={{
          mt: 12,
        }}
      >
        <ChartFilter selected={selectedFilter} onChange={handleFilterChange} />
      </Box>

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

export default HomePage;
