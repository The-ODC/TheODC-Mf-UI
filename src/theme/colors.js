export const COLORS = {
  // Brand Colors derived from The ODC Logo
  PRIMARY: "#E25822", // Terracotta Flame Orange (Logo Ring & The ODC typography)
  PRIMARY_HOVER: "#C84412",
  PRIMARY_LIGHT: "#F58245",
  PRIMARY_MUTED: "rgba(226, 88, 34, 0.12)",

  SECONDARY: "#6E3917", // Koraput Coffee & Handi Clay Brown (Logo Bowl & Subtext)
  SECONDARY_LIGHT: "#8C4A27",
  SECONDARY_MUTED: "rgba(110, 57, 23, 0.12)",

  WARNING: "#E59819", // Warm Jaggery Gold (Logo Flame Core)
  WARNING_MUTED: "rgba(229, 152, 25, 0.12)",

  SUCCESS: "#2D8A4E", // Fresh Herbal Leaf Green (Logo Leaf Accent)
  SUCCESS_MUTED: "rgba(45, 138, 78, 0.12)",

  ERROR: "#D32F2F", // Warm Crimson
  ERROR_MUTED: "rgba(211, 47, 47, 0.12)",

  INFO: "#1E88E5", // Ocean Blue
  INFO_MUTED: "rgba(30, 136, 229, 0.12)",

  // Light Theme Surfaces & Typography
  LIGHT_BG: "#FAF5EE", // Warm Linen Ivory
  LIGHT_PAPER: "#FFFFFF", // Pure Crisp White
  LIGHT_SURFACE_MUTED: "#F4EBE0", // Warm Muted Biscuit
  LIGHT_TEXT_PRIMARY: "#1D130C", // Deep Espresso Black
  LIGHT_TEXT_SECONDARY: "#6E6259", // Warm Muted Earth Slate
  LIGHT_DIVIDER: "#E8DFD3", // Subtle Warm Divider

  // Dark Theme Surfaces & Typography
  DARK_BG: "#14110F", // Dark Roast Espresso Background
  DARK_PAPER: "#201A16", // Warm Charcoal Clay Card Surface
  DARK_SURFACE_MUTED: "#1A1411", // Deep Muted Charcoal
  DARK_TEXT_PRIMARY: "#FAF5EE", // Warm Linen Ivory Text
  DARK_TEXT_SECONDARY: "#A89F91", // Warm Silver Tan Muted Text
  DARK_DIVIDER: "#2E2620", // Deep Roast Divider
};

export const CHART_PALETTE = [
  "#E25822", // Primary Terracotta Flame
  "#6E3917", // Koraput Coffee Brown
  "#E59819", // Warm Jaggery Gold
  "#2D8A4E", // Herbal Leaf Green
  "#1E88E5", // Info Ocean Blue
  "#8C4A27", // Earthen Amber Brown
  "#6E6259", // Warm Slate Brown
  "#A0522D", // Sienna Clay
  "#3A3026", // Dark Muted Espresso
];

export const STATUS_COLORS = {
  NEW: "#E59819", // Warning Amber
  COOKING: "#E25822", // Terracotta Flame
  ON_THE_WAY: "#1E88E5", // Ocean Blue
  DELIVERED: "#2D8A4E", // Herbal Green
  RETURNED: "#8C4A27", // Earthen Brown
  CANCELLED: "#D32F2F", // Error Red
  ACTIVE: "#2D8A4E", // Success Green
  OUT_OF_STOCK: "#D32F2F", // Error Red
};

export const BRAND_GRADIENTS = {
  HERO_LIGHT: "linear-gradient(135deg, #FAF5EE 0%, #FFFFFF 100%)",
  HERO_DARK: "linear-gradient(135deg, #14110F 0%, #201A16 100%)",
  PRIMARY_CTA: "linear-gradient(135deg, #E25822 0%, #C84412 100%)",
  AMBER_GLOW: "linear-gradient(135deg, #E59819 0%, #E25822 100%)",
};

export default COLORS;
