/**
 * Bhau Korde Masale - Automated Client-Side & SMTP Notification Bridge
 * 
 * Routes all order booking notifications, customer inquiries, and system alerts
 * to bhaukorde1975@gmail.com with local storage audit logging.
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
      // Keep last 100 email logs
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
   * Determine the API base URL (relative if served by server, or localhost fallback)
   */
  function getApiEndpoint(path) {
    if (window.location.protocol.startsWith("http")) {
      return path;
    }
    return "http://localhost:3000" + path;
  }

  /**
   * Send Order Booking Notification to bhaukorde1975@gmail.com
   * @param {Object} order The complete order object
   * @returns {Promise<Object>}
   */
  async function notifyOrder(order) {
    if (!order || !order.id) return { success: false, error: "Invalid order data" };
    const targetEmail = getTargetEmail();
    const subject = `🌶️ New Order Booking: ${order.id} - ${order.customer} (₹${order.total})`;

    console.log(`[BK_MAILER] Dispatching order booking notification for #${order.id} to ${targetEmail}...`);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const resp = await fetch(getApiEndpoint("/api/notify/order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        const mode = data.mode === "smtp" ? "delivered" : "logged_offline";
        logEmail("order_booking", targetEmail, subject, mode, `Order #${order.id} for ₹${order.total} (${order.payment})`);
        return { success: true, mode: data.mode, recipient: targetEmail };
      }
    } catch (netErr) {
      // Backend not running (e.g. static site opened directly)
      console.warn("[BK_MAILER] Local SMTP server unreachable. Logging order notification locally.", netErr.message);
    }

    // Fallback: Record notification in local storage log so admin sees it in CRM
    logEmail("order_booking", targetEmail, subject, "logged_offline", `Order #${order.id} for ₹${order.total} (${order.payment}) - Recorded locally`);
    return { success: true, mode: "logged_offline", recipient: targetEmail };
  }

  /**
   * Send Contact Inquiry Notification to bhaukorde1975@gmail.com
   * @param {Object} inquiry { name, email, phone, website, message }
   */
  async function notifyInquiry(inquiry) {
    if (!inquiry || !inquiry.name) return { success: false, error: "Invalid inquiry data" };
    const targetEmail = getTargetEmail();
    const subject = `📬 New Website Inquiry from ${inquiry.name}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const resp = await fetch(getApiEndpoint("/api/notify/inquiry"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        logEmail("inquiry", targetEmail, subject, "delivered", `Lead from ${inquiry.name} (${inquiry.phone || inquiry.email})`);
        return { success: true, mode: data.mode };
      }
    } catch (e) {
      console.warn("[BK_MAILER] Local SMTP server unreachable for inquiry.", e.message);
    }

    logEmail("inquiry", targetEmail, subject, "logged_offline", `Lead from ${inquiry.name} (${inquiry.phone || inquiry.email}) - Recorded locally`);
    return { success: true, mode: "logged_offline" };
  }

  /**
   * Send Alert Notification (Failed Payment, Low Stock, etc.)
   */
  async function notifyAlert(type, title, message, data) {
    const targetEmail = getTargetEmail();
    const subject = `⚠️ ${title || "Store Alert"}`;

    try {
      const resp = await fetch(getApiEndpoint("/api/notify/alert"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, title, message, data })
      });
      if (resp.ok) {
        logEmail("alert", targetEmail, subject, "delivered", message);
        return { success: true };
      }
    } catch (e) {}

    logEmail("alert", targetEmail, subject, "logged_offline", message);
    return { success: true, mode: "logged_offline" };
  }

  /**
   * Send Payment Failure Notice
   */
  function notifyFailedPayment(custInfo, cart, orderAmount, reason) {
    const title = `Payment Declined / Cancelled: ₹${orderAmount}`;
    const msg = `Customer ${custInfo.name || "Visitor"} (${custInfo.phone || "No phone"}) encountered a payment issue: ${reason || "User aborted or transaction failed"}. Cart Amount: ₹${orderAmount}.`;
    return notifyAlert("failed_payment", title, msg, { custInfo, orderAmount, reason });
  }

  /**
   * Send Test Email to Target
   */
  async function sendTestEmail(email) {
    const target = (email || getTargetEmail()).trim();
    try {
      const resp = await fetch(getApiEndpoint("/api/test-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target })
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        logEmail("test", target, "✅ Test Email: SMTP Dispatcher Ready", "delivered", "Manual test triggered from Staff CRM");
        return { success: true, message: data.message };
      } else {
        logEmail("test", target, "❌ Test Email Failed", "failed", data.error || "SMTP authentication failed");
        return { success: false, error: data.error || "Failed to send test email" };
      }
    } catch (err) {
      const errMsg = "Backend server not responding. Run 'npm start' in terminal to activate SMTP dispatch.";
      logEmail("test", target, "❌ Test Email Failed (Server Offline)", "failed", errMsg);
      return { success: false, error: errMsg };
    }
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

  console.log(`[BK_MAILER] Initialized. Primary notification recipient: ${DEFAULT_TARGET_EMAIL}`);
})();
