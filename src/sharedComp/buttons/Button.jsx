import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button as MuiButton, CircularProgress } from "@mui/material";

/**
 * Reusable design-system Button component with built-in loading states,
 * custom sizes (including micro-size), default name fallback, and standardized styling.
 */
const Button = forwardRef(
  (
    {
      children,
      btnName = "Button",
      variant = "contained",
      color = "primary",
      size = "medium",
      loading = false,
      loadingPosition = "center",
      loadingText = "Loading...",
      loadingIndicator,
      startIcon,
      endIcon,
      disabled = false,
      fullWidth = false,
      sx = {},
      ...rest
    },
    ref
  ) => {
    // Fall back to btnName if children (inner content) is not provided
    const content = children || btnName;

    // Check if the size requested is the custom "micro" design token
    const isMicro = size === "micro";
    const buttonSize = isMicro ? "small" : size;

    // Custom CSS rules to apply the custom micro dimensions
    const microStyles = isMicro
      ? {
          padding: "2px 8px",
          fontSize: "0.75rem",
          minWidth: "64px",
          height: "26px",
        }
      : {};

    // Dynamically size the CircularProgress loader based on the button size
    let spinnerSize = 16;
    if (size === "large") spinnerSize = 22;
    if (size === "small") spinnerSize = 14;
    if (size === "micro") spinnerSize = 12;

    const defaultLoader = (
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
      >
        <CircularProgress
          color="inherit"
          size={spinnerSize}
          thickness={4.5}
          sx={{
            color: variant === "contained" ? "inherit" : `${color}.main`,
          }}
        />
        {loadingText && (
          <span
            style={{
              fontSize: isMicro ? "0.7rem" : "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            {loadingText}
          </span>
        )}
      </span>
    );

    const loader = loadingIndicator || defaultLoader;
    const isButtonDisabled = disabled || loading;

    // Embed loader icon in start/end positions if specified
    const renderedStartIcon =
      loading && loadingPosition === "start" ? loader : startIcon;
    const renderedEndIcon =
      loading && loadingPosition === "end" ? loader : endIcon;

    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={color}
        size={buttonSize}
        disabled={isButtonDisabled}
        fullWidth={fullWidth}
        startIcon={renderedStartIcon}
        endIcon={renderedEndIcon}
        sx={{
          ...microStyles,
          ...sx,
        }}
        {...rest}
      >
        {loading && loadingPosition === "center" ? (
          <>
            <span style={{ opacity: 0 }}>{content}</span>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loader}
            </span>
          </>
        ) : (
          content
        )}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  /** The content of the button. Fallback to btnName if not provided. */
  children: PropTypes.node,
  /** Default button text if children is not provided. */
  btnName: PropTypes.string,
  /** The visual variant style of the button. */
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  /** Theme palette color applied to the button. */
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  /** Dimensions of the button. Includes standard MUI values and custom "micro". */
  size: PropTypes.oneOf(["micro", "small", "medium", "large"]),
  /** Disables click interaction and visual styling. */
  disabled: PropTypes.bool,
  /** Renders a spinner and disables click events. */
  loading: PropTypes.bool,
  /** Text to show next to the spinner when loading. */
  loadingText: PropTypes.string,
  /** Position of the loading spinner relative to text content. */
  loadingPosition: PropTypes.oneOf(["start", "end", "center"]),
  /** Custom spinner element override. */
  loadingIndicator: PropTypes.node,
  /** Icon shown before the button text. */
  startIcon: PropTypes.node,
  /** Icon shown after the button text. */
  endIcon: PropTypes.node,
  /** Fits the component width to the parent element width. */
  fullWidth: PropTypes.bool,
  /** Style overrides passed to the component. */
  sx: PropTypes.object,
};

export default Button;
