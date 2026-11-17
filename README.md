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

## Donations with Flutterwave

The donation experience is available at `/donate`. It uses Flutterwave Standard hosted checkout, which means card and bank details are entered only on Flutterwave's secure payment page.

1. Copy `.env.example` to `.env` locally, then supply the Flutterwave keys as deployment environment variables. Never commit `.env`.
2. Set `NUXT_PUBLIC_SITE_URL=https://innovateohafia.com`. Flutterwave redirects donors to `https://innovateohafia.com/donate/complete` after checkout, where the payment status is confirmed and displayed.
3. Create a long random `NUXT_FLUTTERWAVE_WEBHOOK_HASH` value and add the same value as the webhook secret hash in the Flutterwave dashboard. Set the webhook URL to:

   ```text
   https://your-domain.com/api/flutterwave/webhook
   ```

4. Keep the integration on Flutterwave test keys until the full checkout and callback path has been tested, then replace them with live keys in the hosting provider's environment settings.

The callback page explicitly handles successful, pending, failed, and cancelled payments. The server creates every checkout session, generates the transaction reference, and independently calls Flutterwave's verification endpoint before displaying a successful receipt. After a successful verification, the donor receives a thank-you email with the confirmed amount and payment reference. Set `NUXT_RESEND_API_KEY` and `NUXT_DONATION_THANK_YOU_FROM` (a verified Resend sender) to enable it. The email uses the verified transaction ID as a Resend idempotency key, so it remains single-send when both the callback and webhook run. The webhook acknowledges pending payments (Flutterwave will notify it again once the payment has a final status), verifies only successful payments, and is protected by the configured `verif-hash` header.

`NUXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` is retained for a future Flutterwave inline checkout option. This hosted-checkout implementation does not expose or need the secret or encryption key in the browser.

## Community registrations

The "Join the community" button opens a modal that collects first name, last name, email address, and phone number. The server endpoint at `/api/community/join` upserts the member into Supabase, then sends a welcome email through Resend with the configured WhatsApp group link.

Before enabling it, create a `community_members` table with these columns and a unique constraint on `email`:

```sql
create table public.community_members (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone_number text not null,
  created_at timestamptz not null default now()
);
```

Then set the `NUXT_SUPABASE_URL`, `NUXT_SUPABASE_KEY`, `NUXT_RESEND_API_KEY`, `NUXT_COMMUNITY_WELCOME_FROM`, and `NUXT_COMMUNITY_WHATSAPP_GROUP_URL` values from `.env.example` in your deployment environment. They stay server-side; never prefix them with `NUXT_PUBLIC_`. `SUPABASE_URL` and `SUPABASE_KEY` are also accepted for an existing environment-variable setup.

## Keeping Supabase awake

Supabase Free projects are paused after about 7 days of low database activity, which would break community registrations. `GET /api/keepalive` makes a real read against the members table, using the same server-side Supabase credentials as registration, so it counts as activity. The endpoint is protected by a bearer token.

1. Generate a long random token (for example `openssl rand -hex 32`) and set it as `NUXT_KEEPALIVE_TOKEN` in your hosting environment.
2. In the GitHub repository, add two Actions secrets: `KEEPALIVE_URL` (for example `https://innovateohafia.com/api/keepalive`) and `KEEPALIVE_TOKEN` (the same token).
3. `.github/workflows/keepalive.yml` calls the endpoint at 00:17, 08:17, and 16:17 UTC every day. You can also run it manually from the Actions tab to verify the setup.

Check the Actions run log after the first manual trigger; a failing request means the URL, token, or Supabase credentials need attention. If the project is already paused, resume it from the Supabase dashboard first, since a ping cannot wake a paused project. GitHub disables scheduled workflows in public repositories after 60 days without repository activity, so if that applies, point the same URL and token at any external cron service instead.

If your Supabase project is on a paid plan this is unnecessary, because paid projects are never paused for inactivity.
