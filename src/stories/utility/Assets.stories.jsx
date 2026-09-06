import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid2 as Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { buildAssetUrl } from "../../utility/assets";

const AssetsDemo = () => {
  const [baseUrl, setBaseUrl] = useState("https://cdn.odbites.com");
  const [folderLocation, setFolderLocation] = useState("menu-items/pizzas");
  const [fileName, setFileName] = useState("margherita_deluxe.webp");
  const [copied, setCopied] = useState(false);

  const generatedUrl = buildAssetUrl({
    baseUrl,
    folderLocation,
    fileName,
  });

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ maxWidth: 800, p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Asset URL Builder
          </Typography>
          <Chip
            label="buildAssetUrl()"
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Generates clean, normalized URLs for remote media, avatars, menu
          items, and static CDN assets.
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Base CDN / S3 Bucket URL"
                size="small"
                fullWidth
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Folder Location"
                size="small"
                fullWidth
                value={folderLocation}
                onChange={(e) => setFolderLocation(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="File Name"
                size="small"
                fullWidth
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Normalized Asset URL:
          </Typography>
          <Paper
            sx={{
              p: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "monospace",
                wordBreak: "break-all",
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              {generatedUrl}
            </Typography>
            <Tooltip title={copied ? "Copied!" : "Copy URL"}>
              <IconButton
                onClick={handleCopy}
                color={copied ? "success" : "default"}
              >
                {copied ? (
                  <CheckIcon fontSize="small" />
                ) : (
                  <ContentCopyIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default {
  title: "Utility/Assets",
  component: AssetsDemo,
  tags: ["autodocs"],
};

export const LivePlayground = {
  render: () => <AssetsDemo />,
};
