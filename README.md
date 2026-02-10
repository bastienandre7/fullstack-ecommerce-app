This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
e-commerce
├─ app
│  ├─ (admin)
│  │  └─ admin
│  │     ├─ layout.tsx
│  │     ├─ orders
│  │     │  ├─ page.tsx
│  │     │  ├─ [id]
│  │     │  │  └─ page.tsx
│  │     │  └─ _components
│  │     │     └─ order-status-actions.tsx
│  │     ├─ page.tsx
│  │     ├─ products
│  │     │  ├─ new
│  │     │  │  ├─ page.tsx
│  │     │  │  └─ _components
│  │     │  │     └─ add-product-form.tsx
│  │     │  ├─ page.tsx
│  │     │  ├─ [productId]
│  │     │  │  ├─ page.tsx
│  │     │  │  └─ _components
│  │     │  │     └─ edit-product-form.tsx
│  │     │  └─ _components
│  │     │     ├─ category-dialog.tsx
│  │     │     ├─ delete-product-button.tsx
│  │     │     ├─ image-section.tsx
│  │     │     └─ variant-section.tsx
│  │     ├─ users
│  │     │  ├─ page.tsx
│  │     │  └─ [userId]
│  │     │     └─ page.tsx
│  │     └─ _components
│  │        └─ overview-chart.tsx
│  ├─ (auth)
│  │  └─ login
│  │     └─ page.tsx
│  ├─ (dashboard)
│  │  ├─ account
│  │  │  ├─ orders
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ profile
│  │  │     ├─ page.tsx
│  │  │     └─ _components
│  │  │        ├─ delete-account.tsx
│  │  │        └─ profile-form.tsx
│  │  └─ layout.tsx
│  ├─ (shop)
│  │  ├─ page.tsx
│  │  ├─ products
│  │  │  └─ [slug]
│  │  │     ├─ page.tsx
│  │  │     └─ _components
│  │  │        ├─ add-to-cart-button.tsx
│  │  │        ├─ product-gallery.tsx
│  │  │        ├─ quantity-selector.tsx
│  │  │        ├─ related-products.tsx
│  │  │        └─ variant-selector.tsx
│  │  ├─ success
│  │  │  └─ page.tsx
│  │  └─ _components
│  │     ├─ about-section.tsx
│  │     ├─ all-products.tsx
│  │     ├─ brand-values.tsx
│  │     ├─ faq-section.tsx
│  │     ├─ hero-section.tsx
│  │     ├─ testimonial-card.tsx
│  │     └─ testimonials-carousel.tsx
│  ├─ api
│  │  ├─ auth
│  │  │  └─ [...nextauth]
│  │  │     └─ route.ts
│  │  ├─ checkout
│  │  │  └─ route.ts
│  │  └─ webhook
│  │     └─ stripe
│  │        └─ route.ts
│  ├─ favicon.ico
│  ├─ generated
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
├─ auth.ts
├─ components
│  ├─ cart
│  │  └─ cart-content.tsx
│  ├─ layout
│  │  ├─ announcement-bar.tsx
│  │  ├─ footer.tsx
│  │  ├─ header
│  │  │  ├─ auth-buttons.tsx
│  │  │  ├─ cart-button.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ search-overlay.tsx
│  │  └─ newsletter-modal.tsx
│  ├─ shared
│  │  └─ product-card.tsx
│  └─ ui
│     ├─ accordion.tsx
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ carousel.tsx
│     ├─ dialog.tsx
│     ├─ dropdown-menu.tsx
│     ├─ field.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ logo.tsx
│     ├─ select.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sonner.tsx
│     ├─ switch.tsx
│     ├─ table.tsx
│     └─ textarea.tsx
├─ components.json
├─ eslint.config.mjs
├─ hooks
│  ├─ use-cart-drawer.ts
│  └─ use-cart.ts
├─ lib
│  ├─ actions
│  │  ├─ admin
│  │  │  ├─ categories.ts
│  │  │  ├─ index.ts
│  │  │  ├─ orders.ts
│  │  │  ├─ products.ts
│  │  │  └─ users.ts
│  │  ├─ orders.ts
│  │  ├─ products.ts
│  │  └─ user.ts
│  ├─ mails.ts
│  ├─ prisma.ts
│  ├─ stripe.ts
│  ├─ utils.ts
│  └─ validators
│     └─ product.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ prisma.config.ts
├─ proxy.ts
├─ public
│  ├─ hero-video.mp4
│  ├─ svg
│  │  ├─ apple-logo.svg
│  │  └─ google-icon.svg
│  └─ test.png
├─ README.md
├─ tsconfig.json
└─ types
   ├─ hero.ts
   ├─ index.ts
   └─ next-auth.d.ts

```
