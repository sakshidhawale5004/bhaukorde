# Bhau Korde Masale (भाऊ कोरडे मसाले)
> **चवीने खाणार त्याला भाऊ देणार** · Panvel, Navi Mumbai

Authentic handcrafted Indian spice blends, stone-ground pure spice powders, and traditional homemade Maharashtrian pickles (Lonche).

---

## 🌟 Overview

This repository contains the complete responsive storefront and **Staff CRM & Commerce Admin Hub** for **Bhau Korde Masale**, synchronized with the brand design system and catalog.

### 🌐 Storefront Features
- **Modern Responsive Storefront**: Homepage with rotating hero banners, product showcases, customer reviews slider, and trust badges.
- **Category Portals**:
  - `blended-spices.html` — 19 handcrafted spice blends (Malvani, Kolhapuri, Bramhni Kala Goda, Super Sunday, etc.)
  - `spice-powder.html` — 5 stone-ground pure spice powders (Kashmiri Chili, Suruchi Mirchi, Halad, Jeera, Dhane)
  - `pickle.html` — 6 traditional pickles (Aamba Goad, Limbu Goad, Mirchi, Mix)
- **30+ Individual Product Detail Pages**: With pack size variant selector, real spice photos, ingredients, and nutritional lead notes.
- **Interactive Shopping Cart & WhatsApp Checkout**: Instant order formatting for WhatsApp ordering.
- **Contact & Inquiry Portal**: Direct inquiry submission connected directly to the CRM lead pipeline.

---

## 🛡️ Staff CRM & Commerce Admin Hub
*Dedicated administrative command center built following modern commerce CRM architecture (Reference: Vastu Adda Admin Hub).*

### ✨ Key CRM Features
1. **Isolated Administrative Interface**: No public site header/footer clutter. Clean, professional top app bar with live sync status.
2. **Synchronized Luxury Design**:
   - Matches brand terracotta (`#c8501e`), deep roast (`#382216`), and gold (`#d4952c`) palette.
   - Smooth Dark & Light theme switcher.
   - Interactive KPI cards with real-time totals and fulfillment pipeline status.
3. **100% Configurable Product Catalog**:
   - All 30 products pre-loaded with images, prices, pack sizes, and inventory.
   - Full CRUD capability: Add new product, edit existing product variants/prices, and delete products.
   - 1-click live stock status switcher (**In Stock** / **Low Stock** / **Out of Stock**).
   - Real-time two-way synchronization with the storefront cart.
4. **Orders Management**:
   - Full lifecycle tracking: `Pending Consecration`, `Packed / Processing`, `In Transit`, `Delivered`, `Cancelled`.
   - **WhatsApp Automated Messaging**: 1-click button to send pre-formatted Marathi/English order updates directly to customers.
   - **Printable Tax Invoice / Packing Slip**: Generates formatted print-ready invoice with GST details.
5. **Patron CRM**:
   - Customer segmentation (`VIP Patron`, `Loyal Buyer`, `New Customer`).
   - Lifetime spend tracker, order frequency, and private staff CRM notes.
   - Direct Concierge WhatsApp chat links.
6. **Inquiries & Leads Hub**:
   - Captures wholesale/distributor inquiries and retail customer leads.
   - Direct reply actions via WhatsApp, Email, or Phone.
7. **Settings & Data Management**:
   - Full database backup to encrypted JSON & 1-click restore.
   - CSV export utilities for Products, Orders, Customers, and Inquiries.
   - Factory catalog reset.
8. **Razorpay Payment Gateway Integration**:
   - **CRM Gateway Settings**: Configure Razorpay Key ID, Key Secret, Sandbox/Live mode, and brand color directly in CRM settings.
   - **Storefront Checkout SDK**: Dual checkout flow with instant Razorpay online payment (UPI, GPay, PhonePe, Cards, Netbanking) and WhatsApp COD.
   - **Direct Payment Links**: 1-click button in CRM Orders to generate and send secure online payment links to WhatsApp customers.
   - **Invoicing & Billing**: Tax invoices and packing slips automatically display Razorpay Transaction IDs and payment settlement status.
   - **CSV Accounting**: Exports transaction references and payment statuses for accounting and GST filing.
9. **Zero-SMTP Direct Email Notification Engine (`bhaukorde1975@gmail.com`)**:
   - **Zero Configuration Required**: Uses a direct cloud email gateway (FormSubmit API) so all order bookings, customer details, and inquiries arrive in your inbox without needing Google App passwords, SMTP ports, or running backend server processes.
   - **Instant Order Booking Alerts**: Automatically delivers full order breakdowns to `bhaukorde1975@gmail.com` for both Cash on Delivery (COD) and Razorpay online payments.
   - **Customer Lead Inquiries**: Delivers contact form messages and inquiries directly to your inbox.
   - **Payment Failure Alerts**: Immediate alerts when an online checkout drops off or is declined so you can follow up with customers.
   - **Staff CRM Email Gateway**: Manage recipient, triggers, and trigger test email delivery with live audit logs in the CRM.
   - **Customer Email Receipt**: Automatic email copy button in checkout modal for customer convenience.

---

## 🚀 Running the Store & SMTP Server

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure your credentials in `.env`**:
   Copy `.env.example` to `.env` (it is already in `.gitignore`):
   ```env
   PORT=3000
   NOTIFICATION_EMAIL=bhaukorde1975@gmail.com

   # Razorpay Credentials
   RAZORPAY_KEY_ID=rzp_live_your_key_id
   RAZORPAY_KEY_SECRET=your_private_key_secret

   # Gmail SMTP Credentials
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=bhaukorde1975@gmail.com
   SMTP_PASS=your_16_char_google_app_password
   ```
   > **Note on Gmail SMTP**: Generate a 16-character App Password at [Google Account > Security > 2-Step Verification > App Passwords](https://myaccount.google.com/apppasswords).

3. **Start the server**:
   ```bash
   npm start
   ```
   The site will be live at `http://localhost:3000` with automated SMTP dispatch active.


## 🔐 Staff CRM Login

To access the CRM:
- Navigate to **`bhau-site/admin.html`** or **`bhau-site/admin/`**
- **Default Username**: `admin`
- **Default Password**: `bhau2026`
*(Or use the 1-Click Auto Login button on the login screen).*

---

## 📂 Project Structure

```text
├── admin.html               # Root redirect to Staff CRM
├── index.html               # Root redirect to Storefront
├── README.md                # Documentation
└── bhau-site/
    ├── index.html           # Main storefront homepage
    ├── about.html           # Brand story and heritage
    ├── contact.html         # Contact form & store location map
    ├── cart.html            # Cart & checkout review
    ├── blended-spices.html  # Blended spices collection
    ├── spice-powder.html    # Pure spice powder collection
    ├── pickle.html          # Pickles & lonche collection
    ├── admin.html           # Staff CRM & Commerce Admin Hub
    ├── admin/
    │   └── index.html       # Standalone admin endpoint (/admin/)
    ├── assets/
    │   ├── cart.css         # Cart & shop modal styles
    │   ├── cart.js          # Cart logic & dynamic CRM catalog sync
    │   ├── crm.css          # CRM luxury design system stylesheet
    │   └── crm.js           # Reactive CRM state & CRUD operations
    ├── images/              # High-resolution spice product imagery
    └── product-*.html       # 30+ individual product detail pages
```

---

## 📄 License
© 2024–2026 Bhau Korde Masale. All rights reserved.
