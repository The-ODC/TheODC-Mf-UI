import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccessTime,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";

import { DARK_LOGO, LIGHT_LOGO } from "../assets";

function Footer({ isAuthenticated = false }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDark ? "#161311" : "#FAF5EE",
        color: "text.primary",
        borderTop: "1px solid",
        borderColor: isDark
          ? "rgba(255,255,255,0.06)"
          : "rgba(140, 74, 39, 0.12)",
        pt: { xs: 6, md: 8 },
        pb: { xs: 10, md: 4 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          justifyContent="space-between"
        >
          {/* Column 1: Brand & Social */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Stack spacing={2.5}>
              <Box
                component="img"
                src={isDark ? DARK_LOGO : LIGHT_LOGO}
                alt="The ODC Logo"
                sx={{
                  width: "auto",
                  maxHeight: { xs: 54, sm: 66, md: 74 },
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 340, lineHeight: 1.7 }}
              >
                Celebrating the authentic culinary heritage of Odisha.
                Handcrafted traditional Pithas, slow-baked Poda Pitha, and
                artisanal organic coffee from the heights of Koraput.
              </Typography>

              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(140, 74, 39, 0.08)",
                    color: "#16A34A",
                    "&:hover": { bgcolor: "rgba(22, 163, 74, 0.15)" },
                  }}
                >
                  <WhatsApp fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(140, 74, 39, 0.08)",
                    color: "#E11D48",
                    "&:hover": { bgcolor: "rgba(225, 29, 72, 0.15)" },
                  }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(140, 74, 39, 0.08)",
                    color: "#2563EB",
                    "&:hover": { bgcolor: "rgba(37, 99, 235, 0.15)" },
                  }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(140, 74, 39, 0.08)",
                    color: isDark ? "#CBD5E1" : "#475569",
                    "&:hover": { bgcolor: "rgba(71, 85, 105, 0.15)" },
                  }}
                >
                  <Twitter fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Column 2: Navigation Links */}
          <Grid size={{ xs: 6, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight={800} gutterBottom>
              Explore
            </Typography>
            <Stack spacing={1.5} alignItems="flex-start">
              {[
                { label: "Home", path: "/" },
                { label: "Our Menu", path: "/our-menu" },
                { label: "About Us", path: "/about-us" },
                { label: "Contact Us", path: "/contact-us" },
              ].map((item) => (
                <MuiLink
                  key={item.label}
                  component={Link}
                  to={item.path}
                  underline="none"
                  sx={{
                    width: "fit-content",
                    display: "inline-block",
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Legal & Support */}
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" fontWeight={800} gutterBottom>
              Support & Legal
            </Typography>
            <Stack spacing={1.5} alignItems="flex-start">
              {[
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Terms & Conditions", path: "/terms-and-conditions" },
                { label: "FAQ & Support", path: "/faq-support" },
                ...(isAuthenticated
                  ? [{ label: "My Orders", path: "/my-orders" }]
                  : [{ label: "Sign In / Register", path: "/sign-in" }]),
              ].map((item) => (
                <MuiLink
                  key={item.label}
                  component={Link}
                  to={item.path}
                  underline="none"
                  sx={{
                    width: "fit-content",
                    display: "inline-block",
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Hours & Outlets */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" fontWeight={800} gutterBottom>
              Hours & Takeaway
            </Typography>
            <Stack spacing={1.8}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <AccessTime
                  sx={{ fontSize: 20, color: "primary.main", mt: 0.2 }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={700}>
                    Mon – Sun: 8:00 AM – 10:30 PM
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Live Kitchen & Quick Takeaway
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <LocationOn
                  sx={{ fontSize: 20, color: "primary.main", mt: 0.2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Bhubaneswar & Cuttack, Odisha
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Phone sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography variant="body2" fontWeight={700}>
                  +91 98765 43210
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
          }}
        />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} The ODC. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Handcrafted with authentic Odia craft & Koraput brews ☕
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Footer;
