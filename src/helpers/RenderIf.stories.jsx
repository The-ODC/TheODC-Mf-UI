import React from "react";
import { Alert, Box } from "@mui/material";
import RenderIf from "./RenderIf";

export default {
  title: "Helpers/RenderIf",
  component: RenderIf,
  tags: ["autodocs"],
  argTypes: {
    render: {
      control: "boolean",
      description:
        "Controls whether the wrapped children are rendered or hidden",
    },
    children: {
      control: false,
      description: "React elements or text to be conditionally rendered",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### 🧩 RenderIf
A clean, declarative utility wrapper that conditionally renders its \`children\` based on a boolean \`render\` prop without messy nested ternaries.

#### 📦 Import
\`\`\`js
import { RenderIf } from "TheOdcMfUI/helpers";
\`\`\`

#### 💡 Usage
\`\`\`jsx
<RenderIf render={isUserLoggedIn}>
  <UserDashboard />
</RenderIf>
\`\`\`
        `,
      },
    },
  },
};

export const RenderVisible = {
  args: {
    render: true,
    children: (
      <Alert severity="success">
        🎉 <strong>Special Promo Code Applied:</strong> 20% discount will be
        applied at checkout!
      </Alert>
    ),
  },
};

export const AdminAccessBanner = {
  args: {
    render: true,
    children: (
      <Alert severity="info">
        🔒 <strong>Admin Access Granted:</strong> You have elevated permissions
        to edit live restaurant menus.
      </Alert>
    ),
  },
};

export const HiddenState = {
  args: {
    render: false,
    children: (
      <Alert severity="warning">
        This banner is hidden because <code>render=false</code>.
      </Alert>
    ),
  },
};
