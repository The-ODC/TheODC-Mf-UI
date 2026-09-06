import NavBar from "./NavBar";

export default {
  title: "User/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    version: { control: "text" },
    isAuthenticated: { control: "boolean" },
    cartCount: { control: "number" },
  },
};

export const Authenticated = {
  args: {
    version: "1.2.0",
    isAuthenticated: true,
    cartCount: 3,
    profileData: {
      firstName: "Aarav",
      lastName: "Patel",
      email: "aarav.patel@example.com",
    },
    openLogoutDialog: () => alert("Logout dialog prompted"),
  },
};

export const Guest = {
  args: {
    version: "1.2.0",
    isAuthenticated: false,
    cartCount: 0,
    openLogoutDialog: () => {},
  },
};
