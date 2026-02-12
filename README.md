# E-Commerce Starter Kit - PRISM

A modern, full-featured e-commerce platform built with **Next.js 16**, **TypeScript**, **React 19**, **Tailwind CSS**, **Stripe**, and **PostgreSQL**. This starter kit provides a production-ready foundation for building digital storefronts with authentication, product management, shopping cart, and payment processing.

## ✨ Features

### 🛍️ Shopping Features

- **Product Catalog** - Browse products by categories with detailed product pages
- **Product Variants** - Support for size, color, and custom variants with individual pricing and stock tracking
- **Shopping Cart** - Client-side cart management with persistent state using Zustand
- **Product Search** - Search overlay for quick product discovery
- **Image Gallery** - Multi-image product gallery with Carousel support
- **Related Products** - Intelligent product recommendations

### 👤 Authentication & Users

- **Multi-Provider Auth** - Sign in with Google, Apple, or Email (via Resend)
- **NextAuth.js v5** - Secure session management with JWT strategy
- **User Dashboard** - Account management, order history, and profile settings
- **Role-Based Access** - Admin and User roles with protected routes

### 💳 Payment Processing

- **Stripe Integration** - Complete payment processing and checkout flow
- **Order Management** - Create, track, and manage orders
- **Receipt URLs** - Automatic receipt generation via Stripe
- **Order Status Tracking** - Real-time order status with shipping information
- **Webhook Support** - Stripe webhook handling for payment events

### 🏪 Admin Dashboard

- **Product Management** - Create, edit, and delete products with variants
- **Category Management** - Organize products by categories
- **Order Management** - View and manage customer orders
- **User Management** - Monitor and manage user accounts
- **Dashboard Analytics** - Overview charts and statistics
- **Image Management** - Upload and organize product images

### 🎨 UI & UX

- **Modern Design** - Clean, responsive interface with Tailwind CSS
- **Dark Mode Support** - Theme switching with next-themes
- **Radix UI Components** - Accessible, composable UI components
  - Accordion, Avatar, Badge, Button, Card, Carousel
  - Dialog, Dropdown Menu, Form Fields, Label, Select
  - Separator, Sheet, Switch, Table
- **Toast Notifications** - Real-time feedback with Sonner
- **Email Notifications** - Order confirmations via Resend
- **Smooth Animations** - Motion animations for enhanced UX

### 📊 Database & Data

- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database access
- **Comprehensive Schema** - Users, Products, Orders, Variants, Categories, Images
- **Migrations** - Pre-configured migrations for all features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Stripe account (for payment processing)
- OAuth credentials (Google, Apple - optional)
- Resend API key (for email notifications - optional)

### Quick Start

#### 01 — Download & Extract

Download the PRISM template and extract the files to your local machine.

```
Extract the downloaded ZIP file to your desired location.
```

#### 02 — Open in VS Code

Open the project folder in Visual Studio Code.

```bash
code .
```

#### 03 — Install Dependencies

Install all required packages using npm.

```bash
npm install
```

#### 04 — Create Environment File

Copy the example environment file to get started.

```bash
cp .env.example .env.local
```

This creates your `.env.local` file. You'll configure it in the next steps.

---

### Database Setup

#### 01 — Initialize Prisma

Run the initialization command. You will be prompted to log in to Prisma, select a server region, and name your project.

```bash
npx prisma init --db
```

> **Post-Initialization:** After the command finishes, specific instructions and your **Database URL** will appear in your terminal. Copy this URL immediately.

#### 02 — Configure Database URL

Paste your Database URL into your `.env.local` file. Ensure the SSL mode is present at the end.

```env
# Important: Ensure the SSL mode is present at the end
DATABASE_URL="postgres://user:password@host:port/dbname?sslmode=require"
```

> **Important:** If you are using a cloud provider like Neon or Supabase, omitting `?sslmode=require` will likely cause connection timeouts.

#### 03 — Sync & Generate

Push the schema to your database and generate the Prisma Client.

```bash
# Push schema to database
npx prisma migrate dev

# Generate local types
npx prisma generate
```

---

### Authentication Setup

> **Pro Tips:** Start with Email (Resend) authentication only. Social providers can be added later as you scale. The app will work perfectly with just Resend configured.

#### 01 — Generate Auth Secret

Run this to generate your session encryption key.

```bash
npx auth secret
```

This command will generate an `AUTH_SECRET` value. Copy it to your `.env.local` file.

#### 02 — Magic Links Email Auth

Email authentication via Resend (passwordless login).

1. Create an API Key at [resend.com](https://resend.com)
2. Set `RESEND_API_KEY` in your `.env.local`
3. Use `onboarding@resend.dev` as `EMAIL_FROM` for instant testing

```env
AUTH_SECRET="your-generated-secret"
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# NEXTAUTH Variables
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
```

> **Note:** When using the onboarding email, you can only send magic links to the email address associated with your Resend account.

#### 03 — Protected Routes

Routes protected by NextAuth.js middleware.

- `/admin/*` - Requires ADMIN role
- `/account/*` - Requires authentication
- `/checkout` - Requires authentication

#### 04 — OPTIONAL: Social Providers

Add Google and Apple OAuth for enhanced user experience (optional, add later as you scale).

##### Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add Redirect URI: `YOUR_URL/api/auth/callback/google`

##### Apple OAuth

1. Register in [developer.apple.com](https://developer.apple.com)
2. Create App ID with "Sign in with Apple" capability
3. Create a Service ID
4. Create a private key for authentication
5. Add Redirect URI: `YOUR_URL/api/auth/callback/apple`

```env
# Required for Social Login
AUTH_GOOGLE_ID="your_google_id"
AUTH_GOOGLE_SECRET="your_google_secret"

AUTH_APPLE_ID="your_apple_id"
AUTH_APPLE_TEAM_ID="your_apple_team_id"
AUTH_APPLE_KEY_ID="your_apple_key_id"
AUTH_APPLE_PRIVATE_KEY="your_apple_private_key"
```

#### 05 — Test Authentication

Start the development server and test your auth setup.

```bash
npm run dev
```

Go to `http://localhost:3000` and test the login via email. Sign in using your Resend account email to verify everything is working.

---

### Stripe Configuration

#### 01 — Stripe Keys

Add your Stripe API keys from the dashboard.

```env
# Get these from Stripe Dashboard > Developers > API Keys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

#### 02 — Webhooks Local Development

Listen to Stripe events locally using the Stripe CLI. This updates your database upon payment.

1. Install Stripe CLI from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Run the webhook forwarding command:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

> **Copy the Webhook Secret:** The CLI will output a `whsec_...` key. Copy this into your `.env.local` as `STRIPE_WEBHOOK_SECRET`

```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

> **Note:** Use `/webhook/stripe` (singular) as the endpoint. Keep the CLI running while you test locally.

#### 03 — Webhook Setup Production

Configure Stripe webhooks to receive payment events in production.

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add an endpoint" and enter: `https://yourdomain.com/api/webhook/stripe`
3. Select events: `payment_intent.succeeded`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in production `.env`

#### 04 — Payment Flow

How payments are processed in your store.

1. Customer adds products to cart
2. Checkout button creates Stripe session
3. User redirected to Stripe hosted checkout
4. Payment processed by Stripe
5. Webhook confirms payment
6. Order status updated, receipt generated
7. Confirmation email sent
8. User redirected to success page

## 📁 Project Structure

```
e-commerce/
├── app/                           # Next.js App Router
│   ├── (admin)/                   # Admin dashboard routes
│   │   └── admin/
│   │       ├── products/          # Product management
│   │       ├── orders/            # Order management
│   │       ├── users/             # User management
│   │       └── _components/       # Admin-specific components
│   ├── (auth)/                    # Authentication routes
│   │   └── login/
│   ├── (dashboard)/               # User dashboard routes
│   │   ├── account/               # User account & profile
│   │   └── orders/                # User order history
│   ├── (shop)/                    # Public storefront
│   │   ├── products/              # Product detail pages
│   │   ├── success/               # Order success page
│   │   └── _components/           # Shop components
│   ├── api/                       # API routes
│   │   ├── auth/                  # NextAuth.js routes
│   │   ├── checkout/              # Stripe checkout
│   │   └── webhook/stripe/        # Stripe webhooks
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   └── robots.ts & sitemap.ts     # SEO
├── components/                    # Reusable React components
│   ├── ui/                        # Radix UI components
│   ├── layout/                    # Header, Footer, Navigation
│   └── cart/                      # Shopping cart component
├── lib/                           # Utilities and helpers
│   ├── actions/                   # Server actions
│   │   ├── admin/                 # Admin actions
│   │   ├── products.ts            # Product operations
│   │   ├── orders.ts              # Order operations
│   │   └── user.ts                # User operations
│   ├── stripe.ts                  # Stripe initialization
│   ├── prisma.ts                  # Prisma client
│   ├── mails.ts                   # Email templates
│   └── utils.ts                   # Helper functions
├── hooks/                         # Custom React hooks
│   ├── use-cart.ts                # Cart state management
│   └── use-cart-drawer.ts         # Cart drawer state
├── types/                         # TypeScript type definitions
│   ├── index.ts                   # Core types
│   └── next-auth.d.ts             # Auth type extensions
├── prisma/                        # Database schema
│   ├── schema.prisma              # Data models
│   └── migrations/                # Database migrations
├── public/                        # Static assets
├── auth.ts                        # NextAuth.js configuration
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript config
└── package.json
```

## 🔧 Key Technologies

| Technology          | Version       | Purpose                         |
| ------------------- | ------------- | ------------------------------- |
| **Next.js**         | 16.1.4        | React framework with App Router |
| **React**           | 19.2.3        | UI library                      |
| **TypeScript**      | 5             | Type safety                     |
| **Tailwind CSS**    | 4             | Styling                         |
| **Prisma**          | 7.3.0         | ORM & Database                  |
| **NextAuth.js**     | 5.0.0-beta.30 | Authentication                  |
| **Stripe**          | 20.2.0        | Payment processing              |
| **Radix UI**        | 1.4.3         | Accessible components           |
| **Zustand**         | 5.0.10        | State management                |
| **React Hook Form** | 7.71.1        | Form handling                   |
| **Zod**             | 4.3.6         | Data validation                 |
| **Resend**          | 6.9.1         | Email service                   |
| **Recharts**        | 3.7.0         | Charts & graphs                 |

## 📊 Database Schema

The project includes these core models:

- **User** - Authentication & profile information
- **Product** - Product details with pricing
- **Variant** - Product variants (size, color, custom options)
- **Category** - Product categorization
- **Image** - Multi-image support per product
- **Order** - Customer orders with status tracking
- **OrderItem** - Individual items in orders
- **Account** - OAuth provider data
- **Session** - User session management
- **VerificationToken** - Email verification

## 🔐 Authentication Flow

1. User initiates sign-in with Google, Apple, or Email
2. NextAuth.js handles OAuth flow or email verification
3. User data stored in PostgreSQL via Prisma
4. JWT token created and stored in session
5. User role retrieved from database and attached to token
6. Protected routes checked via middleware

## 💳 Payment Flow

1. User adds products to cart
2. Checkout button initiates Stripe session creation
3. User redirected to Stripe hosted checkout
4. Payment processing via Stripe
5. Webhook confirms payment and updates order status
6. Receipt URL generated and stored
7. Confirmation email sent to customer
8. User redirected to success page

## 🛡️ Protected Routes

- **Admin Routes** (`/admin/*`) - Requires ADMIN role
- **Dashboard Routes** (`/account/*`) - Requires authentication
- **Checkout** - Requires authentication
- **API Routes** - Role-based access control

## 📝 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## 🌐 Environment Variables Checklist

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Your app URL for auth callbacks
- [ ] `NEXTAUTH_SECRET` - Secret key for JWT signing
- [ ] `STRIPE_SECRET_KEY` - Stripe secret API key
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- [ ] `STRIPE_WEBHOOK_SECRET` - Webhook signing secret
- [ ] `GOOGLE_ID` & `GOOGLE_SECRET` - Google OAuth (optional)
- [ ] `RESEND_API_KEY` - Email service (optional)
- [ ] `NEXT_PUBLIC_APP_URL` - Public app URL

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment-Specific Setup

- Update `NEXTAUTH_URL` to your production domain
- Configure OAuth redirect URIs in provider settings
- Update Stripe webhook endpoint
- Set `NODE_ENV=production`

## 📄 License

This starter kit is provided as-is for your use. Customize and build upon it for your needs.

## 🤝 Support & Customization

This is a fully customizable starter kit. Key areas for customization:

- **Branding** - Update colors, fonts, and logo in `app/globals.css` and metadata
- **Product Fields** - Extend Prisma schema with custom product attributes
- **Email Templates** - Customize email designs in `lib/mails.ts`
- **Payment Methods** - Add alternative payment providers
- **Shipping** - Integrate shipping APIs in `lib/constants/shipping.ts`
- **Content** - Update homepage sections in `app/(shop)/_components/`

---

**Happy building! 🎉**
