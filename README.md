# PRISM — E-Commerce Platform

A production-ready e-commerce platform I built to demonstrate full-stack development expertise. This personal project showcases a complete shopping experience with authentication, payment processing, admin dashboard, and order management using modern web technologies.

## 🎯 About the Project

PRISM is a comprehensive e-commerce application I developed to explore the complete lifecycle of online retail—from product browsing to payment processing. The goal was to create a scalable, production-ready platform that handles real-world e-commerce challenges including inventory management, secure payments, user authentication, and admin operations.

## ✨ Features Implemented

### 🛍️ Shopping Experience

- Complete product catalog with category filtering
- Product variants (size, color, custom options) with individual pricing
- Real-time shopping cart with persistent state using Zustand
- Advanced search functionality with overlay interface
- Multi-image product galleries with carousel navigation
- Intelligent product recommendation system

### 🔐 Authentication & User Management

- Multi-provider authentication (Google, Apple, Email)
- Secure session management with NextAuth.js v5
- Passwordless magic link authentication via Resend
- User dashboard with order history and profile management
- Role-based access control (Admin/User)
- Protected routes with middleware

### 💳 Payment & Orders

- Complete Stripe integration for payment processing
- Secure checkout flow with hosted payment pages
- Real-time order tracking and status updates
- Automatic receipt generation
- Stripe webhook handling for payment events
- Order confirmation emails

### 🏪 Admin Dashboard

- Comprehensive product management (CRUD operations)
- Product variant management with stock tracking
- Category organization and management
- Order management and tracking system
- User account monitoring
- Analytics dashboard with charts and statistics
- Image upload and management system

### 🎨 UI & Design System

- Modern, responsive interface with Tailwind CSS v4
- Accessible component library using Radix UI
- Toast notifications for real-time feedback
- Smooth animations and transitions
- Mobile responsive design

### 🛠 Tech Stack

- **Framework**: Next.js 16.1 with App Router
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Email**: Resend
- **UI Components**: Radix UI
- **Charts**: Recharts

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

## 🎨 Technical Highlights

### Database Design
Comprehensive PostgreSQL schema with:

- User - Authentication and profiles
- Product - Core product information
- Variant - Product options (size, color, custom)
- Category - Product organization
- Image - Multi-image support
- Order - Order tracking
- OrderItem - Line items with variants

### Authentication Flow

- Multi-provider sign-in (Google, Apple, Magic Link)
- NextAuth.js OAuth flow or email verification
- User data persisted with Prisma
- JWT session with role attachment
- Middleware-based route protection
- Role-based access control

### Payment Processing

- Cart management with Zustand
- Stripe Checkout Session creation
- Hosted payment page redirect
- Webhook verification and processing
- Order status updates
- Receipt generation and email notification
- Success page redirect

### Admin Operations

- Full CRUD for products and variants
- Bulk operations support
- Image upload and management
- Order fulfillment workflow
- User role management
- Analytics and reporting

## 💡 Skills Demonstrated

- Full-Stack E-Commerce: Complete shopping platform from browsing to checkout
- Payment Integration: Stripe API, webhooks, security best practices
- Authentication: Multi-provider auth, session management, RBAC
- Database Design: Normalized schema, relationships, migrations
- State Management: Zustand for cart, form state with React Hook Form
- API Development: RESTful endpoints, server actions, webhook handling
- Admin Systems: CRUD operations, bulk actions, analytics
- Email Integration: Transactional emails, templates
- TypeScript: Advanced typing, Prisma-generated types, Zod validation
- Modern React: Server Components, Server Actions, React 19
- UI/UX: Responsive design, accessibility
- DevOps: Environment configuration, migrations, deployment

## 🔧 Key Features Breakdown

### Product Management

- Multi-variant support (size, color, custom options)
- Individual pricing and stock per variant
- Multiple image uploads per product
- Category-based organization
- Related products algorithm

### Order System

- Real-time status tracking
- Email confirmations
- Receipt generation via Stripe
- Order history for users
- Admin fulfillment interface

### Security

- Role-based access control
- Protected routes with middleware
- Stripe webhook signature verification
- Secure session management
- Environment variable validation

## 📊 Performance Optimizations

- Server Components for reduced client bundle
- Optimistic UI updates for cart operations
- Image optimization with Next.js Image
- Database query optimization with Prisma
- Webhook signature verification for security
- Edge middleware for route protection

## 🔗 Links

Live Demo: (https://prism-fullstack-ecommerce-app.vercel.app/)

---

Developed by Bastien Andre
