import Footer from "./Footer";

export default {
  title: "User/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isAuthenticated: { control: "boolean" },
  },
};

export const GuestUser = {
  args: {
    isAuthenticated: false,
  },
};

export const AuthenticatedUser = {
  args: {
    isAuthenticated: true,
  },
};
