import NavBar from "./NavBar";

export default {
  title: "User/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  version: "1.0.0",
  profileData: {
    folderLocation: "https://i.pravatar.cc/150",
    profilePicture: "",
    firstName: "Jane",
    lastName: "Doe",
  },
  openLogoutDialog: () => alert("Logout requested"),
};
