import React, { useState, useCallback } from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import { throttle } from "../../utility/throttle";

const ThrottleDemo = () => {
  const [triggerCount, setTriggerCount] = useState(0);
  const [executedCount, setExecutedCount] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledHandler = useCallback(
    throttle(() => {
      setExecutedCount((prev) => prev + 1);
    }, 1000),
    []
  );

  const handleClick = () => {
    setTriggerCount((prev) => prev + 1);
    throttledHandler();
  };

  const handleReset = () => {
    setTriggerCount(0);
    setExecutedCount(0);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Throttle Utility
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Limits the rate at which a function can fire (e.g. at most once every
        1000ms).
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
          <Typography variant="subtitle2">
            Buttons clicked (immediate): <strong>{triggerCount}</strong>
          </Typography>
          <Typography variant="subtitle2" color="primary">
            Throttled executions (max 1/sec): <strong>{executedCount}</strong>
          </Typography>
        </Paper>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleClick}>
            Click rapidly!
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default {
  title: "Utility/Throttle",
  component: ThrottleDemo,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <ThrottleDemo />,
};
