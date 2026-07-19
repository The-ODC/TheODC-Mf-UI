# Theme And UI

## Theme Ownership

Theme code lives in `src/theme`.

Exports:

```text
ThemeProviderWrapper
ThemeContext
getTheme
COLORS
```

## Color Tokens

```text
PRIMARY: #FF6B35
SECONDARY: #354aff
ERROR: #E63946
WARNING: #FFB703
SUCCESS: #4CAF50
INFO: #2196F3
LIGHT_BG: #f7f7f7
LIGHT_PAPER: #FFFFFF
LIGHT_TEXT_PRIMARY: #212529
LIGHT_TEXT_SECONDARY: #6C757D
LIGHT_DIVIDER: #E0E0E0
DARK_BG: #121212
DARK_PAPER: #1E1E1E
DARK_TEXT_PRIMARY: #E0E0E0
DARK_TEXT_SECONDARY: #A0A0A0
DARK_DIVIDER: #333333
```

## Layouts

`src/layouts/AdminLayout.jsx` owns the admin shell:

- App bar
- Drawer navigation
- Theme toggle
- Profile popover
- Logout dialog
- Version display

`src/layouts/UserLayout.jsx` owns the customer shell:

- User nav
- Main content spacing
- Bottom nav dock
- Footer
- Logout dialog

## Theme Mode

`ThemeProviderWrapper` reads mode from `externalMode`, then `user_theme` cookie,
then defaults to dark. The current toggle changes local state only.
