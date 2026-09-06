import React, { useState } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { Footer, NavBar, NavDock } from "../user";
import { NAV_DOCK_HEIGHT } from "../user/constant";
import { LogoutDialog } from "../sharedComp/dialogs";
import useCookies from "../hooks/useCookies";

function UserLayout({
  children,
  version = "0.0.0",
  profileData = {},
  isAuthenticated = false,
  cartCount = 0,
  openLogoutDialog,
  handleLogout,
  navItems,
  dockItems,
}) {
  const { removeCookie } = useCookies();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const isUserLoggedIn =
    isAuthenticated ||
    Boolean(
      profileData?.email ||
      profileData?.firstName ||
      profileData?.id ||
      profileData?._id
    );

  const handleOpenLogout = () => {
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
      removeCookie("auth_token");
      setOpenLogoutModal(false);
      window.location.reload();
    }
  };

  return (
    <>
      <NavBar
        version={version}
        profileData={profileData}
        isAuthenticated={isUserLoggedIn}
        cartCount={cartCount}
        openLogoutDialog={handleOpenLogout}
        navItems={navItems}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: { xs: `${+NAV_DOCK_HEIGHT + 40}px`, md: `${+NAV_DOCK_HEIGHT}px` },
        }}
      >
        {children}
      </Box>
      <NavDock isAuthenticated={isUserLoggedIn} dockItems={dockItems} />
      <Footer isAuthenticated={isUserLoggedIn} />

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

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string.isRequired,
  profileData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  cartCount: PropTypes.number,
  openLogoutDialog: PropTypes.func,
  handleLogout: PropTypes.func,
  navItems: PropTypes.array,
  dockItems: PropTypes.array,
};

export default UserLayout;
