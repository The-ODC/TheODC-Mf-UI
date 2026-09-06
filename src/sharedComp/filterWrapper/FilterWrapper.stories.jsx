import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import FilterWrapper from "./index";

const FilterContentDemo = () => {
  const [priceRange, setPriceRange] = useState([100, 800]);
  const [rating, setRating] = useState("4+");
  const [dietary, setDietary] = useState({
    veg: true,
    nonVeg: true,
    vegan: false,
  });

  return (
    <Box sx={{ p: 2, minWidth: 280, maxWidth: 340 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Filter Menu Items
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2.5}>
        {/* Price Slider */}
        <Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: "text.secondary" }}
          >
            Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, val) => setPriceRange(val)}
            valueLabelDisplay="auto"
            min={50}
            max={1500}
            step={50}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Dietary Preference */}
        <FormControl component="fieldset" size="small">
          <FormLabel
            component="legend"
            sx={{ fontSize: "0.75rem", fontWeight: 600 }}
          >
            Dietary Preference
          </FormLabel>
          <FormGroup row sx={{ mt: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={dietary.veg}
                  onChange={(e) =>
                    setDietary({ ...dietary, veg: e.target.checked })
                  }
                />
              }
              label={<Typography variant="body2">Veg</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={dietary.nonVeg}
                  onChange={(e) =>
                    setDietary({ ...dietary, nonVeg: e.target.checked })
                  }
                />
              }
              label={<Typography variant="body2">Non-Veg</Typography>}
            />
          </FormGroup>
        </FormControl>

        {/* Rating Filter */}
        <FormControl size="small">
          <FormLabel sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
            Min Rating
          </FormLabel>
          <RadioGroup
            row
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <FormControlLabel
              value="3+"
              control={<Radio size="small" />}
              label={<Typography variant="body2">3.0+</Typography>}
            />
            <FormControlLabel
              value="4+"
              control={<Radio size="small" />}
              label={<Typography variant="body2">4.0+</Typography>}
            />
            <FormControlLabel
              value="4.5+"
              control={<Radio size="small" />}
              label={<Typography variant="body2">4.5+</Typography>}
            />
          </RadioGroup>
        </FormControl>

        <Divider />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button size="small" variant="text" color="inherit">
            Reset
          </Button>
          <Button size="small" variant="contained">
            Apply Filters
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default {
  title: "SharedComponents/FilterWrapper",
  component: FilterWrapper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🧩 FilterWrapper
A clean, responsive popover filter trigger button designed for data tables, catalog filters, and admin grids.

#### 📦 Import
\`\`\`js
import { FilterWrapper } from "TheOdcMfUI/sharedComp";
\`\`\`
        `,
      },
    },
  },
};

export const ProductionExample = {
  args: {
    btnName: "Filter Menu",
    children: <FilterContentDemo />,
  },
};
