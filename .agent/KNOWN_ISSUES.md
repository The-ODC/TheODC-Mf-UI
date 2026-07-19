# Known Issues

## Bugs Or Risks

1. `MuiInputAdornment` and `MuiSvgIcon` overrides appear outside the `components`
   key in `src/theme/theme.jsx`, so MUI likely ignores them.
2. Theme toggle updates local state but does not persist back to `user_theme`.
3. Logout behavior overlaps with admin host behavior.
4. Storybook ESLint config repeats recommended config entries.
5. Several files contain mojibake text and should be normalized carefully.

## Follow-Up Recommendations

1. Fix theme override placement.
2. Persist theme toggle through the shared cookie helper.
3. Clarify layout logout API so host apps do not duplicate dialogs.
4. Add component tests for `FormInput`, `AvatarUpload`, dialogs, and layout shells.
5. Keep federation exports backward compatible when splitting repos.
