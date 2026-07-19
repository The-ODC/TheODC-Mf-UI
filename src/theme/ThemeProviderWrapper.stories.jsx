import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProviderWrapper } from "./ThemeProviderWrapper";

export default {
  title: "Theme/ThemeProviderWrapper",
  component: ThemeProviderWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

const Template = () => {
  const [mode, setMode] = useState("dark");

  return (
    <ThemeProviderWrapper mode={mode}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 2,
          minWidth: 360,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Current theme: {mode}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          The ThemeProviderWrapper applies the app theme and provides the theme
          context to child components.
        </Typography>
        <Button
          variant="contained"
          onClick={() =>
            setMode((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          Toggle theme
        </Button>
      </Box>
    </ThemeProviderWrapper>
  );
};

export const Default = Template.bind({});
