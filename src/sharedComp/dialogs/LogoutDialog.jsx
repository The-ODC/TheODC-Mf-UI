import React, { memo, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useCookies from "../../hooks/useCookies";

function LogoutDialog({
  open,
  onClose,
  handleConfirm,
  title = "Ready to log out?",
  description = "You’ll be logged out of your account. Don’t worry, we’ll keep your session safe so you can log back in anytime.",
  confirmLabel = "Yes, Log Me Out",
  cancelLabel = "Cancel",
}) {
  const { removeCookie } = useCookies();

  const cancelRef = useRef(null);
  const confirmRef = useRef(null);
  const [btnWidth, setBtnWidth] = useState(100);

  useLayoutEffect(() => {
    if (cancelRef.current && confirmRef.current) {
      const cancelWidth = cancelRef.current.offsetWidth;
      const confirmWidth = confirmRef.current.offsetWidth;
      setBtnWidth(Math.max(cancelWidth, confirmWidth));
    }
  }, [open, title, description]);

  const handleConfirmModal = () => {
    if (typeof handleConfirm === "function") {
      handleConfirm();
    } else {
      alert("Logout function not provided");
      if (typeof onClose === "function") {
        onClose();
      }
      window.location.reload();
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: 700, fontSize: { sm: "20px" } }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions sx={{ padding: "24px" }}>
        <Button
          variant="outlined"
          ref={cancelRef}
          onClick={onClose}
          sx={{ minWidth: btnWidth }}
        >
          {cancelLabel}
        </Button>
        <Button
          ref={confirmRef}
          onClick={handleConfirmModal}
          sx={{ minWidth: btnWidth }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LogoutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default memo(LogoutDialog);
