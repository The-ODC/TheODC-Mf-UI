import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import StatusChip from "./index";

export default {
  title: "Components/StatusChip",
  component: StatusChip,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: [
        "active",
        "blocked",
        "pending",
        "inactive",
        "outofstock",
        "ordered",
        "accepted",
        "preparing",
        "outfordelivery",
        "delivered",
        "returned",
        "cancelled",
        "success",
        "failed",
        "refunded",
        "new",
        "contacted",
        "resolved",
      ],
    },
    variant: {
      control: "radio",
      options: ["contained", "outlined"],
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
    },
  },
};

export const Default = {
  args: {
    status: "active",
    variant: "contained",
    size: "small",
  },
};

export const Outlined = {
  args: {
    status: "delivered",
    variant: "outlined",
    size: "small",
  },
};

export const AllStatuses = {
  render: () => {
    const categories = [
      {
        title: "User & Admin Statuses",
        statuses: ["active", "blocked", "pending"],
      },
      {
        title: "Product Statuses",
        statuses: ["inactive", "outofstock"],
      },
      {
        title: "Order Statuses",
        statuses: [
          "ordered",
          "accepted",
          "preparing",
          "outfordelivery",
          "delivered",
          "returned",
          "cancelled",
        ],
      },
      {
        title: "Payment Statuses",
        statuses: ["success", "failed", "refunded"],
      },
      {
        title: "Inquiry Statuses",
        statuses: ["new", "contacted", "resolved"],
      },
    ];

    return (
      <Stack spacing={4}>
        {categories.map((cat) => (
          <Box key={cat.title}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {cat.title}
            </Typography>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {cat.statuses.map((st) => (
                <StatusChip key={st} status={st} />
              ))}
            </Stack>
            <Stack
              direction="row"
              spacing={1.5}
              flexWrap="wrap"
              useFlexGap
              sx={{ mt: 1.5 }}
            >
              {cat.statuses.map((st) => (
                <StatusChip key={st} status={st} variant="outlined" />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  },
};
