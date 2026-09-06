import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { getApiErrorMessage } from "../../utility/http";

const examples = [
  {
    label: "Unauthorized (401)",
    error: {
      response: {
        status: 401,
        data: { message: "Authentication failed" },
      },
    },
  },
  {
    label: "Not Found (404)",
    error: {
      response: {
        status: 404,
        data: { error: "Resource not found" },
      },
    },
  },
  {
    label: "Network error",
    error: {},
  },
];

const Demo = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 760 }}>
      <Typography variant="h5" gutterBottom>
        HTTP Error Formatter
      </Typography>
      <Typography sx={{ mb: 3 }}>
        This utility converts raw API errors into user-friendly messages for the
        UI.
      </Typography>

      <Stack spacing={2}>
        {examples.map((example) => (
          <Card key={example.label} variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {example.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                Raw payload:
              </Typography>
              <Typography
                component="pre"
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  whiteSpace: "pre-wrap",
                }}
              >
                {JSON.stringify(example.error, null, 2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, fontWeight: 700 }}>
                Message: {getApiErrorMessage(example.error)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default {
  title: "Utility/HTTP",
  component: Demo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
⚠️ **HTTP Utility**
Use this helper to normalize API error payloads into readable messages for users.

#### Example
\`\`\`js
import { getApiErrorMessage } from "TheOdcMfUI/utility/http";
\`\`\`
        `,
      },
    },
  },
};

export const Default = {
  render: () => <Demo />,
};
