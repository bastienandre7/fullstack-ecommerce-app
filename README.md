# PRISM — E-Commerce Platform

PRISM is a fullstack e-commerce platform built with **Next.js, TypeScript and PostgreSQL**.

I built it to explore the different parts of a modern e-commerce application, from product browsing and authentication to payments, order management and an admin dashboard.

[**Live Demo →**](https://prism-fullstack-ecommerce-app.vercel.app/)

## ✨ Features

### 🛍️ Shopping Experience

PRISM includes a complete storefront with product categories, search, product variants, multi-image galleries and related products. The shopping cart is managed with Zustand and persists between sessions.

### 🔐 Authentication

Users can sign in with **Google, Apple or email magic links** using NextAuth.js. The application also includes protected routes and role-based access control for users and administrators.

### 💳 Payments & Orders

The checkout flow is powered by **Stripe**, including Checkout Sessions, webhook handling, order creation and payment status updates. Users can view their order history and receive confirmation emails.

### 🏪 Admin Dashboard

Administrators can manage products, variants, categories, users and orders through a dedicated dashboard. It also includes stock management, image uploads and basic analytics.

### 🎨 UI & UX

The interface is built with **Tailwind CSS and Radix UI**, with responsive layouts, accessible components, animations and real-time feedback through toast notifications.

## 🛠️ Tech Stack

**Framework:** Next.js 16 · React 19 · TypeScript<br>
**Styling:** Tailwind CSS 4 · Radix UI<br>
**Database:** PostgreSQL · Prisma<br>
**Authentication:** NextAuth.js<br>
**Payments:** Stripe<br>
**State:** Zustand<br>
**Forms & Validation:** React Hook Form · Zod<br>
**Email:** Resend<br>
**Charts:** Recharts<br>
**Deployment:** Vercel<br>

## 🔎 Technical Highlights

The project uses **Next.js App Router, Server Components and Server Actions** to keep most of the application server-side.

The database is structured with Prisma around users, products, variants, categories, images, orders and order items, with migrations handled through Prisma.

Stripe webhooks are verified before processing payment events, while authentication and authorization are handled through NextAuth.js and protected routes.

The application also uses **Next.js Image optimization, server-side data fetching and optimized database queries** to keep the storefront fast.

## 📌 What I Built

This project allowed me to work on a complete fullstack application rather than just a frontend interface, including:

* E-commerce product and inventory management
* Authentication and role-based access control
* Stripe payment integration and webhooks
* PostgreSQL database design
* Admin dashboard and CRUD operations
* Transactional emails
* Responsive and accessible UI
* Server Components and Server Actions

---

**Built with Next.js, TypeScript, PostgreSQL and Stripe.**
