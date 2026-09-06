import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import svgr from "vite-plugin-svgr";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    federation({
      name: "OdBitesMfUI",
      filename: "remoteEntry.js",
      exposes: {
        "./sharedComp": "./src/sharedComp",
        "./user": "./src/user",
        "./admin": "./src/admin",
        "./helpers": "./src/helpers",
        "./theme": "./src/theme",
        "./layouts": "./src/layouts",
        "./assets": "./src/assets",
        "./hooks": "./src/hooks",
        "./hoc": "./src/hoc",
        "./utility": "./src/utility",
        "./sharedComp/buttons": "./src/sharedComp/buttons",
        "./sharedComp/filterWrapper": "./src/sharedComp/filterWrapper",
        "./sharedComp/form": "./src/sharedComp/form",
        "./sharedComp/pageHeader": "./src/sharedComp/pageHeader",
        "./sharedComp/profileAvatar": "./src/sharedComp/profileAvatar",
        "./helpers/noData": "./src/helpers/NoData.jsx",
        "./utility/assets": "./src/utility/assets",
        "./utility/formatters": "./src/utility/formatters",
        "./utility/http": "./src/utility/http",
        "./hooks/useStorageState": "./src/hooks/useStorageState",
        "./hooks/useLocalStorageState": "./src/hooks/useLocalStorageState",
        "./hoc/routeGuard": "./src/hoc/RouteGuard.jsx",
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^19.0.0",
        },
        "@mui/material": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^7.0.0",
        },
        "@emotion/react": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^11.14.0",
        },
        "@emotion/styled": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^11.14.0",
        },
        "react-router-dom": { singleton: true, strictVersion: true },
        "prop-types": { singleton: true, strictVersion: true },
        "react-hook-form": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^7.56.0",
        },
        "@hookform/resolvers": { singleton: true, strictVersion: true },
        zod: { singleton: true, strictVersion: true },
      },
    }),
    {
      name: "vite-plugin-notify-host-on-rebuild",
      apply(config, { command }) {
        return Boolean(command === "build" && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch("http://localhost:5000/__fullReload");
          } catch (e) {
            console.error("Failed to notify host on rebuild:", e);
          }
        }
      },
    },
  ],
  preview: {
    port: 5000,
    strictPort: true,
    headers: corsHeaders,
  },
  server: {
    port: 5000,
    cors: true,
    headers: corsHeaders,
  },
  optimizeDeps: {},
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
