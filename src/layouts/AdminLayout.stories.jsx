import React from "react";
import { AdminLayout } from ".";

export default {
  title: "Layouts/AdminLayout",
  component: AdminLayout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📘 AdminLayout
Use this layout for all admin pages. It includes header, sidebar, and main content area.

#### 📦 Import
\`\`\`js
import { AdminLayout } from "TheOdcMfUI/layouts";
\`\`\`

#### 🛠️ Props
- **version** \`string\` – Version of the application (e.g., "1.0.0")
- **openLogoutDialog** \`function\` – Function to open the logout confirmation dialog
- **children** \`ReactNode\` – Main content to be displayed in the layout

      `,
      },
    },
  },
};

export const Default = {
  args: {
    version: "1.0.0",
    openLogoutDialog: () => alert("Logout Dialog Triggered"),
    children: (
      <div>
        <h2>Main Content Area</h2>
        <p>This is where your page content goes.</p>
      </div>
    ),
  },
};
