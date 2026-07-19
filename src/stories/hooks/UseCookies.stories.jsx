import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCookies } from "../../hooks";

const Demo = () => {
  const { getCookie, setCookie, removeCookie, cookies } = useCookies();
  const [name, setName] = useState("demo_cookie");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setCookie("example_token", "123456", { maxAgeMinutes: 10 });
  }, [setCookie]);

  return (
    <Box sx={{ p: 4, maxWidth: 700 }}>
      <Typography variant="h5" gutterBottom>
        useCookies Hook Demo
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Interact with cookies using a simple UI, then inspect the hook state
        directly in Storybook.
      </Typography>

      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Cookie name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Cookie value"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            fullWidth
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              setCookie(name || "demo_cookie", value);
              setResult(`Set ${name || "demo_cookie"}`);
            }}
          >
            Set cookie
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              setResult(getCookie(name || "demo_cookie") || "Not found")
            }
          >
            Read cookie
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              removeCookie(name || "demo_cookie");
              setResult(`Removed ${name || "demo_cookie"}`);
            }}
          >
            Remove cookie
          </Button>
        </Stack>

        <Paper sx={{ p: 3, bgcolor: "background.paper" }}>
          <Typography variant="subtitle2" gutterBottom>
            Result
          </Typography>
          <Typography>
            {result || "Press a button to interact with cookies."}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, bgcolor: "background.paper" }}>
          <Typography variant="subtitle2" gutterBottom>
            Current cookie state
          </Typography>
          <Typography component="pre" sx={{ whiteSpace: "pre-wrap", m: 0 }}>
            {JSON.stringify(cookies, null, 2)}
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default {
  title: "Hooks/useCookies",
  component: Demo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
🔐 **useCookies Hook**
A custom React hook to manage cookies easily. Provides utility functions to get, set, and remove cookies.

#### 📦 Import
\`\`\`js
import { useCookies } from "OdBitesMfUI/hooks";
\`\`\`

## ✅ Returns
- \`getCookie(name: string)\` → Gets the cookie value.
- \`setCookie(name: string, value: string, options?)\` → Sets a cookie with optional config.
- \`removeCookie(name: string)\` → Deletes the cookie.
- \`cookies: Record<string, string>\` → All cookies as key-value pairs.
        `,
      },
    },
  },
};

export const Default = {
  render: () => <Demo />,
};
