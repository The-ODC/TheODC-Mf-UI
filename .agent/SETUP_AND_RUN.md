# Setup And Run

## Environment

Expected variables:

```text
VITE_APP_API_URL
VITE_APP_ASSETS_PATH
```

## Commands

```bash
npm install
npm start
npm run mf-start
npm run build
npm run lint
npm run storybook
npm run build-storybook
```

## Ports

```text
Vite dev: 5000
Vite preview: 5000
Storybook: 6006
Remote entry: http://localhost:5000/assets/remoteEntry.js
```

## Local Federation Run

For host consumption, prefer:

```bash
npm run mf-start
```

That builds in watch mode and serves the remote through Vite preview.

## Verification

For shared UI changes:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Inspect affected stories in Storybook.
4. Run the affected host app against this remote.
