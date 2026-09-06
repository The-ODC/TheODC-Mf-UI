import NavDock from "./NavDock";

export default {
  title: "User/NavDock",
  component: NavDock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "iphonese",
    },
  },
  argTypes: {
    isAuthenticated: { control: "boolean" },
  },
};

export const Guest = {
  args: {
    isAuthenticated: false,
  },
};

export const Authenticated = {
  args: {
    isAuthenticated: true,
  },
};
