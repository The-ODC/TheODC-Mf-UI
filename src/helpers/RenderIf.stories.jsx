import React, { useState } from "react";
import {
  Alert,
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import RenderIf from "./RenderIf";

const InteractiveRenderIfDemo = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [hasDiscount, setHasDiscount] = useState(false);

  return (
    <Box sx={{ maxWidth: 650, p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Conditional Rendering with RenderIf
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Declarative conditional wrapper that renders children only when `render`
        is truthy, keeping JSX clean without complex ternary nesting.
      </Typography>

      <Paper sx={{ p: 2.5, mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Toggle Component States:
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Admin Privileges (render admin actions)"
        />
        <FormControlLabel
          control={
            <Switch
              checked={hasDiscount}
              onChange={(e) => setHasDiscount(e.target.checked)}
            />
          }
          label="Active Promotion (render discount banner)"
        />
      </Paper>

      <RenderIf render={isAdmin}>
        <Alert severity="info" sx={{ mb: 2 }}>
          🔒 <strong>Admin Panel Access Enabled:</strong> You have elevated
          permissions to edit restaurant menus and view live logs.
        </Alert>
      </RenderIf>

      <RenderIf render={hasDiscount}>
        <Alert severity="success">
          🎉 <strong>Special Promo Code Applied:</strong> 20% discount will be
          applied at checkout automatically!
        </Alert>
      </RenderIf>
    </Box>
  );
};

export default {
  title: "Helpers/RenderIf",
  component: InteractiveRenderIfDemo,
  tags: ["autodocs"],
};

export const LivePlayground = {
  render: () => <InteractiveRenderIfDemo />,
};
