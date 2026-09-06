import React from "react";
import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const statusMapping = {
  // User & Admin Statuses
  active: { label: "Active", color: "success" },
  blocked: { label: "Blocked", color: "error" },
  pending: { label: "Pending", color: "warning" },

  // Product Statuses
  inactive: { label: "Inactive", color: "default" },
  outofstock: { label: "Out Of Stock", color: "error" },

  // Order Statuses
  ordered: { label: "Ordered", color: "info" },
  accepted: { label: "Accepted", color: "primary" },
  preparing: { label: "Preparing", color: "warning" },
  outfordelivery: { label: "Out For Delivery", color: "secondary" },
  delivered: { label: "Delivered", color: "success" },
  returned: { label: "Returned", color: "error" },
  cancelled: { label: "Cancelled", color: "error" },

  // Payment Statuses
  success: { label: "Success", color: "success" },
  failed: { label: "Failed", color: "error" },
  refunded: { label: "Refunded", color: "default" },

  // Inquiry Statuses
  new: { label: "New", color: "error" },
  contacted: { label: "Contacted", color: "warning" },
  resolved: { label: "Resolved", color: "success" },
};

function StatusChip({ status, variant = "contained", size = "small" }) {
  // Normalize key to lowercase and strip non-alphabetic chars for absolute resilience
  const normalizedKey = String(status || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  const match = statusMapping[normalizedKey] || {
    label: status || "N/A",
    color: "default",
  };

  return (
    <Chip
      label={match.label}
      color={match.color}
      variant={variant}
      size={size}
    />
  );
}

StatusChip.propTypes = {
  status: PropTypes.string,
  variant: PropTypes.oneOf(["contained", "outlined"]),
  size: PropTypes.oneOf(["small", "medium"]),
};

export default StatusChip;
