# Mithayi

Sweets e-commerce storefront built with Next.js (App Router, Cache Components) and the Mithayi CMS API.

## Getting started

```bash
cp .env.example .env.local   # then set NEXT_PUBLIC_API_URL
npm install
npm run dev
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | CMS API base URL, no trailing slash. Product images are served from its `/storage/**` path. |
| `NEXT_PUBLIC_TENANT_ID` | Sent as the `X-Tenant` header on every request (`mithayi`). |

Without `NEXT_PUBLIC_API_URL` the site still builds and renders, but catalog sections are empty.

## Pages

| Route | Data |
| --- | --- |
| `/` | featured categories and products |
| `/products`, `/categories/[slug]` | search, price filter, sort, pagination |
| `/products/[slug]` | variants, gallery, reviews, review form |
| `/cart`, `/checkout` | local cart, promo validation, order placement |
| `/blog`, `/blog/[slug]` | posts |
| `/faqs`, `/contact` | FAQs, enquiry form |

The settings API is intentionally not integrated yet.

## Structure

- `src/lib/api.ts` fetch client, error classes, query helper
- `src/lib/data.ts` cached read fetchers (`use cache`)
- `src/lib/cart-store.ts` cart and promo state in `localStorage`
- `src/data/shipping.ts` shipping options sent to checkout
