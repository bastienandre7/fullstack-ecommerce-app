import type Stripe from "stripe";

export const FREE_SHIPPING_THRESHOLD = 8000;

export const STANDARD_SHIPPING_COST = 500;

export const EXPRESS_SHIPPING_COST = 1500;

export const SHIPPING_DELIVERY_ESTIMATES = {
  standard: {
    minimum: { unit: "business_day" as const, value: 3 },
    maximum: { unit: "business_day" as const, value: 5 },
  },
  express: {
    minimum: { unit: "business_day" as const, value: 1 },
    maximum: { unit: "business_day" as const, value: 2 },
  },
} as const;

export const ALLOWED_SHIPPING_COUNTRIES = [
  "FR",
  "BE",
  "CH",
  "CA",
  "US",
  "GB",
] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];
