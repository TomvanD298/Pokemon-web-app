# Pokémon Web App

Graduation project by Tom — a static Next.js app for browsing and managing a Pokémon card collection.

## Installation

1. Clone the repository.
2. Go to the project root folder.
3. Use the Node.js version from `.nvmrc` (recommended: [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)).
4. Install dependencies: `npm i`.
5. Copy `.env.example` to `.env.local` (optional for local development).

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/en`.

## Build and deployment

This app uses **static export** and can be hosted on GitHub Pages without a Node.js server.

### Local static build

```bash
npm run build
```

Static files are generated in the `out/` folder. Preview locally:

```bash
npx serve out
```

For a GitHub Pages project site (e.g. `https://username.github.io/pokemon-web-app/`):

```bash
BASE_PATH=/pokemon-web-app npm run build
```

Leave `BASE_PATH` empty for local development.

### GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy-github-pages.yml` builds and deploys automatically.
4. For project sites, `BASE_PATH` is set to your repository name. For `username.github.io` repos, no base path is used.

### Docker (standalone server)

```bash
npm run build:standalone
npm start
```

## Internationalization

This project uses [next-intl](https://next-intl.dev/docs/getting-started). Configuration lives in `src/core/i18n/`.

- Use `Link`, `useRouter`, and `usePathname` from `@/core/i18n/navigation` (not from `next/link` or `next/navigation`).
- Use `useTranslations()` in client components and `getTranslations()` in server components.

Locale prefixes are always visible in the URL (e.g. `/en/collection`, `/nl/collection`). Visit `/` to be redirected to the default locale (`en`).

## Testing

```bash
npm test
```

Uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Quality assurance

- **ESLint** — `npm run lint:eslint`
- **Stylelint** — `npm run lint:css`
- **Prettier** — `npm run prettier`
- **TypeScript** — `npm run lint:tsc`

Pre-commit hooks run lint-staged via Husky.

## Project structure

```
src/
├── app/          # Next.js routes and layouts
├── core/         # Data, schemas, i18n, utilities
└── ui/           # Components, connectors, hooks, styles
```
