import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { getApiErrorMessage, getApiErrorStatus } from "../../utility/http";

const standardErrors = [
  {
    title: "401 Unauthorized",
    color: "error",
    error: {
      response: {
        status: 401,
        statusText: "Unauthorized",
        data: { message: "Session expired. Please log in again." },
      },
    },
  },
  {
    title: "403 Forbidden",
    color: "warning",
    error: {
      response: {
        status: 403,
        statusText: "Forbidden",
        data: {
          error:
            "You do not have administrative permissions to perform this action.",
        },
      },
    },
  },
  {
    title: "404 Not Found",
    color: "info",
    error: {
      response: {
        status: 404,
        statusText: "Not Found",
        data: { message: "Requested menu item or order could not be found." },
      },
    },
  },
  {
    title: "422 Validation Error",
    color: "warning",
    error: {
      response: {
        status: 422,
        statusText: "Unprocessable Entity",
        data: {
          message: "Validation failed on fields",
          errors: [{ field: "email", message: "Email is already registered" }],
        },
      },
    },
  },
  {
    title: "500 Internal Server Error",
    color: "error",
    error: {
      response: {
        status: 500,
        statusText: "Internal Server Error",
        data: {
          message: "An unexpected database error occurred on the cluster.",
        },
      },
    },
  },
  {
    title: "Network Connection Timeout",
    color: "error",
    error: {
      code: "ECONNABORTED",
      message: "Network Error: Unable to connect to OdBites API gateway.",
    },
  },
];

const HttpPlayground = () => {
  const [selectedErrorIdx, setSelectedErrorIdx] = useState(0);
  const [customStatus, setCustomStatus] = useState(400);
  const [customMsg, setCustomMsg] = useState("Invalid coupon code provided.");
  const [customErrorOutput, setCustomErrorOutput] = useState("");

  const activeError = standardErrors[selectedErrorIdx];

  const handleTestCustom = () => {
    const mockErr = {
      response: {
        status: Number(customStatus),
        data: { message: customMsg },
      },
    };
    setCustomErrorOutput(getApiErrorMessage(mockErr));
  };

  return (
    <Box sx={{ maxWidth: 1000, p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            HTTP & Error Normalization
          </Typography>
          <Chip
            label="Axios Utility"
            color="secondary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Converts raw Axios responses, error objects, and network exceptions
          into consistent, user-friendly UI notifications.
        </Typography>
      </Box>

      {/* Preset Error Case Explorer */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Common API Error Scenarios
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 3 }}
      >
        {standardErrors.map((item, idx) => (
          <Chip
            key={item.title}
            label={item.title}
            color={idx === selectedErrorIdx ? item.color : "default"}
            variant={idx === selectedErrorIdx ? "filled" : "outlined"}
            onClick={() => setSelectedErrorIdx(idx)}
            sx={{ fontWeight: 600, cursor: "pointer" }}
          />
        ))}
      </Stack>

      {/* Inspection Card */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Extracted User-Facing Notification
              </Typography>
              <Alert
                severity={
                  activeError.color === "error"
                    ? "error"
                    : activeError.color === "warning"
                      ? "warning"
                      : "info"
                }
                sx={{ mb: 3 }}
              >
                <AlertTitle sx={{ fontWeight: 700 }}>
                  Status {getApiErrorStatus(activeError.error)}
                </AlertTitle>
                {getApiErrorMessage(activeError.error)}
              </Alert>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Raw Axios Error Payload (Simulated)
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1.5,
                  maxHeight: 200,
                  overflow: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  component="pre"
                  variant="caption"
                  sx={{ fontFamily: "monospace" }}
                >
                  {JSON.stringify(activeError.error, null, 2)}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Live Custom Error Tester */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                🧪 Live Error Tester
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Simulate custom server error payloads to test fallback handlers.
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="HTTP Status Code"
                  type="number"
                  size="small"
                  fullWidth
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                />
                <TextField
                  label="Error Message in response.data"
                  size="small"
                  multiline
                  rows={2}
                  fullWidth
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                />
                <Button variant="contained" onClick={handleTestCustom}>
                  Parse with getApiErrorMessage()
                </Button>

                {customErrorOutput && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {customErrorOutput}
                  </Alert>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default {
  title: "Utility/HTTP",
  component: HttpPlayground,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🌐 HTTP & API Error Utility
Centralized error handling and message extraction for Axios requests.

#### 📦 Import
\`\`\`js
import {
  createAxiosInstance,
  getApiErrorMessage,
  getApiErrorStatus,
  getApiErrorData,
  handleApiError,
  createApiError,
} from "TheOdcMfUI/utility/http";
\`\`\`
        `,
      },
    },
  },
};

export const LivePlayground = {
  render: () => <HttpPlayground />,
  parameters: {
    docs: {
      source: {
        code: `import {
  getApiErrorMessage,
  getApiErrorStatus,
} from "TheOdcMfUI/utility/http";

try {
  await axios.get("/api/customer/orders");
} catch (error) {
  // Extracts user-friendly error message from server response or network error
  const userMessage = getApiErrorMessage(error);
  const statusCode = getApiErrorStatus(error);

  console.error(\`Request failed [\${statusCode}]: \${userMessage}\`);
  toast.error(userMessage);
}`,
      },
    },
  },
};
