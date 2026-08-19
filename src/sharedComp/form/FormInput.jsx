import React, { useState } from "react";
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
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";
import { useDropzone } from "react-dropzone";
import { VITE_APP_ASSETS_PATH } from "../../config/env";

import "react-phone-input-2/lib/material.css";

const StyledDropzone = styled("div")(({ theme, isDragActive, rowHeight }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  color: isDragActive
    ? theme.palette.primary.main
    : theme.palette.text.secondary,
  backgroundColor: isDragActive ? theme.palette.text.primary : "transparent",
  transition: "border-color 0.2s, background-color 0.2s",
  height: `${rowHeight * 60}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function FileDropzoneField({
  field,
  error,
  label,
  multiple,
  rowHeight,
  inputProps,
}) {
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
    accept: inputProps.accept || "*/*",
  });

  const handleRemove = (indexToRemove) => {
    if (multiple) {
      const newFiles = files.filter((_, idx) => idx !== indexToRemove);
      field.onChange(newFiles);
    } else {
      field.onChange(null);
    }
  };

  return (
    <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
      <InputLabel shrink>{label}</InputLabel>
      <StyledDropzone
        {...getRootProps()}
        isDragActive={isDragActive ? 1 : 0}
        rowHeight={rowHeight}
      >
        <input {...getInputProps()} {...inputProps} />
        {isDragActive ? (
          <Typography>Drop files here...</Typography>
        ) : (
          <Typography>
            Drag & drop files here, or click to select files
          </Typography>
        )}
      </StyledDropzone>

      {files.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Selected file(s):
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {files.map((file, idx) => {
              let previewUrl = "";
              let fileName = "";
              if (file instanceof File) {
                previewUrl = URL.createObjectURL(file);
                fileName = file.name;
              } else if (typeof file === "string") {
                previewUrl =
                  file.startsWith("http") || file.startsWith("blob")
                    ? file
                    : file.startsWith("/")
                      ? `${VITE_APP_ASSETS_PATH}${file}`
                      : `${VITE_APP_ASSETS_PATH}/uploads/products/${file}`;
                fileName = file.substring(file.lastIndexOf("/") + 1);
              }

              return (
                <Box
                  key={`${fileName}-${idx + 1}`}
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <img
                    src={previewUrl}
                    alt={fileName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

FileDropzoneField.propTypes = {
  field: PropTypes.object.isRequired,
  error: PropTypes.object,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputProps: PropTypes.object,
};

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

      // Override material.css floating label that blocks input
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxHeight: 250,
        overflowY: "auto",
        border: `1px solid ${theme.palette.divider}`,
        fontFamily: theme.typography.fontFamily,
        zIndex: 1300,
      },
      ".country-list .country": {
        padding: "8px 12px 8px 46px",
        cursor: "pointer",
      },
      ".country-list .country:hover, .country-list .country.highlight": {
        backgroundColor: "transparent",
        color: theme.palette.primary.contrastText,
      },
    },
  }));

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
