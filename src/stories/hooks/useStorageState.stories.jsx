import { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useStorageState } from "../../hooks/useStorageState";

const Demo = () => {
  const [value, setValue, resetValue, removeValue] = useStorageState(
    "storybook-storage",
    "default value",
    { storage: "local" },
  );

  const updateValue = useCallback(() => {
    setValue((prev) => `${prev || ""} • ${new Date().toLocaleTimeString()}`);
  }, [setValue]);

  useEffect(() => {
    return () => {
      removeValue();
    };
  }, [removeValue]);

  return (
    <Box sx={{ p: 4, maxWidth: 640 }}>
      <Typography variant="h5" gutterBottom>
        useStorageState Demo
      </Typography>
      <Typography sx={{ mb: 3 }}>
        A live demo for storing form state in browser storage and syncing it
        across reloads.
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Current value"
          value={value || ""}
          onChange={(event) => setValue(event.target.value)}
          fullWidth
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" onClick={updateValue}>
            Append timestamp
          </Button>
          <Button variant="outlined" onClick={resetValue}>
            Reset to default
          </Button>
          <Button variant="outlined" color="error" onClick={removeValue}>
            Remove from storage
          </Button>
        </Stack>

        <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
          <Typography variant="subtitle2" gutterBottom>
            Stored Value
          </Typography>
          <Typography>{value || "(empty)"}</Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default {
  title: "Hooks/useStorageState",
  component: Demo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
💾 **useStorageState Hook**
A React hook that stores state in browser storage and keeps the UI in sync.

#### 📦 Import
\`\`\`js
import { useStorageState } from "OdBitesMfUI/hooks";
\`\`\`

#### Example usage
\`\`\`js
const [value, setValue, resetValue, removeValue] = useStorageState(
  "key",
  "fallback",
  { storage: "local" }
);
\`\`\`
        `,
      },
    },
  },
};

export const Default = {
  render: () => <Demo />,
};
