import packageJson from "../../package.json";

export { ThemeContext, ThemeProviderWrapper } from "./ThemeProviderWrapper";
export { getTheme } from "./theme";
export {
  default as COLORS,
  COLORS as THEME_COLORS,
  CHART_PALETTE,
  STATUS_COLORS,
  BRAND_GRADIENTS,
} from "./colors";

// Log version in console
console.log(
  `%c
╭━━━━╮╭╮╱╱╱╱╱╱╱╱╱╱╱╱╭━━━╮╭━━━╮╭━━━╮
┃╭╮╭╮┃┃┃╱╱╱╱╱╱╱╱╱╱╱╱┃╭━╮┃┃╭━╮┃┃╭━╮┃
╰╯┃┃╰╯┃╰━┳━━╮╱╱╱╱╱╱╱┃┃╱┃┃┃┃╱┃┃┃┃╱╰╯
╱╱┃┃╱╱┃╭╮┃┃━┫╱╱╱╱╱╱╱┃┃╱┃┃┃┃╱┃┃┃┃╱╭╮
╱╱┃┃╱╱┃┃┃┃┃━┫╱╱╱╱╱╱╱┃╰━╯┃┃╰━╯┃┃╰━╯┃
╱╱╰╯╱╱╰╯╰┻━━╯╱╱╱╱╱╱╱╰━━━╯╰━━━╯╰━━━╯
  
%c Micro Frontend UI Started Successfully
%c The ODC Version: v${packageJson.version}
  `,
  `color: #4a90e2; font-weight: bold; line-height: 1.1; font-family: monospace;`,
  `color: #50c878; font-weight: 600; font-size: 14px; margin-top: 10px;`,
  `color: #6ca0dc; font-weight: 600; font-size: 12px; font-style: italic;`
);
