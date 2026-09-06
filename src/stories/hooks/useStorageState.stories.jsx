import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid2 as Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useStorageState } from "../../hooks/useStorageState";

const StorageDemo = () => {
  const [themePreference, setThemePreference, , removeTheme] = useStorageState(
    "odbites_user_theme",
    "dark",
    { storage: "local" }
  );

  const [filterState, setFilterState, , removeFilter] = useStorageState(
    "odbites_category_filter",
    "all-cuisines",
    { storage: "session" }
  );

  return (
    <Box sx={{ maxWidth: 900, p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            useStorageState Hook
          </Typography>
          <Chip
            label="Storage Sync"
            color="secondary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Seamlessly synchronizes React component state with `localStorage` or
          `sessionStorage` with cross-tab listener support.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* LocalStorage Example */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  💾 LocalStorage Sync
                </Typography>
                <Chip
                  label="localStorage"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Persists across page reloads and browser restarts.
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Key: 'odbites_user_theme'"
                  size="small"
                  fullWidth
                  value={themePreference || ""}
                  onChange={(e) => setThemePreference(e.target.value)}
                />
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setThemePreference("dark")}
                  >
                    Set 'dark'
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="warning"
                    onClick={() => setThemePreference("light")}
                  >
                    Set 'light'
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={removeTheme}
                  >
                    Clear
                  </Button>
                </Stack>

                <Paper
                  sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1.5 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Synced State:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {themePreference || "(undefined / deleted)"}
                  </Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* SessionStorage Example */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  ⏱️ SessionStorage Sync
                </Typography>
                <Chip
                  label="sessionStorage"
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Persists only for the current tab session.
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Key: 'odbites_category_filter'"
                  size="small"
                  fullWidth
                  value={filterState || ""}
                  onChange={(e) => setFilterState(e.target.value)}
                />
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => setFilterState("italian")}
                  >
                    'italian'
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => setFilterState("biryani")}
                  >
                    'biryani'
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={removeFilter}
                  >
                    Clear
                  </Button>
                </Stack>

                <Paper
                  sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1.5 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Synced State:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, color: "secondary.main" }}
                  >
                    {filterState || "(undefined / deleted)"}
                  </Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default {
  title: "Hooks/useStorageState",
  component: StorageDemo,
  tags: ["autodocs"],
};

export const LivePlayground = {
  render: () => <StorageDemo />,
};
