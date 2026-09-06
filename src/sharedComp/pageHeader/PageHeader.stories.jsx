import PageHeader from "./index";

export default {
  title: "SharedComponents/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
  },
};

export const CulinaryMenu = {
  args: {
    title: "Signature Culinary Delights",
    subtitle:
      "Handcrafted recipes curated by master chefs with fresh, locally sourced organic ingredients.",
  },
};

export const OrderHistory = {
  args: {
    title: "Your Recent Orders",
    subtitle:
      "Track live cooking status, courier coordinates, and past receipts.",
  },
};

export const TitleOnly = {
  args: {
    title: "Explore Cuisines",
  },
};
