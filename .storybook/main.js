import { mergeConfig } from "vite";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-onboarding"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) =>
          plugin &&
          plugin.name !== "originjs:federation" &&
          plugin.name !== "vite-plugin-notify-host-on-rebuild"
      );
    }
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": new URL("../src", import.meta.url).pathname,
        },
      },
    });
  },
};
export default config;
