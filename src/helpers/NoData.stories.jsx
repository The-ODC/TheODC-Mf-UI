import React from "react";
import NoData from "./NoData";

export default {
  title: "helpers/NoData",
  component: NoData,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📭 NoData
A reusable component to show a friendly "No Data Found" UI with an icon, title, and optional description.

#### 📦 Import
\`\`\`js
import { RenderIf, NoData } from "TheOdcMfUI/helpers";
\`\`\`

#### 🛠️ Props
- **title** \`string\` – Main heading (default: "No Data Found")
- **description** \`string\` – Optional subtitle
- **children** \`ReactNode\` – Optional extra content (e.g., a CTA button or illustration)

> Commonly used when tables, lists, or charts have no data to display.
        `,
      },
    },
  },
};

export const Default = {
  args: {
    title: "No Data Found",
    description: "We couldn’t find anything matching your filters.",
    children: null,
  },
};

export const WithCTA = {
  args: {
    title: "No Orders Yet",
    description: "Start receiving orders to see them listed here.",
    children: <button>Explore Products</button>,
  },
};
