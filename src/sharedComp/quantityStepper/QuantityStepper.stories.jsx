import { useState } from "react";
import QuantityStepper from "./index";

export default {
  title: "SharedComponents/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
};

const Template = (args) => {
  const [value, setValue] = useState(args.value);
  return <QuantityStepper {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  value: 1,
  min: 1,
  max: 10,
  size: "medium",
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 3,
  min: 1,
  max: 10,
  disabled: true,
};
