import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  readableLabel,
  formatAddress,
  getInitials,
  getRecordId,
} from "../../utility/formatters";

// Interactive Live Playground Component
const InteractivePlayground = () => {
  const [currencyAmount, setCurrencyAmount] = useState(1499.99);
  const [currencyCode, setCurrencyCode] = useState("INR");
  const [currencyLocale, setCurrencyLocale] = useState("en-IN");

  const [dateVal, setDateVal] = useState("2026-09-06T14:30:00Z");
  const [dateLocale, setDateLocale] = useState("en-IN");

  const [labelInput, setLabelInput] = useState("totalDiscountAmount");
  const [nameInput, setNameInput] = useState("Rahul Sharma");
  const [mongoIdInput, setMongoIdInput] = useState("64f8a12bc9e1a84f321d89e5");

  const [address, setAddress] = useState({
    line1: "Flat 402, Sunshine Towers",
    line2: "Linking Road",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    country: "India",
  });

  return (
    <Box sx={{ maxWidth: 1000, p: 2 }}>
      {/* Header Banner */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Formatters & Data Normalizers
          </Typography>
          <Chip
            label="Utility"
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Enterprise-grade utility functions for formatting currency,
          timestamps, human-readable labels, addresses, initials, and IDs.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 1. Currency Formatter Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, height: "100%", boxShadow: 1 }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  💰 Currency Formatter
                </Typography>
                <Chip
                  label="formatCurrency()"
                  size="small"
                  variant="outlined"
                />
              </Stack>

              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Amount"
                  type="number"
                  size="small"
                  fullWidth
                  value={currencyAmount}
                  onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                />
                <Stack direction="row" spacing={1}>
                  <TextField
                    select
                    label="Currency"
                    size="small"
                    fullWidth
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                  >
                    <MenuItem value="INR">INR (₹)</MenuItem>
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Locale"
                    size="small"
                    fullWidth
                    value={currencyLocale}
                    onChange={(e) => setCurrencyLocale(e.target.value)}
                  >
                    <MenuItem value="en-IN">en-IN</MenuItem>
                    <MenuItem value="en-US">en-US</MenuItem>
                    <MenuItem value="en-GB">en-GB</MenuItem>
                    <MenuItem value="de-DE">de-DE</MenuItem>
                  </TextField>
                </Stack>
              </Stack>

              <Paper
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: 1.5,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Formatted Output:
                </Typography>
                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{ fontWeight: 700, mt: 0.5 }}
                >
                  {formatCurrency(currencyAmount, {
                    currency: currencyCode,
                    locale: currencyLocale,
                  })}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Date & Time Formatter Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, height: "100%", boxShadow: 1 }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📅 Date & Time Formatter
                </Typography>
                <Chip
                  label="formatDate() / formatTime()"
                  size="small"
                  variant="outlined"
                />
              </Stack>

              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="ISO Timestamp"
                  size="small"
                  fullWidth
                  value={dateVal}
                  onChange={(e) => setDateVal(e.target.value)}
                />
                <TextField
                  select
                  label="Locale"
                  size="small"
                  fullWidth
                  value={dateLocale}
                  onChange={(e) => setDateLocale(e.target.value)}
                >
                  <MenuItem value="en-IN">en-IN (India)</MenuItem>
                  <MenuItem value="en-US">en-US (US)</MenuItem>
                  <MenuItem value="en-GB">en-GB (UK)</MenuItem>
                </TextField>
              </Stack>

              <Paper
                sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1.5 }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      formatDate():
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatDate(dateVal, { locale: dateLocale })}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      formatTime():
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatTime(dateVal, { locale: dateLocale })}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 0.5 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="primary">
                      formatDateTime():
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{ fontWeight: 700 }}
                    >
                      {formatDateTime(dateVal, { locale: dateLocale })}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Readable Label & Initials Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, height: "100%", boxShadow: 1 }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  🔤 Labels, Initials & ID
                </Typography>
                <Chip
                  label="readableLabel() / getInitials()"
                  size="small"
                  variant="outlined"
                />
              </Stack>

              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="CamelCase / snake_case Key"
                  size="small"
                  fullWidth
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  helperText={`readableLabel("${labelInput}") → "${readableLabel(labelInput)}"`}
                />
                <TextField
                  label="Full Name (for Avatar initials)"
                  size="small"
                  fullWidth
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  helperText={`getInitials("${nameInput}") → "${getInitials(nameInput)}"`}
                />
                <TextField
                  label="MongoDB ObjectId / UUID"
                  size="small"
                  fullWidth
                  value={mongoIdInput}
                  onChange={(e) => setMongoIdInput(e.target.value)}
                  helperText={`getRecordId() (short form) → "${getRecordId(mongoIdInput)}"`}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 4. Address Formatter Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, height: "100%", boxShadow: 1 }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📍 Address Normalizer
                </Typography>
                <Chip label="formatAddress()" size="small" variant="outlined" />
              </Stack>

              <Stack spacing={1.5} sx={{ mb: 2 }}>
                <TextField
                  label="Street Address (Line 1)"
                  size="small"
                  fullWidth
                  value={address.line1}
                  onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                  }
                />
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="City"
                    size="small"
                    fullWidth
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                  <TextField
                    label="State"
                    size="small"
                    fullWidth
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                  />
                  <TextField
                    label="Postal Code"
                    size="small"
                    fullWidth
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                  />
                </Stack>
              </Stack>

              <Paper
                sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1.5 }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Formatted Multi-line Address:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mt: 0.5, whiteSpace: "pre-line" }}
                >
                  {formatAddress(address)}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default {
  title: "Utility/Formatters",
  component: InteractivePlayground,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🛠️ The ODC Formatter Utilities
A complete suite of pure utility functions for consistently formatting currencies, dates, times, initials, addresses, and model keys across all micro-frontends.

#### 📦 Import
\`\`\`js
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  readableLabel,
  formatAddress,
  getInitials,
  getRecordId,
  getActivePrice,
} from "TheOdcMfUI/utility/formatters";
\`\`\`
        `,
      },
    },
  },
};

export const LivePlayground = {
  render: () => <InteractivePlayground />,
  parameters: {
    docs: {
      source: {
        code: `import {
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  readableLabel,
  formatAddress,
  getInitials,
} from "TheOdcMfUI/utility/formatters";

// 1. Currency
formatCurrency(1499.99, { currency: "INR", locale: "en-IN" }); // "₹1,499.99"

// 2. Date & Time
formatDateTime("2026-09-06T14:30:00Z", { locale: "en-IN" }); // "6 Sept 2026, 8:00 pm"
formatDate("2026-09-06T14:30:00Z"); // "6 Sept 2026"
formatTime("2026-09-06T14:30:00Z"); // "8:00 pm"

// 3. Readable Labels & Initials
readableLabel("totalDiscountAmount"); // "Total Discount Amount"
getInitials("Rahul Sharma"); // "RS"

// 4. Address Normalization
formatAddress({
  line1: "Flat 402, Sunshine Towers",
  city: "Mumbai",
  state: "Maharashtra",
  postalCode: "400050",
  country: "India",
});`,
      },
    },
  },
};

export const CurrencyExamples = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 500, p: 2 }}>
      <Typography variant="h6">Currency Formats</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>INR:</strong>{" "}
            {formatCurrency(2499.5, { currency: "INR", locale: "en-IN" })}
          </Typography>
          <Typography variant="body2">
            <strong>USD:</strong>{" "}
            {formatCurrency(99.99, { currency: "USD", locale: "en-US" })}
          </Typography>
          <Typography variant="body2">
            <strong>EUR:</strong>{" "}
            {formatCurrency(79.0, { currency: "EUR", locale: "de-DE" })}
          </Typography>
          <Typography variant="body2">
            <strong>GBP:</strong>{" "}
            {formatCurrency(120.5, { currency: "GBP", locale: "en-GB" })}
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  ),
};
