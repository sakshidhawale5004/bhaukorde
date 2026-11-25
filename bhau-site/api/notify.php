<?php
/**
 * Bhau Korde Masale - Hostinger Automated Email Notification Handler (PHP)
 * 
 * Delivers order bookings, contact inquiries, and store alerts to bhaukorde1975@gmail.com
 * Compatible with all Hostinger shared, cloud, and VPS hosting plans.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$NOTIFICATION_EMAIL = "bhaukorde1975@gmail.com";

// Health check / Test email trigger
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['test'])) {
        $subject = "✅ Hostinger PHP Mail Test - Bhau Korde Masale";
        $body = "<h2>✅ Hostinger Mailer Ready</h2><p>This test email confirms that PHP mail delivery on Hostinger is active. Future order bookings and customer messages will arrive at <b>{$NOTIFICATION_EMAIL}</b>.</p><p>Time: " . date("Y-m-d H:i:s") . "</p>";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: Bhau Korde Masale <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'bhaukorde.in') . ">\r\n";
        
        $sent = @mail($NOTIFICATION_EMAIL, $subject, $body, $headers);
        echo json_encode([
            "status" => $sent ? "success" : "failed",
            "message" => $sent ? "Test email sent to {$NOTIFICATION_EMAIL}" : "mail() function failed. Check Hostinger mail settings.",
            "recipient" => $NOTIFICATION_EMAIL
        ]);
        exit();
    }

    echo json_encode([
        "status" => "online",
        "service" => "Bhau Korde Hostinger PHP Mailer",
        "recipient" => $NOTIFICATION_EMAIL,
        "timestamp" => date("c")
    ]);
    exit();
}

// Read JSON input
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "No JSON payload received"]);
    exit();
}

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$domain = $_SERVER['SERVER_NAME'] ?? 'bhaukorde.in';
$headers .= "From: Bhau Korde Masale <orders@" . $domain . ">\r\n";

// Helper to escape
function h($str) {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}

function formatRs($amt) {
    return "₹" . number_format((float)($amt ?? 0), 2);
}

// -----------------------------------------------------------------------------
// 1. ORDER BOOKING NOTIFICATION
// -----------------------------------------------------------------------------
if (isset($data['id']) && (isset($data['items']) || isset($data['total']))) {
    $order = $data;
    $orderId = h($order['id']);
    $customer = h($order['customer'] ?? 'Customer');
    $phone = h($order['phone'] ?? 'N/A');
    $email = h($order['email'] ?? '');
    $address = h($order['address'] ?? 'N/A');
    $city = h($order['city'] ?? '');
    $notes = h($order['packagingNotes'] ?? '');
    $payment = h($order['payment'] ?? 'Cash on Delivery');
    $paymentId = h($order['paymentId'] ?? '');
    $total = formatRs($order['total'] ?? 0);
    $date = h($order['date'] ?? date('Y-m-d H:i'));

    if (!empty($email)) {
        $headers .= "Reply-To: {$email}\r\n";
    }

    $isPaid = stripos($order['paymentStatus'] ?? '', 'PAID') !== false || stripos($payment, 'Razorpay') !== false;
    $paymentBadge = $isPaid 
        ? '<span style="background:#dcfce7;color:#15803d;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:bold;">PAID VIA RAZORPAY</span>'
        : '<span style="background:#fef3c7;color:#b45309;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:bold;">CASH ON DELIVERY (PENDING)</span>';

    $itemsHtml = '';
    if (isset($order['items']) && is_array($order['items'])) {
        foreach ($order['items'] as $idx => $it) {
            $name = h($it['name'] ?? 'Product');
            $size = h($it['size'] ?? 'Standard');
            $qty = (int)($it['qty'] ?? 1);
            $price = (float)($it['price'] ?? 0);
            $sub = formatRs($qty * $price);
            $itemsHtml .= "
                <tr style='border-bottom:1px solid #f0e6dc;'>
                    <td style='padding:10px 12px;font-size:13px;color:#2b2622;'><b>" . ($idx + 1) . ". {$name}</b></td>
                    <td style='padding:10px 12px;font-size:13px;color:#7a716a;'>{$size}</td>
                    <td style='padding:10px 12px;font-size:13px;text-align:center;'><b>{$qty}</b></td>
                    <td style='padding:10px 12px;font-size:13px;text-align:right;'>" . formatRs($price) . "</td>
                    <td style='padding:10px 12px;font-size:13px;color:#c8501e;font-weight:bold;text-align:right;'>{$sub}</td>
                </tr>";
        }
    }

    $cleanPhone = preg_replace('/[^0-9]/', '', $phone);

    $html = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style=\"font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#faf5ee;margin:0;padding:24px;color:#2b2622;\">
      <div style='max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e9e2da;border-top:4px solid #c8501e;border-radius:6px;overflow:hidden;'>
        <div style='background:#3a2418;color:#ffffff;padding:20px 24px;'>
          <h2 style='margin:0;font-size:22px;color:#ffcf8a;'>BHAU KORDE MASALE</h2>
          <p style='margin:4px 0 0;font-size:12px;color:#e9ddd2;'>चवीने खाणार त्याला भाऊ देणार · Panvel, Navi Mumbai</p>
        </div>

        <div style='padding:24px;'>
          <h3 style='margin:0 0 14px;color:#c8501e;font-size:19px;'>🎉 New Order Booking: {$orderId}</h3>
          
          <table style='width:100%;border-collapse:collapse;margin-bottom:20px;background:#fdfbf7;border:1px solid #f0e6dc;'>
            <tr><td style='padding:9px 12px;color:#7a716a;width:35%;'>Order ID:</td><td style='padding:9px 12px;font-weight:bold;'>{$orderId}</td></tr>
            <tr><td style='padding:9px 12px;color:#7a716a;'>Date:</td><td style='padding:9px 12px;'>{$date}</td></tr>
            <tr><td style='padding:9px 12px;color:#7a716a;'>Payment Mode:</td><td style='padding:9px 12px;'>{$paymentBadge}</td></tr>
            " . ($paymentId ? "<tr><td style='padding:9px 12px;color:#7a716a;'>Razorpay Ref ID:</td><td style='padding:9px 12px;font-family:monospace;color:#15803d;font-weight:bold;'>{$paymentId}</td></tr>" : "") . "
            <tr><td style='padding:9px 12px;color:#7a716a;'>Grand Total:</td><td style='padding:9px 12px;font-size:17px;font-weight:bold;color:#c8501e;'>{$total}</td></tr>
          </table>

          <h4 style='margin:18px 0 8px;font-size:13px;text-transform:uppercase;color:#7a716a;'>Customer Details</h4>
          <div style='background:#faf5ee;border-left:3px solid #c8501e;padding:12px 16px;margin-bottom:18px;font-size:13.5px;line-height:1.6;'>
            <div><b>Name:</b> {$customer}</div>
            <div><b>Phone:</b> <a href='tel:{$phone}' style='color:#c8501e;'>{$phone}</a></div>
            " . ($email ? "<div><b>Email:</b> <a href='mailto:{$email}' style='color:#c8501e;'>{$email}</a></div>" : "") . "
            <div><b>Address:</b> {$address}" . ($city ? ", {$city}" : "") . "</div>
            " . ($notes ? "<div style='margin-top:6px;color:#7a716a;'><b>Instructions:</b> <i>{$notes}</i></div>" : "") . "
          </div>

          <h4 style='margin:18px 0 8px;font-size:13px;text-transform:uppercase;color:#7a716a;'>Order Items</h4>
          <table style='width:100%;border-collapse:collapse;margin-bottom:20px;border:1px solid #e9e2da;'>
            <thead>
              <tr style='background:#f5eee6;text-align:left;'>
                <th style='padding:8px 10px;font-size:12px;'>Product</th>
                <th style='padding:8px 10px;font-size:12px;'>Pack</th>
                <th style='padding:8px 10px;font-size:12px;text-align:center;'>Qty</th>
                <th style='padding:8px 10px;font-size:12px;text-align:right;'>Rate</th>
                <th style='padding:8px 10px;font-size:12px;text-align:right;'>Total</th>
              </tr>
            </thead>
            <tbody>{$itemsHtml}</tbody>
            <tfoot>
              <tr style='background:#fdfbf7;border-top:2px solid #c8501e;'>
                <td colspan='4' style='padding:10px;font-weight:bold;text-align:right;'>Grand Total:</td>
                <td style='padding:10px;font-size:15px;font-weight:bold;color:#c8501e;text-align:right;'>{$total}</td>
              </tr>
            </tfoot>
          </table>

          <div style='text-align:center;padding:10px 0;'>
            <a href='https://wa.me/{$cleanPhone}' style='display:inline-block;background:#25d366;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:4px;font-size:13px;font-weight:bold;'>
              💬 Message Customer on WhatsApp
            </a>
          </div>
        </div>

        <div style='background:#f5eee6;padding:12px 20px;font-size:11px;color:#7a716a;text-align:center;'>
          Bhau Korde Masale · Panvel · Hostinger Automated Mailer
        </div>
      </div>
    </body>
    </html>";

    $subject = "🌶️ New Order Booking: {$orderId} - {$customer} ({$total})";
    $sent = @mail($NOTIFICATION_EMAIL, $subject, $html, $headers);

    echo json_encode([
        "success" => $sent,
        "mode" => "hostinger_php_mail",
        "recipient" => $NOTIFICATION_EMAIL,
        "orderId" => $orderId
    ]);
    exit();
}

// -----------------------------------------------------------------------------
// 2. CONTACT INQUIRY NOTIFICATION
// -----------------------------------------------------------------------------
if (isset($data['name']) && isset($data['message'])) {
    $name = h($data['name']);
    $email = h($data['email'] ?? '');
    $phone = h($data['phone'] ?? 'N/A');
    $website = h($data['website'] ?? '');
    $msg = nl2br(h($data['message']));

    if (!empty($email)) {
        $headers .= "Reply-To: {$email}\r\n";
    }

    $subject = "📬 New Website Inquiry from {$name}";
    $html = "
    <div style=\"font-family:'Segoe UI',sans-serif;background:#faf5ee;padding:24px;\">
      <div style='max-width:600px;margin:0 auto;background:#fff;border:1px solid #e9e2da;border-top:4px solid #c8501e;padding:24px;border-radius:6px;'>
        <h2 style='color:#c8501e;margin:0 0 14px;'>📬 Customer Inquiry Received</h2>
        <table style='width:100%;border-collapse:collapse;margin-bottom:16px;'>
          <tr><td style='padding:6px 0;width:30%;color:#7a716a;'>Name:</td><td><b>{$name}</b></td></tr>
          <tr><td style='padding:6px 0;color:#7a716a;'>Email:</td><td><a href='mailto:{$email}'>{$email}</a></td></tr>
          <tr><td style='padding:6px 0;color:#7a716a;'>Phone:</td><td><a href='tel:{$phone}'>{$phone}</a></td></tr>
          " . ($website ? "<tr><td style='padding:6px 0;color:#7a716a;'>Website:</td><td>{$website}</td></tr>" : "") . "
        </table>
        <div style='background:#faf5ee;border-left:3px solid #c8501e;padding:12px;line-height:1.6;'>
          <b>Message:</b><br>{$msg}
        </div>
      </div>
    </div>";

    $sent = @mail($NOTIFICATION_EMAIL, $subject, $html, $headers);
    echo json_encode(["success" => $sent, "mode" => "hostinger_php_mail"]);
    exit();
}

// -----------------------------------------------------------------------------
// 3. STORE ALERT (Payment failure, low stock, etc.)
// -----------------------------------------------------------------------------
$title = h($data['title'] ?? 'Store Alert');
$message = h($data['message'] ?? 'Store alert triggered.');
$subject = "⚠️ {$title}";
$html = "
<div style=\"font-family:'Segoe UI',sans-serif;padding:24px;background:#faf5ee;\">
  <div style='max-width:600px;margin:0 auto;background:#fff;border-top:4px solid #d93f2b;padding:24px;border-radius:6px;'>
    <h2 style='color:#d93f2b;margin:0 0 10px;'>⚠️ {$title}</h2>
    <p style='font-size:14px;color:#2b2622;line-height:1.6;'>{$message}</p>
    <small style='color:#7a716a;'>Timestamp: " . date("Y-m-d H:i:s") . "</small>
  </div>
</div>";

$sent = @mail($NOTIFICATION_EMAIL, $subject, $html, $headers);
echo json_encode(["success" => $sent, "mode" => "hostinger_php_mail"]);
