import { Box, Typography } from "@mui/material";
import { buildAssetUrl } from "../../utility/assets";

const Demo = () => {
  const url = buildAssetUrl({
    baseUrl: "https://assets.example.com",
    folderLocation: "products",
    fileName: "pizza.jpg",
  });

  return (
    <Box sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Asset URL Builder
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Converts a base URL, folder path, and filename into a normalized asset
        URL.
      </Typography>
      <Typography
        component="pre"
        sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}
      >
        {url}
      </Typography>
    </Box>
  );
};

export default {
  title: "Utility/Assets",
  component: Demo,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Demo />,
};
