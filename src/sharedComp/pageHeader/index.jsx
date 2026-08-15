import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function PageHeader({ title, subtitle }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mb: 5,
        mt: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          color: "text.primary",
          mb: 1.5,
          fontFamily: "'DM Serif Display', serif",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <Box sx={{ width: 50, height: 1, bgcolor: "primary.main" }} />
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
        <Box sx={{ width: 50, height: 1, bgcolor: "primary.main" }} />
      </Box>
      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            lineHeight: 1.6,
            fontStyle: "italic",
            fontFamily: "'Lora', serif",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
