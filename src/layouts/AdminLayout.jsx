import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  MenuItem,
  Popover,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  DashboardTwoTone,
  ManageAccountsTwoTone,
  FastfoodTwoTone,
  DeliveryDiningTwoTone,
  PaymentsTwoTone,
  SupportAgentTwoTone,
  DarkMode,
  LightMode,
  Info,
  Logout,
  AccountCircle,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeProviderWrapper";
import { DARK_LOGO, LIGHT_LOGO } from "../assets";
import { VITE_APP_ASSETS_PATH } from "../config/env";
import LogoutDialog from "../sharedComp/dialogs/LogoutDialog";
import useCookies from "../hooks/useCookies";

function AdminLayout({
  children,
  version,
  profileData,
  openLogoutDialog,
  handleLogout,
}) {
  // // initial state
  const drawerWidth = 270;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, toggleTheme } = useContext(ThemeContext);
  const isDark = theme.palette.mode === "dark" || mode === "dark";
  const { removeCookie } = useCookies();
  const navigate = useNavigate();

  // // local setup
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardTwoTone />, path: "/" },
    {
      text: "User Management",
      icon: <ManageAccountsTwoTone />,
      path: "/user-management",
    },
    {
      text: "Dish Management",
      icon: <FastfoodTwoTone />,
      path: "/dish-management",
    },
    {
      text: "Order Management",
      icon: <DeliveryDiningTwoTone />,
      path: "/order-management",
    },
    {
      text: "Payment Management",
      icon: <PaymentsTwoTone />,
      path: "/payment-management",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    if (typeof openLogoutDialog === "function") {
      openLogoutDialog();
    } else {
      setOpenLogoutModal(true);
    }
  };

  const handleConfirmLogout = () => {
    if (typeof handleLogout === "function") {
      handleLogout();
    } else {
      removeCookie("admin_auth_token");
      removeCookie("admin_id");
      setOpenLogoutModal(false);
      window.location.reload();
    }
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar
        sx={{
          minHeight: {
            xs: "72px !important",
            sm: "78px !important",
            md: "84px !important",
          },
        }}
      />
      <List>
        {menuItems.map((menu) => (
          <NavLink
            key={menu.text}
            to={menu.path}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => setMobileOpen(false)}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  color: isActive && theme.palette.primary.main,
                  backgroundColor: isActive
                    ? mode === "light"
                      ? "rgba(0, 0, 0, 0.04)"
                      : "rgba(255, 255, 255, 0.08)"
                    : "transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive && theme.palette.primary.main,
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.text}
                  sx={{
                    span: {
                      color: isActive && theme.palette.primary.main,
                    },
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
      <List sx={{ marginTop: "auto" }}>
        <Divider />
        <NavLink
          key="Support"
          to="/support"
          onClick={() => setMobileOpen(false)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SupportAgentTwoTone />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: "72px !important",
              sm: "78px !important",
              md: "84px !important",
            },
            px: { xs: 1.5, sm: 2.5 },
          }}
        >
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            flexGrow={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "start" },
              py: 0.5,
            }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={isDark ? DARK_LOGO : LIGHT_LOGO}
              alt="The ODC Logo"
              sx={{
                width: "auto",
                maxHeight: { xs: 52, sm: 60, md: 68 },
                objectFit: "contain",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Box>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={`${VITE_APP_ASSETS_PATH}${profileData?.folderLocation}/${profileData?.photo}`}
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

              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Logout</Typography>
              </MenuItem>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Permanent Drawer for Large Screens */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px` },
          minWidth: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },
          p: { xs: 2, sm: 3 },
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: "72px !important",
              sm: "78px !important",
              md: "84px !important",
            },
          }}
        />

        {children}
      </Box>

      <LogoutDialog
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        handleConfirm={handleConfirmLogout}
        title="Ready to log out?"
        description="You’ll be logged out of your account. Don’t worry, we’ll keep your session safe so you can log back in anytime."
        confirmLabel="Yes, Log Me Out"
        cancelLabel="Cancel"
      />
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string.isRequired || PropTypes.number.isRequired,
  profileData: PropTypes.object.isRequired,
  openLogoutDialog: PropTypes.func,
  handleLogout: PropTypes.func,
};

export default AdminLayout;
