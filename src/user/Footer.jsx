import React from "react";
import { Box, Toolbar, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { NAV_DOCK_HEIGHT } from "./constant";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: { xs: "none", md: "block" },
        bgcolor: "background.paper",
        width: "100%",
        maxHeight: `${NAV_DOCK_HEIGHT}px`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* Left Side */}
        <Typography variant="body2">
          © {new Date().getFullYear()} OdBites. All rights reserved.
        </Typography>

        {/* Right Side */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <MuiLink
            component={Link}
            to="/privacy-policy"
            underline="hover"
            color="inherit"
          >
            Privacy Policy
          </MuiLink>
          <MuiLink
            component={Link}
            to="/terms-and-conditions"
            underline="hover"
            color="inherit"
          >
            Terms and Conditions
          </MuiLink>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default Footer;
