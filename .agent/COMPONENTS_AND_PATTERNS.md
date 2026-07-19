# Components And Patterns

## Shared Form Pattern

Main form control:

```text
src/sharedComp/form/FormInput.jsx
```

Supported modes include text, password, email, number, select, radio, checkbox,
switch, textarea, phone, and file.

The expected page pattern is:

```text
Zod schema
react-hook-form
useFormWithReinitialize when editing existing data
FormInput controls
mutation or local submit handler
toaster feedback
```

## Shared Components

Important shared component areas:

```text
src/sharedComp/buttons
src/sharedComp/dialogs
src/sharedComp/filterWrapper
src/sharedComp/form
src/sharedComp/profileAvatar
```

## Helpers, Hooks, Utilities

```text
src/helpers
src/hooks
src/hoc
src/utility
```

Common exports include `RenderIf`, `NoData`, `ErrorBoundary`, `useCookies`,
`useFormWithReinitialize`, `RestrictedToGuests`, and cookie helpers.

## Avatar Pattern

`src/sharedComp/profileAvatar` supports preview, file input, crop dialog, zoom,
and returning the cropped file through `onSave`.

## Change Rules

- Preserve exported module names because host apps import through federation.
- Treat layout props as public API.
- Validate shared component changes in Storybook and at least one host app.
