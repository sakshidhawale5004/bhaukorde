/**
 * Bhau Korde Masale - Zero-SMTP Direct Email Notification Engine
 * 
 * Delivers all order bookings, customer inquiries, and store alerts directly
 * to bhaukorde1975@gmail.com without requiring any SMTP passwords, ports,
 * or local server background processes.
 */

(function () {
  "use strict";

  const DEFAULT_TARGET_EMAIL = "bhaukorde1975@gmail.com";
  const STORAGE_KEY_LOGS = "bk_crm_email_logs";
  const STORAGE_KEY_SETTINGS = "bk_crm_settings";

  function getTargetEmail() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || "{}");
      return (s.notificationEmail || s.email || DEFAULT_TARGET_EMAIL).trim();
    } catch (e) {
      return DEFAULT_TARGET_EMAIL;
    }
  }

  function getEmailLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS) || "[]");
    } catch (e) {
      return [];
    }
  }

  function logEmail(type, recipient, subject, status, details) {
    try {
      const logs = getEmailLogs();
      const entry = {
        id: "MAIL-" + Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString(),
        formattedTime: new Date().toLocaleString("en-IN"),
        type: type, // 'order_booking', 'inquiry', 'failed_payment', 'test', 'alert'
        recipient: recipient || getTargetEmail(),
        subject: subject,
        status: status, // 'delivered', 'logged_offline', 'failed'
        details: details || ""
      };
      logs.unshift(entry);
      // Keep last 100 email logs in storage
      if (logs.length > 100) logs.pop();
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
      // Dispatch custom event for real-time CRM updates
      window.dispatchEvent(new CustomEvent("bk_email_logged", { detail: entry }));
      return entry;
    } catch (e) {
      console.warn("[BK_MAILER] Could not save email log:", e);
    }
  }

  function clearEmailLogs() {
    try {
      localStorage.removeItem(STORAGE_KEY_LOGS);
      window.dispatchEvent(new CustomEvent("bk_email_logged", { detail: null }));
    } catch (e) {}
  }

  /**
   * Helper to format items list into human-readable text block
   */
  function formatItemsText(items) {
    if (!Array.isArray(items) || !items.length) return "No item details";
    return items.map(function(item, idx) {
      const name = item.name || "Spice Product";
      const size = item.size || item.pack || "Standard";
      const qty = item.qty || 1;
      const rate = Number(item.price || 0);
      const sub = qty * rate;
      return `${idx + 1}. ${name} (${size}) x ${qty} = ₹${sub.toLocaleString("en-IN")}`;
    }).join("\n");
  }

  /**
   * Format currency helper
   */
  function rs(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  /**
   * Build structured payload for Order Booking
   */
  function buildOrderPayload(order, targetEmail) {
    const isPaid = (order.paymentStatus || "").toUpperCase() === "PAID" || (order.payment || "").includes("Razorpay");
    const paymentLabel = isPaid
      ? `PAID VIA RAZORPAY (Ref: ${order.paymentId || "Online"})`
      : `CASH ON DELIVERY (Pending ₹${order.total})`;

    const itemsSummary = formatItemsText(order.items);

    return {
      _subject: `🌶️ New Order Booking: ${order.id} - ${order.customer} (${rs(order.total)})`,
      _template: "table",
      _captcha: "false",
      _replyto: order.email && order.email.includes("@") ? order.email : undefined,
      "Order ID": order.id,
      "Order Date": order.date || new Date().toLocaleString("en-IN"),
      "Grand Total": rs(order.total),
      "Payment Status": paymentLabel,
      "Customer Name": order.customer,
      "Customer Phone": order.phone,
      "Customer Email": order.email || "Not Provided",
      "Delivery Address": `${order.address || "N/A"}${order.city ? ", " + order.city : ""}`,
      "Ordered Spices Breakdown": itemsSummary,
      "Special Instructions": order.packagingNotes || "None",
      "Dispatched Via": "Zero-SMTP Email Pipeline",
      "Store Location": "Bhau Korde Masale · Panvel, Navi Mumbai"
    };
  }

  /**
   * Build structured payload for Contact Inquiry
   */
  function buildInquiryPayload(inq, targetEmail) {
    return {
      _subject: `📬 New Website Inquiry from ${inq.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: inq.email && inq.email.includes("@") ? inq.email : undefined,
      "Lead Source": "Bhau Korde Website Contact Form",
      "Sender Name": inq.name,
      "Sender Phone": inq.phone || "Not Provided",
      "Sender Email": inq.email || "Not Provided",
      "Website / Company": inq.website || "N/A",
      "Date": inq.date || new Date().toLocaleString("en-IN"),
      "Customer Message": inq.message
    };
  }

  /**
   * Build structured payload for System Alert
   */
  function buildAlertPayload(title, message, data, targetEmail) {
    return {
      _subject: `⚠️ Store Alert: ${title || "Notification"}`,
      _template: "table",
      _captcha: "false",
      "Alert Title": title || "Store Notification",
      "Alert Details": message || "System event occurred",
      "Extra Context": data ? JSON.stringify(data, null, 2) : "None",
      "Timestamp": new Date().toLocaleString("en-IN"),
      "System": "Bhau Korde Masale Automated Engine"
    };
  }

  /**
   * Dispatch payload across zero-SMTP cloud gateway and local fallbacks
   */
  async function dispatchZeroSmtp(payload, targetEmail, fallbackEndpoints, rawData) {
    // 1. Native Hostinger PHP Mailer (Prioritized when hosted on web server)
    if (window.location.protocol.startsWith("http")) {
      const phpEndpoints = ["api/notify.php", "/api/notify.php", "../api/notify.php"];
      for (let i = 0; i < phpEndpoints.length; i++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(function () { controller.abort(); }, 5000);
          const resp = await fetch(phpEndpoints[i], {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rawData || payload),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (resp.ok) {
            const resData = await resp.json().catch(function () { return {}; });
            if (resData && (resData.success === true || resData.mode === "hostinger_php_mail" || resData.status === "success")) {
              return { ok: true, mode: "hostinger_php_mail", message: "Delivered via Native PHP Mailer to " + targetEmail, note: "Native Hostinger PHP Mail" };
            }
          }
        } catch (phpErr) {}
      }
    }

    // 2. Direct Cloud Zero-SMTP Gateway (FormSubmit API) - Works on all hosts & local
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(function () { controller.abort(); }, 9000);

      const gatewayUrl = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;
      const resp = await fetch(gatewayUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json().catch(function () { return {}; });
        const success = data.success === "true" || data.success === true || (data.message && data.message.includes("Activation"));
        if (success) {
          const detailNote = (data.message && data.message.includes("Activation"))
            ? "Sent (Action Required: Click 'Activate Form' in bhaukorde1975@gmail.com inbox once)"
            : "Direct Zero-SMTP Cloud Delivery";
          return { ok: true, mode: "zero_smtp", message: data.message || "Email delivered successfully", note: detailNote };
        }
      }
    } catch (gatewayErr) {
      console.warn("[BK_MAILER] Direct cloud gateway connection:", gatewayErr.message);
    }

    // 3. Relative Server Fallback (if hosted with Node server)
    if (Array.isArray(fallbackEndpoints) && fallbackEndpoints.length) {
      for (let i = 0; i < fallbackEndpoints.length; i++) {
        try {
          const endpoint = fallbackEndpoints[i];
          const url = (window.location.protocol.startsWith("http")) ? endpoint : `http://localhost:3000${endpoint}`;
          const controller = new AbortController();
          const timeoutId = setTimeout(function () { controller.abort(); }, 5000);

          const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rawData || payload),
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (resp.ok) {
            const resData = await resp.json().catch(function () { return {}; });
            if (resData && (resData.success || resData.status === "success" || resData.status === "online")) {
              return { ok: true, mode: resData.mode || "server_relay", message: resData.message || "Delivered via server relay" };
            }
          }
        } catch (serverErr) {}
      }
    }

    return { ok: false };
  }

  /**
   * Send Order Booking Notification
   * @param {Object} order The complete order object
   */
  async function notifyOrder(order) {
    if (!order || !order.id) return { success: false, error: "Invalid order data" };
    const targetEmail = getTargetEmail();
    const subject = `🌶️ New Order Booking: ${order.id} - ${order.customer} (${rs(order.total)})`;

    console.log(`[BK_MAILER] Dispatching Zero-SMTP order notification for #${order.id} to ${targetEmail}...`);

    const payload = buildOrderPayload(order, targetEmail);
    const fallbacks = ["/api/notify/order", "api/notify.php", "../api/notify.php"];
    const result = await dispatchZeroSmtp(payload, targetEmail, fallbacks, order);

    if (result.ok) {
      const detailStr = result.note || `Order #${order.id} for ${rs(order.total)} (${order.payment}) - ${result.mode}`;
      logEmail("order_booking", targetEmail, subject, "delivered", detailStr);
      return { success: true, mode: result.mode, recipient: targetEmail };
    }

    // Offline recording fallback
    logEmail("order_booking", targetEmail, subject, "logged_offline", `Order #${order.id} for ${rs(order.total)} - Logged locally`);
    return { success: true, mode: "logged_offline", recipient: targetEmail };
  }

  /**
   * Send Contact Inquiry Notification
   * @param {Object} inquiry { name, email, phone, website, message }
   */
  async function notifyInquiry(inquiry) {
    if (!inquiry || !inquiry.name) return { success: false, error: "Invalid inquiry data" };
    const targetEmail = getTargetEmail();
    const subject = `📬 New Website Inquiry from ${inqName(inquiry.name)}`;

    const payload = buildInquiryPayload(inquiry, targetEmail);
    const fallbacks = ["/api/notify/inquiry", "api/notify.php", "../api/notify.php"];
    const result = await dispatchZeroSmtp(payload, targetEmail, fallbacks, inquiry);

    if (result.ok) {
      logEmail("inquiry", targetEmail, subject, "delivered", `Lead from ${inquiry.name} (${inquiry.phone || inquiry.email || "No contact"})`);
      return { success: true, mode: result.mode };
    }

    logEmail("inquiry", targetEmail, subject, "logged_offline", `Lead from ${inquiry.name} - Logged locally`);
    return { success: true, mode: "logged_offline" };
  }

  function inqName(name) {
    return String(name || "Customer").trim();
  }

  /**
   * Send Alert Notification (Failed Payment, Low Stock, etc.)
   */
  async function notifyAlert(type, title, message, data) {
    const targetEmail = getTargetEmail();
    const subject = `⚠️ ${title || "Store Alert"}`;

    const payload = buildAlertPayload(title, message, data, targetEmail);
    const fallbacks = ["/api/notify/alert", "api/notify.php", "../api/notify.php"];
    const result = await dispatchZeroSmtp(payload, targetEmail, fallbacks, { type, title, message, data });

    if (result.ok) {
      logEmail("alert", targetEmail, subject, "delivered", message);
      return { success: true, mode: result.mode };
    }

    logEmail("alert", targetEmail, subject, "logged_offline", message);
    return { success: true, mode: "logged_offline" };
  }

  /**
   * Send Payment Failure Notice
   */
  function notifyFailedPayment(custInfo, cart, orderAmount, reason) {
    const title = `Payment Declined / Cancelled: ${rs(orderAmount)}`;
    const msg = `Customer ${custInfo.name || "Visitor"} (${custInfo.phone || "No phone"}) encountered a payment issue: ${reason || "User aborted transaction"}. Amount: ${rs(orderAmount)}.`;
    return notifyAlert("failed_payment", title, msg, { custInfo, orderAmount, reason });
  }

  /**
   * Send Test Email to Target without SMTP
   */
  async function sendTestEmail(email) {
    const target = (email || getTargetEmail()).trim();
    const testPayload = {
      _subject: "✅ Test Email: Bhau Korde Masale Email Gateway is Active",
      _template: "table",
      _captcha: "false",
      "Status": "Active & Working",
      "Recipient Inbox": target,
      "Dispatcher Pipeline": "Zero-SMTP Direct Cloud Gateway (No SMTP Passwords Needed)",
      "Store": "Bhau Korde Masale (Panvel, Navi Mumbai)",
      "Timestamp": new Date().toLocaleString("en-IN"),
      "Message": "Namaste Bhau Korde! Your Zero-SMTP email notification gateway is fully active. All future orders, customer leads, and store alerts will arrive directly at this email address without requiring any SMTP setup."
    };

    const fallbacks = ["/api/test-email", "api/notify.php?test=1", "../api/notify.php?test=1"];
    const result = await dispatchZeroSmtp(testPayload, target, fallbacks, { email: target });

    if (result.ok) {
      const msg = result.note || `Test email dispatched to ${target}!`;
      logEmail("test", target, "✅ Test Email: Dispatcher Ready", "delivered", msg);
      return { success: true, message: msg };
    }

    const errMsg = "Cloud email gateway unreachable. Please verify your internet connection.";
    logEmail("test", target, "❌ Test Email Failed", "failed", errMsg);
    return { success: false, error: errMsg };
  }

  // Export to global window object
  window.BK_MAILER = {
    DEFAULT_TARGET_EMAIL,
    getTargetEmail,
    getEmailLogs,
    clearEmailLogs,
    notifyOrder,
    notifyInquiry,
    notifyAlert,
    notifyFailedPayment,
    sendTestEmail
  };

  console.log(`[BK_MAILER] Zero-SMTP Engine Initialized. Notification Recipient: ${DEFAULT_TARGET_EMAIL}`);
})();
