import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  useTheme,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  DarkMode,
  Info,
  LightMode,
  Logout,
  RiceBowl,
} from "@mui/icons-material";

import { LOGO_1 } from "../assets";
import { ThemeContext } from "../theme";
import PropTypes from "prop-types";
import { VITE_APP_ASSETS_PATH } from "../config/env";
import { NAV_DOCK_HEIGHT, navItems } from "./constant";

function NavBar({ version = "0.0.0", openLogoutDialog, profileData = {} }) {
  // // initial state
  const theme = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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
          backgroundColor: "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? theme.shadows[2] : "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="text"
                component={Link}
                to={item.path}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box
            component="img"
            src={LOGO_1}
            alt="OdBites Logo"
            sx={{ width: { xs: 160, md: 200 }, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>

            <IconButton color="inherit" component={Link} to="/cart">
              <RiceBowl />
            </IconButton>

            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="User Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={`${VITE_APP_ASSETS_PATH}/${profileData?.folderLocation}/${profileData?.profilePicture}`}
                    alt={`${profileData?.firstName?.split(" ")?.[0]?.[0]}${profileData?.lastName?.split(" ")?.[0]?.[0]}`}
                    sx={{ cursor: "pointer" }}
                  />
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
                PaperProps={{ sx: { minWidth: 180 } }}
              >
                <MenuItem disabled>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Version: {version}</Typography>
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
                  <Typography variant="inherit">Profile</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    openLogoutDialog();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Logout</Typography>
                </MenuItem>
              </Popover>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default NavBar;

NavBar.propTypes = {
  version: PropTypes.string.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  profileData: PropTypes.object.isRequired,
};
