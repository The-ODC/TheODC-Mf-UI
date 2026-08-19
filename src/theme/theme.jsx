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
      warning: { main: COLORS.WARNING, contrastText: "#ffffff" },
      info: { main: COLORS.INFO, contrastText: "#ffffff" },

      ...(mode === "light"
        ? {
            background: { default: COLORS.LIGHT_BG, paper: COLORS.LIGHT_PAPER },
            text: {
              primary: COLORS.LIGHT_TEXT_PRIMARY,
              secondary: COLORS.LIGHT_TEXT_SECONDARY,
            },
            divider: COLORS.LIGHT_DIVIDER,
            success: { main: "#00a86b", contrastText: "#ffffff" }, // Vibrant Jade Green
            error: { main: "#ff3b30", contrastText: "#ffffff" }, // Fiery Chili Crimson
          }
        : {
            background: { default: COLORS.DARK_BG, paper: COLORS.DARK_PAPER },
            text: {
              primary: COLORS.DARK_TEXT_PRIMARY,
              secondary: COLORS.DARK_TEXT_SECONDARY,
            },
            divider: COLORS.DARK_DIVIDER,
            success: { main: "#10d186", contrastText: "#ffffff" }, // Neon Emerald
            error: { main: "#ff453a", contrastText: "#ffffff" }, // High-Glow Crimson
          }),
    },

    typography: {
      fontFamily: "'Lora', 'Montserrat', sans-serif",
      h1: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "2.5rem",
        fontWeight: 400,
        "@media (max-width:960px)": { fontSize: "2.25rem" },
        "@media (max-width:600px)": { fontSize: "2rem" },
      },
      h2: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "2rem",
        fontWeight: 400,
        "@media (max-width:960px)": { fontSize: "1.85rem" },
        "@media (max-width:600px)": { fontSize: "1.75rem" },
      },
      h3: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1.75rem",
        fontWeight: 400,
        "@media (max-width:960px)": { fontSize: "1.6rem" },
        "@media (max-width:600px)": { fontSize: "1.5rem" },
      },
      h4: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1.5rem",
        fontWeight: 400,
        "@media (max-width:960px)": { fontSize: "1.35rem" },
        "@media (max-width:600px)": { fontSize: "1.25rem" },
      },
      h5: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1.25rem",
        fontWeight: 400,
        "@media (max-width:960px)": { fontSize: "1.1rem" },
        "@media (max-width:600px)": { fontSize: "1rem" },
      },
      h6: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1rem",
        fontWeight: 400,
        "@media (max-width:960px)": { fontSize: "0.9rem" },
        "@media (max-width:600px)": { fontSize: "0.875rem" },
      },
      body1: {
        fontFamily: "'Lora', serif",
        fontSize: "1rem",
        "@media (max-width:960px)": { fontSize: "0.95rem" },
        "@media (max-width:600px)": { fontSize: "0.875rem" },
      },
      body2: {
        fontFamily: "'Lora', serif",
        fontSize: "0.875rem",
        "@media (max-width:960px)": { fontSize: "0.825rem" },
        "@media (max-width:600px)": { fontSize: "0.75rem" },
      },
      subtitle1: { fontFamily: "'Lora', serif", fontSize: "1rem" },
      subtitle2: { fontFamily: "'Lora', serif", fontSize: "0.875rem" },
      button: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "none",
        fontWeight: 600,
      },
      caption: { fontFamily: "'Lora', serif", fontSize: "0.75rem" },
    },

    spacing: 8,

    components: {
      MuiButton: {
        defaultProps: { variant: "contained", color: "primary" },
        styleOverrides: {
          root: {
            borderRadius: "50px",
            padding: "10px 24px",
            transition: "0.3s",
            fontFamily: "'Montserrat', sans-serif",
          },
          sizeMicro: {
            padding: "5px 14px",
            fontSize: "0.8rem",
            borderRadius: "20px",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "light" ? COLORS.LIGHT_BG : COLORS.DARK_BG,
            color:
              mode === "light"
                ? COLORS.LIGHT_TEXT_PRIMARY
                : COLORS.DARK_TEXT_PRIMARY,
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              mode === "light" ? COLORS.LIGHT_PAPER : COLORS.DARK_PAPER,
            boxShadow:
              mode === "light"
                ? "0px 6px 24px rgba(11, 12, 16, 0.04)"
                : "0px 6px 24px rgba(0, 0, 0, 0.25)",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid",
            borderColor:
              mode === "light" ? COLORS.LIGHT_DIVIDER : COLORS.DARK_DIVIDER,
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
              borderRadius: "50px",
              "& input": {
                padding: "8px 20px",
              },
            },
            "& .MuiInputBase-root.MuiInputBase-multiline": {
              height: "auto",
              borderRadius: "20px",
              padding: "8px 20px",
            },
            "& .MuiOutlinedInput-root": {
              height: "45px",
              borderRadius: "50px",
            },
            "& .MuiOutlinedInput-root.MuiInputBase-multiline": {
              height: "auto",
              borderRadius: "20px",
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
            color:
              mode === "light"
                ? COLORS.LIGHT_TEXT_PRIMARY
                : COLORS.DARK_TEXT_PRIMARY,
            borderRadius: "50px",
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
            backgroundColor:
              mode === "light" ? COLORS.LIGHT_PAPER : COLORS.DARK_PAPER,
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
            borderBottom: "1px solid",
            borderBottomColor:
              mode === "light" ? COLORS.LIGHT_DIVIDER : COLORS.DARK_DIVIDER,
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

      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color:
              mode === "light"
                ? COLORS.LIGHT_TEXT_SECONDARY
                : COLORS.DARK_TEXT_SECONDARY,
          },
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
