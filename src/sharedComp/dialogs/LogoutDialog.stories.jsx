import React, { useState } from "react";
import LogoutDialog from "./LogoutDialog";

export default {
  title: "SharedComponents/Dialogs/LogoutDialog",
  component: LogoutDialog,
  tags: ["autodocs"],
};

const Template = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <LogoutDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        handleConfirm={() => setOpen(false)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Confirm Logout",
  description: "Are you sure you want to log out?",
  confirmLabel: "Logout",
  cancelLabel: "Cancel",
};
