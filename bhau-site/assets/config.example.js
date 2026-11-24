/**
 * Bhau Korde Masale - Local Configuration Template
 * 
 * INSTRUCTIONS:
 * 1. To use local credentials without entering them in the CRM UI, copy this file:
 *    cp config.example.js config.local.js
 * 2. Add your Razorpay Key ID and Key Secret in config.local.js.
 * 3. config.local.js is ignored by git (.gitignore) and will NEVER be pushed to GitHub.
 * 4. Alternatively, you can configure your keys directly inside the Staff CRM
 *    under 'Settings & Roles' > 'Razorpay Payment Gateway Integration', where they
 *    are saved securely in your browser's private local storage.
 */

window.BHAU_CONFIG = {
  // Replace with your Razorpay Key ID (e.g. rzp_live_... or rzp_test_...)
  razorpayKeyId: "",
  
  // Replace with your Razorpay Key Secret (NEVER commit this to GitHub!)
  razorpayKeySecret: "",
  
  // Environment Mode: 'live' or 'test'
  razorpayMode: "live",
  
  // Merchant Name displayed on the Razorpay checkout modal
  razorpayMerchantName: "Bhau Korde Masale"
};
