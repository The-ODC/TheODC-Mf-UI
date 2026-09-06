# The ODC MF UI Agent Notes

This folder is the shared UI remote repo-local context for future agents.

## Purpose

`The ODC-Mf-UI` is the module-federated shared UI package. It owns layouts,
theme, reusable components, helpers, hooks, utilities, assets, and Storybook.

## Stack

- React 19
- Vite 6
- MUI 7
- Emotion
- React Router 7
- React Hook Form
- Zod
- Storybook 9
- Vite Module Federation

## File Map

- [ARCHITECTURE.md](ARCHITECTURE.md) - federation remote, exposed modules, and consumers.
- [THEME_AND_UI.md](THEME_AND_UI.md) - colors, theme modes, and layout ownership.
- [COMPONENTS_AND_PATTERNS.md](COMPONENTS_AND_PATTERNS.md) - shared components,
  hooks, utilities, and Storybook pattern.
- [SETUP_AND_RUN.md](SETUP_AND_RUN.md) - commands and ports.
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md) - repo-specific follow-ups.

## Consumer Contract

The remote name is `OdBitesMfUI` and the host apps consume:

```text
http://localhost:5000/assets/remoteEntry.js
```
