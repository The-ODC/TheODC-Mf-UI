import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import { UserLayout } from ".";

const CustomerMenuMock = () => (
  <Box sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
        Chef's Curated Specialties
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Order delicious, freshly cooked meals delivered hot to your doorstep in
        30 minutes.
      </Typography>
    </Box>

    <Grid container spacing={3}>
      {[
        {
          name: "Paneer Butter Masala Combo",
          price: "₹349",
          rating: "4.8",
          cuisine: "North Indian",
          desc: "Creamy paneer cubes simmered in spiced tomato butter gravy, served with 2 butter naan & jeera rice.",
        },
        {
          name: "Hyderabadi Chicken Dum Biryani",
          price: "₹399",
          rating: "4.9",
          cuisine: "Biryani Special",
          desc: "Slow-cooked aromatic basmati rice infused with fragrant saffron, mint, and marinated tender chicken.",
        },
        {
          name: "Woodfired Truffle Mushroom Pizza",
          price: "₹499",
          rating: "4.7",
          cuisine: "Italian Gourmet",
          desc: "Hand-stretched sourdough base, wild mushrooms, fresh mozzarella, and aromatic truffle oil glaze.",
        },
      ].map((dish) => (
        <Grid size={{ xs: 12, md: 4 }} key={dish.name}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Chip
                  label={dish.cuisine}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <StarIcon sx={{ color: "warning.main", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {dish.rating}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 1, mb: 0.5 }}>
                {dish.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {dish.desc}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  color="primary.main"
                  sx={{ fontWeight: 800 }}
                >
                  {dish.price}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddShoppingCartIcon />}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default {
  title: "Layouts/UserLayout",
  component: UserLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
### 📘 UserLayout
Full-width responsive layout for user-facing applications with navigation bars, search docks, and footers.
        `,
      },
    },
  },
};

export const ProductionFoodMenu = {
  args: {
    version: "1.0.0",
    children: <CustomerMenuMock />,
  },
};
