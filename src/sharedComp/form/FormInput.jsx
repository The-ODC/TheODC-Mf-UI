import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormLabel,
  Box,
  useTheme,
  styled,
  Typography,
  IconButton,
  Switch,
  OutlinedInput,
  Chip,
  Tooltip,
  Button as MuiButton,
  alpha,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Delete as DeleteIcon,
  CloudUploadTwoTone,
} from "@mui/icons-material";

import { VITE_APP_ASSETS_PATH } from "../../config/env";
import { COLORS } from "../../theme";

// 🎨 Top-level Styled Dropzone
const StyledDropzone = styled("div")(({ theme, isDragActive, rowHeight }) => {
  const isDark = theme.palette.mode === "dark";
  const activeColor = theme.palette.primary?.main || COLORS.PRIMARY;
  const defaultBorderColor = isDark
    ? "rgba(255, 255, 255, 0.16)"
    : "rgba(0, 0, 0, 0.14)";
  const defaultBg = isDark
    ? "rgba(255, 255, 255, 0.02)"
    : "rgba(0, 0, 0, 0.015)";
  const hoverBg = alpha(activeColor, isDark ? 0.06 : 0.04);
  const dragBg = alpha(activeColor, isDark ? 0.14 : 0.08);

  const minHeightVal = rowHeight
    ? `${Math.max(160, Number(rowHeight) * 45)}px`
    : "180px";

  return {
    border: `2px dashed ${isDragActive ? activeColor : defaultBorderColor}`,
    borderRadius: "16px",
    padding: theme.spacing(3),
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: isDragActive ? dragBg : defaultBg,
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: minHeightVal,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1.5),
    position: "relative",
    outline: "none",
    "&:hover": {
      borderColor: activeColor,
      backgroundColor: hoverBg,
      transform: "translateY(-1px)",
      boxShadow: `0 6px 24px -4px ${alpha(activeColor, isDark ? 0.2 : 0.12)}`,
    },
  };
});

// 📞 Top-level Styled Phone Input Wrapper
const StyledPhoneInputWrapper = styled("div")(({ theme }) => ({
  marginTop: "16px",
  ".react-tel-input": {
    width: "100%",
    fontFamily: theme.typography.fontFamily,

    ".form-control": {
      width: "100% !important",
      height: "45px !important",
      fontSize: "16px",
      borderRadius: "50px !important",
      paddingLeft: "52px !important",
      color: `${theme.palette.text.primary} !important`,
      caretColor: `${theme.palette.text.primary} !important`,
      backgroundColor: "transparent !important",
      fontFamily: theme.typography.fontFamily,
      border: `1px solid ${theme.palette.divider} !important`,
      outline: "none",
      boxSizing: "border-box",
      position: "relative",
      zIndex: 1,
      transition: "border-color 0.2s, box-shadow 0.2s",
      "&:hover": {
        borderColor: `${theme.palette.text.primary} !important`,
      },
      "&:focus": {
        borderColor: `${theme.palette.primary.main} !important`,
        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      },
    },

    ".special-label": {
      display: "none !important",
    },

    ".flag-dropdown": {
      border: "none",
      backgroundColor: "transparent",
      borderRadius: "50px 0 0 50px",
      paddingLeft: "8px",
    },
    ".flag-dropdown.open .selected-flag": { backgroundColor: "transparent" },
    ".flag-dropdown .selected-flag": {
      backgroundColor: "transparent",
      borderRadius: "50px 0 0 50px",
      paddingLeft: "16px",
      "&:hover, &:focus, &.open": {
        backgroundColor: "transparent",
      },
    },

    ".country-list": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      maxHeight: 250,
      overflowY: "auto",
      border: `1px solid ${theme.palette.divider}`,
      fontFamily: theme.typography.fontFamily,
      zIndex: 1300,
    },
    ".country-list .country": {
      padding: "8px 12px 8px 46px",
      cursor: "pointer",
      color: theme.palette.text.primary,
    },
    ".country-list .country:hover, .country-list .country.highlight": {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      color: theme.palette.text.primary,
    },
  },
}));

// 📂 Subcomponent: FileDropzoneField
function FileDropzoneField({
  field,
  error,
  label,
  multiple,
  rowHeight,
  inputProps = {},
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const files = field.value
    ? Array.isArray(field.value)
      ? field.value
      : [field.value]
    : [];

  const onDrop = (acceptedFiles) => {
    if (multiple) {
      field.onChange([...files, ...acceptedFiles]);
    } else {
      field.onChange(acceptedFiles[0] || null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: inputProps.accept ? { "image/*": [] } : undefined,
  });

  const handleRemove = (indexToRemove) => {
    if (multiple) {
      const newFiles = files.filter((_, idx) => idx !== indexToRemove);
      field.onChange(newFiles);
    } else {
      field.onChange(null);
    }
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    field.onChange(multiple ? [] : null);
  };

  return (
    <Box sx={{ mb: 2.5, width: "100%" }}>
      {label && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              fontSize: "0.92rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {label}
            {multiple && (
              <Chip
                label="Multiple Allowed"
                size="small"
                variant="outlined"
                color="primary"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  borderRadius: "6px",
                }}
              />
            )}
          </Typography>

          {files.length > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {files.length} {files.length === 1 ? "file" : "files"} selected
            </Typography>
          )}
        </Box>
      )}

      <StyledDropzone
        {...getRootProps()}
        isDragActive={isDragActive ? 1 : 0}
        rowHeight={rowHeight}
      >
        <input {...getInputProps()} {...inputProps} />

        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            bgcolor: alpha(
              theme.palette.primary.main,
              isDragActive ? 0.2 : isDark ? 0.12 : 0.08
            ),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
            transition: "all 0.25s ease",
            transform: isDragActive ? "scale(1.1)" : "scale(1)",
          }}
        >
          <CloudUploadTwoTone sx={{ fontSize: 32 }} />
        </Box>

        <Box sx={{ textAlign: "center", maxWidth: 420 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 0.5,
              fontSize: "0.95rem",
            }}
          >
            {isDragActive ? (
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Drop files here to upload
              </Box>
            ) : (
              <>
                Drag & drop files here, or{" "}
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  browse from device
                </Box>
              </>
            )}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              lineHeight: 1.4,
            }}
          >
            Supports: JPG, PNG, WEBP, or SVG (Up to 5MB per file)
          </Typography>
        </Box>
      </StyledDropzone>

      {error && (
        <FormHelperText error sx={{ mt: 0.8, ml: 0.5, fontSize: "0.78rem" }}>
          {error?.message}
        </FormHelperText>
      )}

      {/* Selected files preview grid */}
      {files.length > 0 && (
        <Box sx={{ mt: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="text.primary"
            >
              Attached Preview ({files.length})
            </Typography>
            {files.length > 1 && (
              <MuiButton
                size="small"
                color="error"
                onClick={handleClearAll}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  py: 0.2,
                  px: 1,
                  minWidth: "auto",
                }}
              >
                Clear all
              </MuiButton>
            )}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: 2,
            }}
          >
            {files.map((file, idx) => {
              let previewUrl = "";
              let fileName = "";
              if (file instanceof File) {
                previewUrl = URL.createObjectURL(file);
                fileName = file.name;
              } else if (typeof file === "string") {
                if (
                  file.startsWith("http") ||
                  file.startsWith("blob") ||
                  file.startsWith("data:")
                ) {
                  previewUrl = file;
                } else if (file.startsWith("/")) {
                  previewUrl = `${VITE_APP_ASSETS_PATH}${file}`;
                } else {
                  previewUrl = `${VITE_APP_ASSETS_PATH}/uploads/products/${file}`;
                }
                fileName = file.substring(file.lastIndexOf("/") + 1);
              }

              return (
                <Box
                  key={`${fileName}-${idx + 1}`}
                  sx={{
                    position: "relative",
                    aspectRatio: "1/1",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: theme.shadows[1],
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                      borderColor: "primary.main",
                      "& .remove-btn": { opacity: 1 },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={previewUrl}
                    alt={fileName || `Image ${idx + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {idx === 0 && (
                    <Chip
                      label="Primary"
                      size="small"
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: 6,
                        left: 6,
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      }}
                    />
                  )}

                  <Tooltip title="Remove file">
                    <IconButton
                      className="remove-btn"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(idx);
                      }}
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        bgcolor: "rgba(0, 0, 0, 0.65)",
                        color: "#FFFFFF",
                        backdropFilter: "blur(4px)",
                        transition: "all 0.2s ease",
                        opacity: { xs: 1, md: 0.8 },
                        width: 26,
                        height: 26,
                        "&:hover": {
                          bgcolor: "error.main",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

FileDropzoneField.propTypes = {
  field: PropTypes.object.isRequired,
  error: PropTypes.object,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputProps: PropTypes.object,
};

// 🌟 Main FormInput Component
function FormInput({
  name,
  control,
  label,
  inputType = "text",
  options = [],
  multiple = false,
  rowHeight = 1,
  ...rest
}) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { error } = fieldState;

        // 🔘 SELECT
        if (inputType === "select") {
          if (multiple) {
            return (
              <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
                <InputLabel>{label}</InputLabel>
                <Select
                  multiple
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                  input={<OutlinedInput label={label} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const selectedOpt = options.find(
                          (opt) => opt.value === value
                        );
                        return (
                          <Chip
                            key={value}
                            label={selectedOpt ? selectedOpt.label : value}
                            onDelete={(e) => {
                              e.stopPropagation();
                              const newValue = selected.filter(
                                (v) => v !== value
                              );
                              field.onChange(newValue);
                            }}
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                    },
                  }}
                >
                  {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            );
          }

          // Default single select
          return (
            <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
              <InputLabel>{label}</InputLabel>
              <Select
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                label={label}
                {...rest}
              >
                {options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          );
        }

        // 🎯 RADIO
        if (inputType === "radio") {
          return (
            <Box>
              <FormLabel component="legend">{label}</FormLabel>
              <FormControl component="fieldset" error={!!error} sx={{ mb: 2 }}>
                <RadioGroup {...field} row>
                  {options.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            </Box>
          );
        }

        // ☑️ CHECKBOX
        if (inputType === "checkbox") {
          return (
            <FormControl error={!!error} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    {...rest}
                  />
                }
                label={label}
              />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          );
        }

        // 🔄 SWITCH
        if (inputType === "switch") {
          return (
            <FormControl error={!!error} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    {...rest}
                  />
                }
                label={label}
              />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          );
        }

        // 📝 TEXT AREA
        if (inputType === "textarea") {
          return (
            <TextField
              fullWidth
              label={label}
              multiline
              rows={rest.rows || 4}
              error={!!error}
              helperText={error?.message}
              {...field}
              {...rest}
              sx={{ mb: 2 }}
            />
          );
        }

        // 📞 PHONE INPUT (react-phone-input-2 with theme alignment)
        if (inputType === "phone") {
          return (
            <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
              <InputLabel shrink>{label}</InputLabel>
              <StyledPhoneInputWrapper theme={theme}>
                <PhoneInput
                  country="in"
                  onlyCountries={["in"]}
                  disableDropdown={true}
                  disableCountryCode={false}
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  inputProps={{
                    name: field.name,
                    required: rest.required || false,
                  }}
                  specialLabel=""
                />
              </StyledPhoneInputWrapper>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          );
        }

        // 🔒 PASSWORD INPUT
        if (inputType === "password") {
          return (
            <TextField
              fullWidth
              label={label}
              type={showPassword ? "text" : "password"}
              error={!!error}
              helperText={error?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                },
              }}
              {...field}
              {...rest}
              sx={{ mb: 2 }}
            />
          );
        }

        // 📂 FILE INPUT (react-dropzone)
        if (inputType === "file") {
          return (
            <FileDropzoneField
              field={field}
              error={error}
              label={label}
              multiple={multiple}
              rowHeight={rowHeight}
              inputProps={rest}
            />
          );
        }

        // 🔤 TEXT FIELD
        return (
          <TextField
            fullWidth
            label={label}
            type={inputType}
            error={!!error}
            helperText={error?.message}
            {...field}
            {...rest}
            sx={{ mb: 2 }}
          />
        );
      }}
    />
  );
}

// props validation
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "select",
    "radio",
    "checkbox",
    "switch",
    "textarea",
    "phone",
    "file",
  ]),
  options: PropTypes.array,
  multiple: PropTypes.bool,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default FormInput;
