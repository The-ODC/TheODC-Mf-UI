import PageHeader from "./index";

export default {
  title: "SharedComponents/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    title: "Page title",
    subtitle:
      "This is a subtitle describing the current page and giving context.",
  },
};

export const TitleOnly = {
  args: {
    title: "Page title",
  },
};
