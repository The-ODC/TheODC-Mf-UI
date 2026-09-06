import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDialog from "./LogoutDialog";

export default {
  title: "SharedComponents/Dialogs/LogoutDialog",
  component: LogoutDialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
  },
};

const Template = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={() => setOpen(true)}
      >
        Trigger Logout Confirmation
      </Button>
      <LogoutDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        handleConfirm={() => setOpen(false)}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Sign Out of OdBites",
  description:
    "Are you sure you want to end your active session? Any items currently in guest checkout will be preserved.",
  confirmLabel: "Sign Out",
  cancelLabel: "Stay Logged In",
};
