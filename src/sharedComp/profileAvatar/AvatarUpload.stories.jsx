import AvatarUpload from "./index";

export default {
  title: "SharedComponents/AvatarUpload",
  component: AvatarUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### 📷 AvatarUpload
Avatar allows users to upload and crop a profile picture using react-easy-crop.

#### 📦 Import
\`\`\`js
import { AvatarUpload } from "OdBitesMfUI/sharedComp";
\`\`\`

### Features
- Clickable Avatar with edit icon
- Image file input
- Cropping modal with zoom slider
- Returns a cropped image File via onSave callback
- 'viewOnly' mode for display without editing

### Props
- \`avatar\` (string): Initial avatar image URL
- \`onSave\` (function): Callback with cropped image
- \`viewOnly\` (boolean): If true, disables editing
- \`loading\` (boolean): Shows progress and blocks new selection
- \`disabled\` (boolean): Disables editing while keeping the editable visual style available
- \`size\` (number|string): Controls avatar and wrapper size
        `,
      },
    },
  },
};

export const Default = {
  args: {
    avatar: "https://i.pravatar.cc/150?img=8",
    viewOnly: false,
  },
};

export const ViewOnly = {
  args: {
    avatar: "https://i.pravatar.cc/150?img=12",
    viewOnly: true,
  },
};

export const Loading = {
  args: {
    avatar: "https://i.pravatar.cc/150?img=16",
    loading: true,
  },
};

export const Large = {
  args: {
    avatar: "https://i.pravatar.cc/150?img=24",
    size: 140,
  },
};
