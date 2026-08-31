import React from "react";
import {
  ContactSupportRounded,
  HomeRounded,
  RestaurantMenuRounded,
  SettingsOutlined,
  ShoppingBagOutlined,
  StorefrontRounded,
  SupportAgentRounded,
} from "@mui/icons-material";

export const NAV_DOCK_HEIGHT = 64;

export const navItems = [
  {
    label: "Home",
    path: "/",
    icon: <HomeRounded />,
  },
  {
    label: "Our Menu",
    path: "/our-menu",
    icon: <RestaurantMenuRounded />,
  },
  {
    label: "About Us",
    path: "/about-us",
    icon: <StorefrontRounded />,
  },
  {
    label: "Contact Us",
    path: "/contact-us",
    icon: <SupportAgentRounded />,
  },
];

export const mobileNavItems = [
  ...navItems.slice(0, 3),
  {
    label: "My Orders",
    path: "/my-orders",
    icon: <ShoppingBagOutlined />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <SettingsOutlined />,
    child: [
      {
        label: "Edit Profile",
        path: "/settings/edit-profile",
      },
      { label: "Change Password", path: "/settings/change-password" },
      { label: "Manage Addresses", path: "/settings/manage-addresses" },
    ],
  },
  {
    label: "Contact Us",
    path: "/contact-us",
    icon: <ContactSupportRounded />,
  },
];
