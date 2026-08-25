import Button from "./Button";
import AddIcon from "@mui/icons-material/Add";

export default {
  title: "SharedComponents/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "inherit",
      ],
    },
    size: {
      control: "select",
      options: ["micro", "small", "medium", "large"],
    },
    loadingPosition: {
      control: "select",
      options: ["start", "end", "center"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export const Contained = {
  args: {
    variant: "contained",
    color: "primary",
    children: "Contained Button",
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    color: "primary",
    children: "Outlined Button",
  },
};

export const Text = {
  args: {
    variant: "text",
    color: "primary",
    children: "Text Button",
  },
};

export const MicroSize = {
  args: {
    size: "micro",
    children: "Micro Button",
  },
};

export const LoadingCenter = {
  args: {
    loading: true,
    loadingPosition: "center",
    loadingText: "Processing...",
    children: "Save Changes",
  },
};

export const LoadingStart = {
  args: {
    loading: true,
    loadingPosition: "start",
    loadingText: "Uploading...",
    children: "Upload File",
  },
};

export const WithIcon = {
  args: {
    startIcon: <AddIcon />,
    children: "Add New Item",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
