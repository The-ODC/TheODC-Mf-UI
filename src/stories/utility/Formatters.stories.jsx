import { Box, Typography } from "@mui/material";
import {
  formatCurrency,
  formatDateTime,
  readableLabel,
  formatAddress,
} from "../../utility/formatters";

const Demo = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 680 }}>
      <Typography variant="h5" gutterBottom>
        Formatter Utilities
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Examples for currency, date/time, label normalization and address
        formatting.
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2">Currency</Typography>
        <Typography
          component="pre"
          sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}
        >
          {formatCurrency(1234.56, { locale: "en-US", currency: "USD" })}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2">DateTime</Typography>
        <Typography
          component="pre"
          sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}
        >
          {formatDateTime("2026-07-19T14:30:00Z", { locale: "en-GB" })}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2">Readable Label</Typography>
        <Typography
          component="pre"
          sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}
        >
          {readableLabel("orderTotalAmount")}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2">Address</Typography>
        <Typography
          component="pre"
          sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}
        >
          {formatAddress({
            line1: "123 Main St",
            city: "Mumbai",
            state: "MH",
            postalCode: "400001",
            country: "India",
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default {
  title: "Utility/Formatters",
  component: Demo,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Demo />,
};
