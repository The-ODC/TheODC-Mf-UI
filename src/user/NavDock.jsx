import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Box,
  Typography,
  IconButton,
  Collapse,
  styled,
} from "@mui/material";
import {
  Close,
  DescriptionOutlined,
  ExpandMore,
  HelpOutlineRounded,
  LocationOnOutlined,
  LockResetRounded,
  PersonOutlineRounded,
  PolicyOutlined,
  ShoppingBagOutlined,
  SupportAgentRounded,
  TuneRounded,
  WidgetsRounded,
} from "@mui/icons-material";
import { mobileNavItems, NAV_DOCK_HEIGHT } from "./constant";

// Rotate icon with transition
const ExpandMoreIcon = styled(ExpandMore)(({ theme, expand }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function NavDock({ isAuthenticated = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const activeValue = mobileNavItems
    .slice(0, 3)
    .some((item) => item.path === location.pathname)
    ? location.pathname
    : open
      ? "More"
      : false;

  const handleChange = (event, newValue) => {
    if (newValue === "More") {
      setOpen(true);
    } else {
      navigate(newValue);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <>
      {/* Bottom Navigation */}
      <BottomNavigation
        value={activeValue}
        onChange={handleChange}
        sx={{
          display: { md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          maxHeight: `${NAV_DOCK_HEIGHT}px`,
          zIndex: 1200,
        }}
      >
        {mobileNavItems.slice(0, 3).map((item, index) => (
          <BottomNavigationAction
            key={index + 1}
            label={item.label}
            value={item.path}
            icon={item.icon}
            sx={{
              "@media (max-width: 350px)": { px: 0 },
              "@media (min-width: 351px) and (max-width: 420px)": { px: 0.5 },
            }}
          />
        ))}
        <BottomNavigationAction
          label="More"
          value="More"
          icon={<WidgetsRounded />}
        />
      </BottomNavigation>

      {/* Bottom Drawer */}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            p: 2.5,
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WidgetsRounded sx={{ color: "primary.main", fontSize: 22 }} />
            <Typography variant="h6" fontWeight={800}>
              More Options
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* Navigation Items in Drawer */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Contact Us */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
            onClick={() => {
              navigate("/contact-us");
              handleClose();
            }}
          >
            <SupportAgentRounded sx={{ color: "primary.main" }} />
            <Typography variant="body1" fontWeight={600}>
              Contact Us
            </Typography>
          </Box>

          {/* If logged in, show My Orders and Settings */}
          {isAuthenticated && (
            <>
              {/* My Orders */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
                onClick={() => {
                  navigate("/my-orders");
                  handleClose();
                }}
              >
                <ShoppingBagOutlined sx={{ color: "primary.main" }} />
                <Typography variant="body1" fontWeight={600}>
                  My Orders
                </Typography>
              </Box>

              {/* Settings Dropdown */}
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={() =>
                    setExpanded((prev) =>
                      prev === "Settings" ? null : "Settings"
                    )
                  }
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <TuneRounded sx={{ color: "primary.main" }} />
                    <Typography variant="body1" fontWeight={600}>
                      Settings
                    </Typography>
                  </Box>
                  <ExpandMoreIcon expand={expanded === "Settings" ? 1 : 0} />
                </Box>

                {/* Settings Child Items */}
                <Collapse
                  in={expanded === "Settings"}
                  timeout="auto"
                  unmountOnExit
                  sx={{ mt: 1 }}
                >
                  <Box
                    sx={{
                      pl: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.2,
                    }}
                  >
                    {[
                      {
                        label: "Edit Profile",
                        path: "/settings/edit-profile",
                        icon: <PersonOutlineRounded sx={{ fontSize: 18 }} />,
                      },
                      {
                        label: "Change Password",
                        path: "/settings/change-password",
                        icon: <LockResetRounded sx={{ fontSize: 18 }} />,
                      },
                      {
                        label: "Manage Addresses",
                        path: "/settings/manage-addresses",
                        icon: <LocationOnOutlined sx={{ fontSize: 18 }} />,
                      },
                    ].map((sub) => (
                      <Box
                        key={sub.label}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          cursor: "pointer",
                          color: "text.secondary",
                          "&:hover": { color: "primary.main" },
                        }}
                        onClick={() => {
                          navigate(sub.path);
                          handleClose();
                        }}
                      >
                        {sub.icon}
                        <Typography variant="body2" fontWeight={500}>
                          {sub.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </>
          )}

          {/* Static policy links with clean compact spacing */}
          <Box
            sx={{
              mt: 1,
              pt: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
            }}
          >
            <Box
              component={Link}
              to="/privacy-policy"
              onClick={handleClose}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                textDecoration: "none",
                fontSize: "0.88rem",
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
            >
              <PolicyOutlined sx={{ fontSize: 18 }} />
              <span>Privacy Policy</span>
            </Box>
            <Box
              component={Link}
              to="/terms-and-conditions"
              onClick={handleClose}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                textDecoration: "none",
                fontSize: "0.88rem",
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
            >
              <DescriptionOutlined sx={{ fontSize: 18 }} />
              <span>Terms & Conditions</span>
            </Box>
            <Box
              component={Link}
              to="/faq-support"
              onClick={handleClose}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                textDecoration: "none",
                fontSize: "0.88rem",
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
            >
              <HelpOutlineRounded sx={{ fontSize: 18 }} />
              <span>FAQ & Support</span>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

NavDock.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default NavDock;
