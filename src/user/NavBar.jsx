import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccountCircle,
  DarkMode,
  Info,
  LightMode,
  Logout,
  PersonOutline,
  RiceBowl,
  ShoppingBag,
} from "@mui/icons-material";

import { DARK_LOGO, LIGHT_LOGO } from "../assets";
import { ThemeContext } from "../theme";
import { VITE_APP_ASSETS_PATH } from "../config/env";
import { NAV_DOCK_HEIGHT, navItems } from "./constant";

function NavBar({
  version = "0.0.0",
  openLogoutDialog,
  profileData = {},
  isAuthenticated = false,
  cartCount = 0,
  navItems: propNavItems,
}) {
  const currentNavItems =
    Array.isArray(propNavItems) && propNavItems.length > 0
      ? propNavItems
      : navItems;
  const theme = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const isDark = theme.palette.mode === "dark" || mode === "dark";
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const isItemActive = (itemPath) => {
    if (itemPath === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === itemPath ||
      location.pathname.startsWith(`${itemPath}/`)
    );
  };

  // Check if user is logged in
  const isUserLoggedIn =
    isAuthenticated ||
    Boolean(
      profileData?.email ||
      profileData?.firstName ||
      profileData?.id ||
      profileData?._id
    );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > NAV_DOCK_HEIGHT + 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: scrolled
            ? mode === "dark"
              ? "rgba(22, 19, 17, 0.94)"
              : "rgba(255, 255, 255, 0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? theme.shadows[3] : "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1.5, sm: 3 },
            minHeight: {
              xs: "72px !important",
              sm: "78px !important",
              md: "84px !important",
            },
          }}
        >
          {/* Left: Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {currentNavItems.map((item) => {
              const active = isItemActive(item.path);

              return (
                <Button
                  key={item.label}
                  variant="text"
                  component={Link}
                  to={item.path}
                  sx={{
                    fontWeight: active ? 800 : 600,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    color: active
                      ? "primary.main"
                      : mode === "dark"
                        ? "rgba(255, 255, 255, 0.85)"
                        : "text.primary",
                    position: "relative",
                    px: 1.6,
                    py: 0.8,
                    borderRadius: "8px",
                    bgcolor: "transparent",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                    "&::after": active
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 2,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          boxShadow: "0 0 6px rgba(250, 140, 22, 0.8)",
                        }
                      : undefined,
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Center: Brand Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 0.5,
            }}
          >
            <Box
              component="img"
              src={isDark ? DARK_LOGO : LIGHT_LOGO}
              alt="The ODC Logo"
              sx={{
                width: "auto",
                maxHeight: { xs: 52, sm: 62, md: 70 },
                objectFit: "contain",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Right: Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} color="inherit" size="small">
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>

            {/* Cart Icon with Live Badge Counter */}
            <IconButton
              color="inherit"
              size="small"
              component={Link}
              to="/cart"
              sx={{
                "&:hover": { color: "primary.main" },
              }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <RiceBowl />
              </Badge>
            </IconButton>

            {/* Sign In or User Avatar Menu */}
            {isUserLoggedIn ? (
              <Box sx={{ flexGrow: 0, ml: 0.5 }}>
                <Tooltip title="User Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={
                        profileData?.profilePicture
                          ? `${VITE_APP_ASSETS_PATH}/${profileData?.folderLocation}/${profileData?.profilePicture}`
                          : undefined
                      }
                      alt={`${profileData?.firstName || "U"}`}
                      sx={{
                        cursor: "pointer",
                        bgcolor: "primary.main",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        width: 34,
                        height: 34,
                      }}
                    >
                      {profileData?.firstName?.[0] || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Popover
                  id="user-menu"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: { minWidth: 200, borderRadius: "16px", p: 1 },
                  }}
                >
                  <MenuItem disabled sx={{ opacity: "0.8 !important" }}>
                    <ListItemIcon>
                      <Info fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="caption">
                      Version: {version}
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={600}>
                      My Profile
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/my-orders");
                    }}
                  >
                    <ListItemIcon>
                      <ShoppingBag fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={600}>
                      My Orders
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      openLogoutDialog();
                    }}
                    sx={{ color: "error.main" }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={700}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Popover>
              </Box>
            ) : (
              <Button
                variant="text"
                component={Link}
                to="/sign-in"
                color="inherit"
                startIcon={<PersonOutline sx={{ fontSize: "1.2rem" }} />}
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.82rem", sm: "0.95rem" },
                  textTransform: "none",
                  borderRadius: "20px",
                  px: { xs: 1, sm: 1.8 },
                  py: 0.5,
                  whiteSpace: "nowrap",
                  minWidth: "auto",
                  "&:hover": { color: "primary.main" },
                  "& .MuiButton-startIcon": {
                    mr: { xs: 0.4, sm: 0.8 },
                  },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar
        sx={{
          minHeight: {
            xs: "72px !important",
            sm: "78px !important",
            md: "84px !important",
          },
        }}
      />
    </>
  );
}

export default NavBar;

NavBar.propTypes = {
  version: PropTypes.string.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  cartCount: PropTypes.number,
};
