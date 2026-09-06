import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { NoDataIllustration } from "../assets/svg";

function NoData({
  title = "No Data Found",
  description = "",
  children = null,
  sx = {},
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 420,
        px: 2,
        ...sx,
      }}
    >
      {/* Modern High-End Empty State SVG Illustration from assets/svg */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          "&:hover": {
            transform: "scale(1.05) translateY(-3px)",
          },
        }}
      >
        <NoDataIllustration isDark={isDark} width={150} height={130} />
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mt: 2,
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mt: 0.75,
            maxWidth: 320,
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      )}

      {/* Optional Action / Children */}
      {children && <Box sx={{ mt: 2 }}>{children}</Box>}
    </Box>
  );
}

NoData.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default NoData;
