import React from "react";
import { Box, Button } from "@mui/material";

interface ChartFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

const FILTERS = ["1H", "1D", "1W", "1M", "1Y", "All"];

const ChartFilter: React.FC<ChartFilterProps> = ({ selected, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mx: 2,
      }}
    >
      {FILTERS.map((filter) => (
        <Button
          key={filter}
          variant={selected === filter ? "contained" : "text"}
          size="small"
          onClick={() => onChange(filter)}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            minWidth: "40px",
            px: 1.5,
            fontSize: "13px",
            backgroundColor:
              selected === filter ? "primary.main" : "transparent",
            color: selected === filter ? "#fff" : "text.secondary",
          }}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
};

export default ChartFilter;
