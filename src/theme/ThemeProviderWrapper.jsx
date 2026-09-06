import { createContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./";
import { cookies } from "../utility";

/*
  Google Fonts CDN URL
 */
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children, mode: externalMode }) => {
  const currentTheme = cookies.getCookie("user_theme")?.toLocaleLowerCase();
  const [mode, setMode] = useState(externalMode || currentTheme || "dark");

  useEffect(() => {
    if (externalMode) setMode(externalMode);
  }, [externalMode]);

  /*
    Inject Google Fonts stylesheet into document head
   */
  useEffect(() => {
    const id = "odbites-google-fonts";
    if (!document.getElementById(id)) {
      const preconnect1 = document.createElement("link");
      preconnect1.rel = "preconnect";
      preconnect1.href = "https://fonts.googleapis.com";
      document.head.appendChild(preconnect1);

      const preconnect2 = document.createElement("link");
      preconnect2.rel = "preconnect";
      preconnect2.href = "https://fonts.gstatic.com";
      preconnect2.crossOrigin = "anonymous";
      document.head.appendChild(preconnect2);

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS_URL;
      document.head.appendChild(link);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf(["light", "dark"]),
};

export { ThemeProviderWrapper, ThemeContext };
