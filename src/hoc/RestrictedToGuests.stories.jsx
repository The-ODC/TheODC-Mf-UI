import React from "react";
import RestrictedToGuests from "./RestrictedToGuests";

// Dummy component to test the HOC
const GuestOnlyComponent = () => (
  <div>Only visible to unauthenticated users</div>
);

const WrappedComponent = RestrictedToGuests(GuestOnlyComponent);

export default {
  title: "HOC/RestrictedToGuests",
  component: WrappedComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🔐 RestrictedToGuests
A Higher-Order Component (HOC) that **redirects authenticated users** away from guest-only pages.

#### 📦 Import
\`\`\`js
import { RestrictedToGuests } from "OdBitesMfUI/hoc";
\`\`\`

#### 🛠️ Usage
Wrap your guest-only components (e.g., Login, Register) like this:
\`\`\`jsx
const Login = () => { ... }
export default RestrictedToGuests(Login);
\`\`\`

#### 🔁 Behavior
- If \`auth_token\` is found in cookies, the user is redirected to \`/\`.
- If not, the wrapped component renders normally.
        `,
      },
    },
  },
};

export const Default = {
  render: () => <WrappedComponent />,
};
