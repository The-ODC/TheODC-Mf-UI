# MF UI Architecture

## Federation Remote

`vite.config.js` configures:

```text
name: OdBitesMfUI
filename: remoteEntry.js
port: 5000
```

Exposed modules:

```text
./sharedComp
./user
./admin
./helpers
./theme
./layouts
./assets
./hooks
./hoc
./utility
```

## Shared Dependencies

React, React DOM, MUI, Emotion, React Router, PropTypes, React Hook Form,
`@hookform/resolvers`, and Zod are singleton shared dependencies.

## Runtime Consumers

- `The ODC-Admin-FE` imports layouts, theme, shared form controls, helpers,
  hooks, HOCs, and cookie utilities.
- `The ODC-User-FE` imports user layout/theme/shared helpers from this remote.

## Ownership

This repo should not own business data fetching or admin/customer page logic.
Keep this repo focused on reusable UI, layout, theme, utilities, and shared
experience primitives.

## Storybook

Stories are discovered from:

```text
../src/**/*.mdx
../src/**/*.stories.@(js|jsx|mjs|ts|tsx)
```

Storybook is the best place to verify shared component changes before testing in
host apps.
