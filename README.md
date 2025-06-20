# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Auth Pages Structure

- `layouts/auth.vue`: Handles the split-screen layout, logo, and quote.
- `components/AuthForm.vue`: Reusable form wrapper for login/register.
- `components/RegisterForm.vue`: Handles registration fields, validation, and emits submit.
- `pages/auth/register.vue`: Uses the layout and injects the register form.

## Global Types
- Defined in `types/index.d.ts` for form data and validation.

## Validation
- Uses `vee-validate` and `@vee-validate/rules` for robust form validation.

## Styling
- Tailwind CSS with a custom primary color palette.
