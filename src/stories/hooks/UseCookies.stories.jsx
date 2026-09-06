import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCookies } from "../../hooks";

const CookiesDemo = () => {
  const { getCookie, setCookie, removeCookie, cookies } = useCookies();
  const [name, setName] = useState("auth_session");
  const [value, setValue] = useState("token_abc123xyz");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    setCookie("user_role", "admin", { maxAgeMinutes: 60 });
    setCookie("cart_id", "cart_998811", { maxAgeMinutes: 120 });
  }, [setCookie]);

  const cookieEntries = Object.entries(cookies || {});

  return (
    <Box sx={{ maxWidth: 900, p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            useCookies Hook
          </Typography>
          <Chip
            label="React Hook"
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Manage document cookies with reactive state updates, automatic
          expiration calculation, and path scoping.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Actions Card */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Cookie Manager Actions
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Cookie Name"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Cookie Value"
                  size="small"
                  fullWidth
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Stack spacing={1}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (!name) return;
                      setCookie(name, value, { maxAgeMinutes: 60 });
                      setStatusMsg(`✅ Successfully set cookie: "${name}"`);
                    }}
                  >
                    Set Cookie (60m)
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (!name) return;
                      const val = getCookie(name);
                      setStatusMsg(
                        val
                          ? `🔍 Found "${name}": ${val}`
                          : `⚠️ Cookie "${name}" not found`
                      );
                    }}
                  >
                    Read Cookie
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (!name) return;
                      removeCookie(name);
                      setStatusMsg(`🗑️ Removed cookie: "${name}"`);
                    }}
                  >
                    Remove Cookie
                  </Button>
                </Stack>

                {statusMsg && (
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {statusMsg}
                    </Typography>
                  </Paper>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Live Active Cookies Table */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Active Cookies State
                </Typography>
                <Chip
                  label={`${cookieEntries.length} Active`}
                  color="success"
                  size="small"
                />
              </Stack>

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ borderRadius: 1.5 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Key</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Value</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cookieEntries.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          align="center"
                          sx={{ py: 3, color: "text.secondary" }}
                        >
                          No cookies currently stored in document.
                        </TableCell>
                      </TableRow>
                    ) : (
                      cookieEntries.map(([k, v]) => (
                        <TableRow key={k}>
                          <TableCell
                            sx={{ fontFamily: "monospace", fontWeight: 600 }}
                          >
                            {k}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "monospace",
                              color: "primary.main",
                            }}
                          >
                            {String(v)}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              color="error"
                              onClick={() => {
                                removeCookie(k);
                                setStatusMsg(`🗑️ Removed "${k}"`);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default {
  title: "Hooks/useCookies",
  component: CookiesDemo,
  tags: ["autodocs"],
};

export const LivePlayground = {
  render: () => <CookiesDemo />,
  parameters: {
    docs: {
      source: {
        code: `import { useCookies } from "TheOdcMfUI/hooks";

function UserSession() {
  const { getCookie, setCookie, removeCookie, cookies } = useCookies();

  // Set a session cookie with 60-minute expiry
  const handleLogin = (token) => {
    setCookie("auth_session", token, { maxAgeMinutes: 60 });
  };

  const handleLogout = () => {
    removeCookie("auth_session");
  };

  const currentToken = getCookie("auth_session");
}`,
      },
    },
  },
};
