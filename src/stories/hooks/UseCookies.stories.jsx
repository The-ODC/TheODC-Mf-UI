import React, { useEffect, useState } from "react";
import { useCookies } from "../../hooks";

export default {
  title: "Hooks/useCookies",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
🔐 **useCookies Hook**
A custom React hook to manage cookies easily. Provides utility functions to get, set, and remove cookies.

#### 📦 Import
\`\`\`js
import { useCookies } from "OdBitesMfUI/hooks";
\`\`\`

## ✅ Returns
- \`getCookie(name: string)\` → Gets the cookie value.
- \`setCookie(name: string, value: string, options?)\` → Sets a cookie with optional config.
- \`removeCookie(name: string)\` → Deletes the cookie.
- \`cookies: Record<string, string>\` → All cookies as key-value pairs.
        `,
      },
    },
  },
};

export const Example = () => {
  const { getCookie, setCookie, removeCookie, cookies } = useCookies();
  const [input, setInput] = useState("");

  useEffect(() => {
    setCookie("example_token", "123456", { maxAgeMinutes: 10 });
  }, [setCookie]);

  return (
    <div style={{ padding: 20 }}>
      <h3>🍪 Cookie Playground</h3>

      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Set Cookie Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => setCookie("demo_cookie", input)}>Set</button>
        <button onClick={() => alert(getCookie("demo_cookie") || "Not Found")}>
          Get
        </button>
        <button onClick={() => removeCookie("demo_cookie")}>Remove</button>
      </div>

      <pre style={{ background: "#f6f8fa", padding: 12 }}>
        <strong>All Cookies:</strong>
        {"\n" + JSON.stringify(cookies, null, 2)}
      </pre>
    </div>
  );
};

Example.parameters = {
  docs: {
    source: {
      type: "code",
    },
    description: {
      story: `
📌 **Usage Example:**

\`\`\`js
const { getCookie, setCookie, removeCookie, cookies } = useCookies();

useEffect(() => {
  setCookie("auth_token", "abc123", { maxAgeMinutes: 30 });
}, []);
\`\`\`

This example sets a cookie on mount, and provides UI to get/set/remove a demo cookie.
      `,
    },
  },
};
