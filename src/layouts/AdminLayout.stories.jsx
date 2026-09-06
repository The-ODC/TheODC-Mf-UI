import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PeopleIcon from "@mui/icons-material/People";
import { AdminLayout } from ".";

const AdminDashboardMock = () => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Kitchen & Operations Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Live overview of today's incoming orders, revenue, and delivery
        personnel.
      </Typography>
    </Box>

    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {[
        {
          label: "Today's Revenue",
          value: "₹48,250",
          icon: <CurrencyRupeeIcon />,
          color: "primary.main",
        },
        {
          label: "Active Orders",
          value: "34 Orders",
          icon: <FastfoodIcon />,
          color: "warning.main",
        },
        {
          label: "Drivers Dispatched",
          value: "18 Active",
          icon: <LocalShippingIcon />,
          color: "info.main",
        },
        {
          label: "New Customers",
          value: "+128",
          icon: <PeopleIcon />,
          color: "success.main",
        },
      ].map((stat) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    bgcolor: "background.paper",
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Live Order Queue
        </Typography>
        <Stack spacing={1.5}>
          {[
            {
              id: "ORD-9481",
              items: "1x Farmhouse Pizza, 2x Garlic Bread",
              status: "Preparing",
              time: "2 mins ago",
            },
            {
              id: "ORD-9480",
              items: "2x Chicken Dum Biryani, 1x Coke",
              status: "Out for Delivery",
              time: "8 mins ago",
            },
            {
              id: "ORD-9479",
              items: "1x Paneer Tikka Butter Masala",
              status: "Accepted",
              time: "12 mins ago",
            },
          ].map((order) => (
            <Paper
              key={order.id}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {order.id}
                  </Typography>
                  <Chip
                    label={order.status}
                    size="small"
                    color={order.status === "Preparing" ? "warning" : "info"}
                  />
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {order.items}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {order.time}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default {
  title: "Layouts/AdminLayout",
  component: AdminLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
### 📘 AdminLayout
Enterprise shell layout for administrator dashboards, store analytics, and menu management consoles.
        `,
      },
    },
  },
};

export const ProductionDashboard = {
  args: {
    version: "1.0.0",
    openLogoutDialog: () => alert("Logout confirmation prompt triggered"),
    children: <AdminDashboardMock />,
  },
};
