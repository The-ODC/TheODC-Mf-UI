import React from "react";
import { Button, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import NoData from "./NoData";

export default {
  title: "Helpers/NoData",
  component: NoData,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📭 NoData Empty State
A reusable component to show a friendly, polished empty state UI with an SVG illustration, title, description, and optional Call-to-Action buttons.

#### 📦 Import
\`\`\`js
import { NoData } from "TheOdcMfUI/helpers";
\`\`\`
        `,
      },
    },
  },
};

export const EmptySearch = {
  args: {
    title: "No Cuisines Found",
    description:
      "We couldn't find any dishes matching your dietary and price filters. Try resetting your search.",
    children: (
      <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ mt: 2 }}>
        Reset All Filters
      </Button>
    ),
  },
};

export const EmptyCart = {
  args: {
    title: "Your Cart is Empty",
    description:
      "Looks like you haven't added any mouth-watering dishes to your cart yet.",
    children: (
      <Button
        variant="contained"
        startIcon={<RestaurantMenuIcon />}
        sx={{ mt: 2 }}
      >
        Explore Today's Specials
      </Button>
    ),
  },
};

export const NoOrders = {
  args: {
    title: "No Orders Placed Yet",
    description:
      "Once you place an order, live tracking details and receipt summaries will appear here.",
  },
};
