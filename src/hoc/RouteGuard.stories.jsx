import { Box, Typography } from "@mui/material";
import RouteGuard from "./RouteGuard";

export default {
  title: "HOC/RouteGuard",
  component: RouteGuard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => (
  <RouteGuard {...args}>
    <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Authenticated Content
      </Typography>
      <Typography>
        This content is visible because <strong>isAllowed</strong> is true.
      </Typography>
    </Box>
  </RouteGuard>
);

export const Allowed = Template.bind({});
Allowed.args = {
  isAllowed: true,
  redirectTo: "/login",
  preserveLocation: false,
};

export const Denied = Template.bind({});
Denied.args = {
  isAllowed: false,
  redirectTo: "/login",
  preserveLocation: false,
};
