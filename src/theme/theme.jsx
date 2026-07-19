import {
  alpha,
  createTheme,
  darken,
  lighten,
  responsiveFontSizes,
} from "@mui/material/styles";
// 🎨 Color Constants
import { COLORS } from "./";

export const getTheme = (mode) => {
  let theme = createTheme({
    palette: {
      mode,
      primary: { main: COLORS.PRIMARY, contrastText: "#ffffff" },
      secondary: { main: COLORS.SECONDARY, contrastText: "#ffffff" },
      error: { main: COLORS.ERROR, contrastText: "#ffffff" },
      warning: { main: COLORS.WARNING, contrastText: "#ffffff" },
      success: { main: COLORS.SUCCESS, contrastText: "#ffffff" },
      info: { main: COLORS.INFO, contrastText: "#ffffff" },

      ...(mode === "light"
        ? {
            background: { default: COLORS.LIGHT_BG, paper: COLORS.LIGHT_PAPER },
            text: {
              primary: COLORS.LIGHT_TEXT_PRIMARY,
              secondary: COLORS.LIGHT_TEXT_SECONDARY,
            },
            divider: COLORS.LIGHT_DIVIDER,
          }
        : {
            background: { default: COLORS.DARK_BG, paper: COLORS.DARK_PAPER },
            text: {
              primary: COLORS.DARK_TEXT_PRIMARY,
              secondary: COLORS.DARK_TEXT_SECONDARY,
            },
            divider: COLORS.DARK_DIVIDER,
          }),
    },

    typography: {
      fontFamily: "'Montserrat', sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        "@media (max-width:960px)": { fontSize: "2.25rem" },
        "@media (max-width:600px)": { fontSize: "2rem" },
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        "@media (max-width:960px)": { fontSize: "1.85rem" },
        "@media (max-width:600px)": { fontSize: "1.75rem" },
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        "@media (max-width:960px)": { fontSize: "1.6rem" },
        "@media (max-width:600px)": { fontSize: "1.5rem" },
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        "@media (max-width:960px)": { fontSize: "1.35rem" },
        "@media (max-width:600px)": { fontSize: "1.25rem" },
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        "@media (max-width:960px)": { fontSize: "1.1rem" },
        "@media (max-width:600px)": { fontSize: "1rem" },
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        "@media (max-width:960px)": { fontSize: "0.9rem" },
        "@media (max-width:600px)": { fontSize: "0.875rem" },
      },
      body1: {
        fontSize: "1rem",
        "@media (max-width:960px)": { fontSize: "0.95rem" },
        "@media (max-width:600px)": { fontSize: "0.875rem" },
      },
      body2: {
        fontSize: "0.875rem",
        "@media (max-width:960px)": { fontSize: "0.825rem" },
        "@media (max-width:600px)": { fontSize: "0.75rem" },
      },
      subtitle1: { fontSize: "1rem" },
      subtitle2: { fontSize: "0.875rem" },
      button: { textTransform: "none", fontWeight: 600 },
      caption: { fontSize: "0.75rem" },
    },

    spacing: 8,

    components: {
      MuiButton: {
        defaultProps: { variant: "contained", color: "primary" },
        styleOverrides: {
          root: {
            borderRadius: "8px",
            padding: "10px 16px",
            transition: "0.3s",
          },
          sizeMicro: {
            padding: "5px 10px",
            fontSize: "0.8rem",
            borderRadius: "7px",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#1E1E1E",
            color: mode === "light" ? "#000" : "#fff",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: mode === "light" ? "#fff" : "#1E1E1E",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            padding: "12px",
            borderRadius: "8px",
            [theme.breakpoints.up("md")]: {
              padding: "24px",
            },
          }),
        },
      },

      MuiTextField: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              height: "45px",
              "& input": {
                padding: "8px 14px",
              },
            },
            "& .MuiInputBase-root.MuiInputBase-multiline": {
              height: "auto",
              padding: "8px 14px",
            },
            "& .MuiOutlinedInput-root": {
              height: "45px",
            },
            "& .MuiOutlinedInput-root.MuiInputBase-multiline": {
              height: "auto",
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            transform: "translate(14px, 11px) scale(1)",
          },
          shrink: {
            transform: "translate(14px, -9px) scale(0.75)",
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#000" : "#fff",
            borderRadius: "8px",
            height: "45px",
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: COLORS.PRIMARY,
            },
          },
        },
      },

      MuiRadio: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: COLORS.PRIMARY,
            },
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: COLORS.PRIMARY,
            },
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "light" ? COLORS.LIGHT_DIVIDER : COLORS.DARK_DIVIDER,
          },
        },
      },

      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#fff" : "#333",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "12px",
            color:
              mode === "light"
                ? COLORS.LIGHT_TEXT_PRIMARY
                : COLORS.DARK_TEXT_PRIMARY,
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { borderRadius: "6px", fontWeight: 600 },
        },
      },

      MuiListItem: {
        styleOverrides: {
          root: { borderRadius: "8px", transition: "0.3s" },
        },
      },

      MuiSnackbar: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: mode === "light" ? "#6C757D" : "#E0E0E0",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: mode === "light" ? "#6C757D" : "#E0E0E0",
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  // MUI 7.3+ component styles call these helpers from the theme object.
  // Hosts can resolve a newer MUI singleton than the MF build, so keep the
  // exposed shared theme shape compatible across patch versions.
  theme.alpha = theme.alpha || alpha;
  theme.lighten = theme.lighten || lighten;
  theme.darken = theme.darken || darken;

  return theme;
};
