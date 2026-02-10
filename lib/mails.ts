import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;
const EMAIL_FROM = "Prism Studio <onboarding@resend.dev>";
const ADMIN_EMAIL = "bloomtpl@gmail.com";

// Style commun pour tous les mails (CSS inline pour compatibilité Gmail)
const headStyle =
  "font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;";
const logoStyle =
  "font-size: 12px; font-weight: bold; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 60px;";
const textStyle =
  "font-size: 13px; line-height: 1.6; color: #111; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.05em;";
const footerStyle =
  "font-size: 10px; color: #999; margin-top: 60px; border-top: 1px solid #eee; padding-top: 20px; text-transform: uppercase; letter-spacing: 0.1em;";

export const mailer = {
  sendOrderConfirmation: async (
    email: string,
    orderId: string,
    total: number,
  ) => {
    return await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `ACQUISITION CONFIRMED - #${orderId.slice(-8).toUpperCase()}`,
      html: `
        <div style="${headStyle}">
          <div style="${logoStyle}">Prism Studio</div>
          <p style="${textStyle}">Thank you for your acquisition.</p>
          <p style="${textStyle}">Order #${orderId.slice(-8).toUpperCase()} has been confirmed.</p>
          <p style="${textStyle}">Total Amount: €${total.toFixed(2)}</p>
          <a href="${DOMAIN}/account/orders" style="display: inline-block; padding: 15px 25px; background: black; color: white; text-decoration: none; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em;">View Archive</a>
          <div style="${footerStyle}">Prism Studio — Digital and Physical Goods.</div>
        </div>
      `,
    });
  },

  sendShippingNotification: async (email: string, orderId: string) => {
    return await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `ORDER DISPATCHED - #${orderId.slice(-8).toUpperCase()}`,
      html: `
        <div style="${headStyle}">
          <div style="${logoStyle}">Prism Studio</div>
          <p style="${textStyle}">Your order is on its way.</p>
          <p style="${textStyle}">The studio has dispatched your package for order #${orderId.slice(-8).toUpperCase()}.</p>
          <p style="${textStyle}">Delivery timelines vary by destination.</p>
          <div style="${footerStyle}">Questions? Contact our logistics support.</div>
        </div>
      `,
    });
  },

  sendAdminAlert: async (orderId: string, total: number) => {
    return await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: "NEW TRANSACTION - ACTION REQUIRED",
      html: `
        <div style="${headStyle}">
          <p style="${textStyle}">New order received: €${total.toFixed(2)}</p>
          <p style="${textStyle}">ID: ${orderId}</p>
          <a href="${DOMAIN}/admin/orders">Access Admin Dashboard</a>
        </div>
      `,
    });
  },

  sendLowStockAlert: async (
    productName: string,
    variantName: string,
    remaining: number,
  ) => {
    return await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `⚠️ LOW STOCK ALERT: ${productName.toUpperCase()}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <p style="font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase;">Inventory Warning</p>
          <h1 style="font-size: 18px; margin: 20px 0;">${productName}</h1>
          <p style="font-size: 13px;">Variant: <strong>${variantName}</strong></p>
          <p style="font-size: 13px;">Remaining units: <span style="color: red; font-weight: bold;">${remaining}</span></p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/inventory" style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: black;">Restock Inventory</a>
        </div>
      `,
    });
  },
};
