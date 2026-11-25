/* Shared cart — Bhau Korde. Saved in localStorage so every page sees the same cart. */
(function(){
  var KEY="bk_cart_v1", WA="919167834686", U="", mem=[];
  function load(){try{var v=JSON.parse(localStorage.getItem(KEY)||"null");if(Array.isArray(v))return v}catch(e){}return mem}
  function save(c){mem=c;try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}}
  function rs(n){return "₹"+(Math.round(n*100)/100).toString()}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function count(c){return c.reduce(function(n,i){return n+i.qty},0)}
  function total(c){return c.reduce(function(n,i){return n+i.qty*i.price},0)}
  function badge(){var n=count(load());document.querySelectorAll(".cartN").forEach(function(e){e.textContent=n})}
  function toast(t,link){
    var e=document.getElementById("toast");
    if(!e){e=document.createElement("div");e.id="toast";e.className="toast";document.body.appendChild(e)}
    e.innerHTML=esc(t)+(link?' <a href="cart.html">View cart</a>':"");
    e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove("on")},2400)}
  var BK=window.BK={
    rs:rs,
    /* item: {id,name,price,size,img} — same id+size merges into one line */
    add:function(it,silent){
      try {
        var prods = JSON.parse(localStorage.getItem("bk_crm_products") || "[]");
        var matched = prods.find(function(p){ return p.id === it.id; });
        if (matched && (matched.status === "out-stock" || (typeof matched.stock === "number" && matched.stock <= 0))) {
          toast(it.name + " is currently Out of Stock!", false);
          return false;
        }
      } catch(e) {}
      var c=load(),k=it.id+"|"+(it.size||""),f=c.filter(function(x){return x.key===k})[0];
      if(f)f.qty++;else c.push({key:k,id:it.id,name:it.name,price:+it.price,size:it.size||"",img:it.img||"",qty:1});
      save(c);badge();if(!silent)toast(it.name+" added to cart",true);
      return true;
    },
    setQty:function(k,q){var c=load();c=c.map(function(x){if(x.key===k)x.qty=q;return x}).filter(function(x){return x.qty>0});save(c);badge()},
    remove:function(k){save(load().filter(function(x){return x.key!==k}));badge()},
    clear:function(){save([]);badge()},
    items:load,count:function(){return count(load())},total:function(){return total(load())},
    openCheckout:function(m){openCheckoutModal(m)},
    processCODOrder:function(){processCODOrder()},
    logFailedPayment:function(cust,c,amt,reason){logFailedPayment(cust,c,amt,reason)},
    waLink:function(){
      var c=load(),m="Hello Bhau Korde, I would like to order:\n";
      c.forEach(function(i,n){m+=(n+1)+". "+i.name+(i.size?" ("+i.size+")":"")+" x "+i.qty+" = "+rs(i.qty*i.price)+"\n"});
      m+="\nTotal: "+rs(total(c))+"\n(Final price depends on pack size - please confirm.)";
      return "https://wa.me/"+WA+"?text="+encodeURIComponent(m)}
  };
  document.addEventListener("DOMContentLoaded",badge);
  window.addEventListener("storage",badge);window.addEventListener("pageshow",badge);

  /* ---- cart page rendering (only runs where #cartRoot exists) ---- */
  function render(){
    var root=document.getElementById("cartRoot");if(!root)return;
    var c=load();
    if(!c.length){root.innerHTML='<div class="cempty"><i class="bi bi-cart-x"></i><h2>Your cart is empty</h2><p>Looks like you haven’t added any masale or lonche yet.</p><a class="btn" href="blended-spices.html" data-shop="blend">Shop Now</a></div>';return}
    var rows=c.map(function(i){
      var im=i.img?'<img src="'+esc(i.img)+'" alt="'+esc(i.name)+'" onerror="this.replaceWith(document.createTextNode(\'No image\'))">':"No image";
      return '<div class="citem"><div class="ci">'+im+'</div><div><h4>'+esc(i.name)+'</h4>'+(i.size?'<div class="cs">Pack: '+esc(i.size)+'</div>':'')+'<div class="cu">'+rs(i.price)+' each</div></div>'
       +'<div class="cr"><div class="qty"><button data-d="-1" data-k="'+esc(i.key)+'" aria-label="Decrease quantity">&minus;</button><span>'+i.qty+'</span><button data-d="1" data-k="'+esc(i.key)+'" aria-label="Increase quantity">+</button></div>'
       +'<div class="lt">'+rs(i.qty*i.price)+'</div><button class="rm" data-r="'+esc(i.key)+'"><i class="bi bi-trash3"></i> Remove</button></div></div>'}).join("");
    root.innerHTML = '<div class="cartpage"><div>' + rows + '<button class="rm cclear" id="cclear"><i class="bi bi-x-circle"></i> Clear cart</button></div>'
      + '<aside class="csum"><h3>Order Summary</h3>'
      + '<div class="row"><span>Items</span><span>' + count(c) + '</span></div>'
      + '<div class="row"><span>Subtotal</span><span>' + rs(total(c)) + '</span></div>'
      + '<div class="row"><span>GST (Inclusive)</span><span>Included</span></div>'
      + '<div class="row"><span>Shipping</span><span style="color:#15803d;font-weight:600">FREE</span></div>'
      + '<div class="row tot"><span>Total</span><span>' + rs(total(c)) + '</span></div>'
      + '<button type="button" class="btn btn-rzp-pay" id="btnRzpCheckout"><i class="bi bi-shield-check"></i> Pay Online with Razorpay</button>'
      + '<div class="rzp-trust-badges"><span><i class="bi bi-lightning-charge-fill" style="color:#eab308"></i> Instant UPI / Cards</span><span><i class="bi bi-lock-fill" style="color:#15803d"></i> 256-bit Secure</span></div>'
      + '<div class="csum-divider"><span>OR</span></div>'
      + '<a class="btn btn-wa-order" id="cwa" href="' + BK.waLink() + '" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> Order on WhatsApp (COD)</a>'
      + '<a class="btn ghost" href="blended-spices.html" style="margin-top:10px">Continue Shopping</a>'
      + '<small>Prices include tax. 100% authentic Maharashtrian stone-ground spices handcrafted in Panvel.</small></aside></div>';
  }

  /* ---- Customer Checkout & Payment Integration (Online Razorpay + COD) ---- */
  var coModal, successModal;
  var isSubmittingOrder = false;

  function checkCartStock(c) {
    try {
      var prods = JSON.parse(localStorage.getItem("bk_crm_products") || "[]");
      for (var i = 0; i < c.length; i++) {
        var item = c[i];
        var p = prods.find(function(x) { return x.id === item.id; });
        if (p) {
          if (p.status === "out-stock" || (typeof p.stock === "number" && p.stock <= 0)) {
            return { ok: false, product: item.name, reason: "Out of Stock" };
          }
          if (typeof p.stock === "number" && p.stock < item.qty) {
            return { ok: false, product: item.name, reason: "Only " + p.stock + " units available in stock" };
          }
        }
      }
    } catch(e) {}
    return { ok: true };
  }

  function deductStock(items) {
    try {
      var prods = JSON.parse(localStorage.getItem("bk_crm_products") || "[]");
      var changed = false;
      items.forEach(function(item) {
        var p = prods.find(function(x) { return x.id === item.id; });
        if (p && typeof p.stock === "number") {
          p.stock = Math.max(0, p.stock - (item.qty || 1));
          if (p.stock === 0) p.status = "out-stock";
          else if (p.stock <= 10) p.status = "low-stock";
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem("bk_crm_products", JSON.stringify(prods));
        try {
          window.dispatchEvent(new StorageEvent("storage", { key: "bk_crm_products" }));
        } catch(e) {}
      }
    } catch(e) {}
  }

  function logFailedPayment(custInfo, c, orderAmount, reason) {
    try {
      var fails = JSON.parse(localStorage.getItem("bk_crm_failed_payments") || "[]");
      var failId = "FAIL-" + Date.now().toString(36).toUpperCase();
      fails.unshift({
        id: failId,
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        customer: custInfo.name || "Anonymous",
        phone: custInfo.phone || "",
        email: custInfo.email || "",
        amount: orderAmount,
        reason: reason || "Transaction declined / Cancelled by user",
        itemsSummary: c.map(function(x) { return x.name + " (" + (x.size || "Standard") + ") x" + x.qty; }).join(", ")
      });
      localStorage.setItem("bk_crm_failed_payments", JSON.stringify(fails));
      try {
        window.dispatchEvent(new StorageEvent("storage", { key: "bk_crm_failed_payments" }));
      } catch(e) {}

      // Send email alert to bhaukorde1975@gmail.com
      if (window.BK_MAILER && typeof window.BK_MAILER.notifyFailedPayment === "function") {
        window.BK_MAILER.notifyFailedPayment(custInfo, c, orderAmount, reason);
      }
    } catch(e) {}
  }

  function buildCheckoutModal() {
    if (coModal) return;
    coModal = document.createElement("div");
    coModal.className = "checkout-modal";
    coModal.hidden = true;
    coModal.innerHTML = '<div class="checkout-box" role="dialog" aria-modal="true" aria-labelledby="coTitle">'
      + '<h3 id="coTitle"><i class="bi bi-shield-check" style="color:#15803d"></i> Bhau Korde Checkout</h3>'
      + '<p class="checkout-sub">Enter your delivery details and choose your preferred payment method.</p>'
      + '<div class="checkout-summary-mini" id="coSummaryMini"><span>Total Order Amount:</span><b style="font-size:16px;color:var(--accent)" id="coTotalDisplay">₹0</b></div>'
      + '<form id="coForm">'
      + '<div class="co-field"><label for="coName">Full Name <span style="color:#dc2626">*</span></label><input type="text" id="coName" placeholder="e.g. Anand Joshi" required></div>'
      + '<div class="co-grid">'
      + '<div class="co-field"><label for="coPhone">Mobile Number (10 Digits) <span style="color:#dc2626">*</span></label><input type="tel" id="coPhone" placeholder="98200XXXXX" pattern="[0-9]{10}" required></div>'
      + '<div class="co-field"><label for="coEmail">Email Address <span style="color:#dc2626">*</span></label><input type="email" id="coEmail" placeholder="your@email.com" required></div>'
      + '</div>'
      + '<div class="co-field"><label for="coAddress">Delivery Address <span style="color:#dc2626">*</span></label><textarea id="coAddress" rows="2" placeholder="House/Flat No., Street, Landmark" required></textarea></div>'
      + '<div class="co-grid">'
      + '<div class="co-field"><label for="coCity">City / Town <span style="color:#dc2626">*</span></label><input type="text" id="coCity" placeholder="Panvel / Navi Mumbai / Pune" required></div>'
      + '<div class="co-field"><label for="coPin">PIN Code</label><input type="text" id="coPin" placeholder="410206"></div>'
      + '</div>'
      + '<div class="co-field"><label for="coNotes">Packaging / Delivery Instructions (Optional)</label><input type="text" id="coNotes" placeholder="e.g. Extra bubble wrap, gift box, call before delivery"></div>'
      + '<div class="co-field" style="margin-top:12px">'
      + '<label style="margin-bottom:6px;display:block"><b>Select Payment Method:</b></label>'
      + '<div style="display:flex;gap:16px;flex-wrap:wrap;padding:8px 12px;background:var(--soft);border:1px solid var(--line);border-radius:6px;">'
      + '<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="coPayMethod" value="online" checked id="payMethodOnline"> <span><i class="bi bi-shield-check" style="color:#15803d"></i> <b>Online Payment</b> (Razorpay UPI/Cards)</span></label>'
      + '<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="coPayMethod" value="cod" id="payMethodCOD"> <span><i class="bi bi-cash-stack" style="color:#b45309"></i> <b>Cash on Delivery (COD)</b></span></label>'
      + '</div></div>'
      + '<div class="checkout-actions" style="margin-top:18px">'
      + '<button type="button" class="btn ghost" id="btnCancelCheckout">Cancel</button>'
      + '<button type="submit" class="btn btn-rzp-pay" id="btnProceedOrder"><i class="bi bi-lock-fill"></i> <span id="btnProceedText">Pay Securely via Razorpay</span></button>'
      + '</div></form></div>';
    document.body.appendChild(coModal);

    document.getElementById("btnCancelCheckout").addEventListener("click", closeCheckoutModal);
    coModal.addEventListener("click", function(e) {
      if (e.target === coModal) closeCheckoutModal();
    });

    var rOnline = document.getElementById("payMethodOnline");
    var rCOD = document.getElementById("payMethodCOD");
    var btnText = document.getElementById("btnProceedText");

    function updateSubmitBtn() {
      if (rCOD && rCOD.checked) {
        btnText.textContent = "Confirm Cash on Delivery Order";
      } else {
        btnText.textContent = "Pay Securely via Razorpay";
      }
    }
    if (rOnline) rOnline.addEventListener("change", updateSubmitBtn);
    if (rCOD) rCOD.addEventListener("change", updateSubmitBtn);

    document.getElementById("coForm").addEventListener("submit", function(e) {
      e.preventDefault();
      var isCod = document.getElementById("payMethodCOD") && document.getElementById("payMethodCOD").checked;
      if (isCod) {
        processCODOrder();
      } else {
        initiateRazorpayPayment();
      }
    });
  }

  function openCheckoutModal(defaultMethod) {
    var c = load();
    if (!c.length) {
      toast("Your cart is empty!");
      return;
    }
    var stockCheck = checkCartStock(c);
    if (!stockCheck.ok) {
      alert("Unable to proceed to checkout:\n" + stockCheck.product + " is " + stockCheck.reason + ".\nPlease adjust your cart before ordering.");
      return;
    }

    buildCheckoutModal();
    document.getElementById("coTotalDisplay").textContent = rs(total(c));
    
    if (defaultMethod === "cod") {
      var rCOD = document.getElementById("payMethodCOD");
      if (rCOD) rCOD.checked = true;
    } else {
      var rOnline = document.getElementById("payMethodOnline");
      if (rOnline) rOnline.checked = true;
    }
    var btnText = document.getElementById("btnProceedText");
    if (btnText) {
      btnText.textContent = defaultMethod === "cod" ? "Confirm Cash on Delivery Order" : "Pay Securely via Razorpay";
    }

    coModal.hidden = false;
    document.body.style.overflow = "hidden";
    var nameField = document.getElementById("coName");
    if (nameField) nameField.focus();
  }

  function closeCheckoutModal() {
    if (coModal) coModal.hidden = true;
    document.body.style.overflow = "";
    isSubmittingOrder = false;
  }

  function buildSuccessModal() {
    if (successModal) return;
    successModal = document.createElement("div");
    successModal.className = "checkout-modal";
    successModal.hidden = true;
    document.body.appendChild(successModal);
    successModal.addEventListener("click", function(e) {
      if (e.target === successModal) closeSuccessModal();
    });
  }

  function closeSuccessModal() {
    if (successModal) successModal.hidden = true;
    document.body.style.overflow = "";
  }

  function showSuccessModal(order) {
    buildSuccessModal();
    var isPaid = order.paymentStatus === "PAID";
    var title = isPaid ? "Payment Successful & Order Confirmed!" : "Order Confirmed (Cash on Delivery)!";
    var iconClass = isPaid ? "bi-check-lg" : "bi-bag-check";

    successModal.innerHTML = '<div class="checkout-box order-success-card">'
      + '<div class="order-success-icon"><i class="bi ' + iconClass + '"></i></div>'
      + '<h3>' + title + '</h3>'
      + '<p style="color:var(--muted);font-size:13px">Your authentic spice order has been registered in Bhau Korde Masale CRM.</p>'
      + '<div class="order-success-meta">'
      + '<div>Order ID: <b style="color:var(--accent)">' + esc(order.id) + '</b></div>'
      + (order.paymentId ? '<div>Payment Ref: <b style="color:#15803d">' + esc(order.paymentId) + '</b></div>' : '<div>Payment Mode: <b style="color:#b45309">COD (Pay on Delivery)</b></div>')
      + '<div>Total Amount: <b>' + rs(order.total) + '</b></div>'
      + '<div>Customer: <b>' + esc(order.customer) + ' (' + esc(order.phone) + ')</b></div>'
      + '<div>Delivery to: <span>' + esc(order.address) + ', ' + esc(order.city) + '</span></div>'
      + (order.packagingNotes ? '<div>Notes: <i>' + esc(order.packagingNotes) + '</i></div>' : '')
      + '</div>'
      + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'
      + '<a href="index.html" class="btn ghost">Continue Shopping</a>'
      + '<button type="button" class="btn btn-wa-order" id="btnSuccessWaNotify"><i class="bi bi-whatsapp"></i> Chat on WhatsApp</button>'
      + '</div></div>';

    document.getElementById("btnSuccessWaNotify").addEventListener("click", function() {
      var msg = "Namaste Bhau Korde! 🌿\n\nI just placed order *" + order.id + "* on your website.\n\n"
        + "*Total Amount:* " + rs(order.total) + "\n"
        + "*Payment Mode:* " + order.payment + "\n"
        + (order.paymentId ? "*Transaction ID:* " + order.paymentId + "\n" : "")
        + "*Customer:* " + order.customer + " (" + order.phone + ")\n"
        + "*Delivery Address:* " + order.address + ", " + order.city + "\n\n"
        + "Please confirm and process dispatch. Thank you!";
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank");
    });

    closeCheckoutModal();
    successModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function getCustInfoFromForm() {
    return {
      name: (document.getElementById("coName")?.value || "").trim(),
      phone: (document.getElementById("coPhone")?.value || "").trim(),
      email: (document.getElementById("coEmail")?.value || "").trim(),
      address: (document.getElementById("coAddress")?.value || "").trim(),
      city: (document.getElementById("coCity")?.value || "").trim(),
      pincode: (document.getElementById("coPin")?.value || "").trim(),
      notes: (document.getElementById("coNotes")?.value || "").trim()
    };
  }

  function processCODOrder() {
    if (isSubmittingOrder) return;
    var c = load();
    if (!c.length) return;

    var stockCheck = checkCartStock(c);
    if (!stockCheck.ok) {
      alert("Cannot place order:\n" + stockCheck.product + " is " + stockCheck.reason);
      return;
    }

    isSubmittingOrder = true;
    var custInfo = getCustInfoFromForm();
    var orderAmount = total(c);
    var orderId = "BK-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000);
    var now = new Date();
    var dateStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0') + " " + String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');

    var newOrder = {
      id: orderId,
      date: dateStr,
      customer: custInfo.name,
      phone: custInfo.phone,
      email: custInfo.email,
      city: custInfo.city,
      address: custInfo.address + (custInfo.pincode ? " - " + custInfo.pincode : ""),
      packagingNotes: custInfo.notes,
      payment: "Cash on Delivery (COD)",
      paymentStatus: "PENDING",
      status: "pending",
      total: orderAmount,
      items: c.map(function(item) {
        return {
          id: item.id,
          name: item.name,
          size: item.size || "Standard",
          qty: item.qty,
          price: item.price
        };
      })
    };

    // Save to CRM Orders
    try {
      var orders = JSON.parse(localStorage.getItem("bk_crm_orders") || "[]");
      orders.push(newOrder);
      localStorage.setItem("bk_crm_orders", JSON.stringify(orders));
    } catch(e) {}

    // Update CRM Customers
    try {
      var customers = JSON.parse(localStorage.getItem("bk_crm_customers") || "[]");
      var existing = customers.find(function(x) { return x.phone === custInfo.phone; });
      if (existing) {
        existing.ordersCount = (existing.ordersCount || 1) + 1;
        existing.lifetimeSpend = (existing.lifetimeSpend || 0) + orderAmount;
        existing.city = custInfo.city || existing.city;
        existing.segment = existing.ordersCount >= 3 ? "VIP Patron" : "Loyal Buyer";
      } else {
        customers.push({
          id: "CUST-" + Math.floor(1000 + Math.random() * 9000),
          name: custInfo.name,
          phone: custInfo.phone,
          email: custInfo.email,
          city: custInfo.city,
          segment: "New Customer",
          ordersCount: 1,
          lifetimeSpend: orderAmount,
          notes: "Placed COD order"
        });
      }
      localStorage.setItem("bk_crm_customers", JSON.stringify(customers));
    } catch(e) {}

    // Automatic Stock Deduction
    deductStock(c);

    // Send Instant Order Notification to bhaukorde1975@gmail.com
    if (window.BK_MAILER && typeof window.BK_MAILER.notifyOrder === "function") {
      window.BK_MAILER.notifyOrder(newOrder);
    }

    BK.clear();
    render();
    showSuccessModal(newOrder);
  }

  function initiateRazorpayPayment() {
    if (isSubmittingOrder) return;
    var c = load();
    if (!c.length) return;

    var stockCheck = checkCartStock(c);
    if (!stockCheck.ok) {
      alert("Cannot proceed to payment:\n" + stockCheck.product + " is " + stockCheck.reason);
      return;
    }

    var custInfo = getCustInfoFromForm();
    var s = {};
    try {
      s = JSON.parse(localStorage.getItem("bk_crm_settings") || "{}");
    } catch(e) {}

    if (s.razorpayEnabled === false) {
      alert("Online payment is temporarily disabled. Please select Cash on Delivery to place your order.");
      return;
    }

    var keyId = ((window.BHAU_CONFIG && window.BHAU_CONFIG.razorpayKeyId) || s.razorpayKeyId || "rzp_live_U4HhHneqSk9NoP").trim();
    if (!keyId) {
      alert("Online payment gateway is being configured. Please choose Cash on Delivery or contact us on WhatsApp (+91 91678 34686) to place your order.");
      isSubmittingOrder = false;
      return;
    }
    var merchantName = (window.BHAU_CONFIG && window.BHAU_CONFIG.razorpayMerchantName) || s.razorpayMerchantName || s.storeName || "Bhau Korde Masale";
    var themeColor = s.razorpayThemeColor || "#c8501e";
    var orderAmount = total(c);
    var orderAmountPaise = Math.round(orderAmount * 100);

    isSubmittingOrder = true;

    if (typeof window.Razorpay !== "undefined") {
      var options = {
        key: keyId,
        amount: orderAmountPaise,
        currency: "INR",
        name: merchantName,
        description: "Pure Handcrafted Spices (" + count(c) + " items)",
        image: "LOGO-English.png",
        prefill: {
          name: custInfo.name,
          contact: custInfo.phone,
          email: custInfo.email
        },
        notes: {
          address: custInfo.address,
          city: custInfo.city,
          packagingNotes: custInfo.notes
        },
        theme: {
          color: themeColor
        },
        handler: function(response) {
          finalizeOnlineOrder(response.razorpay_payment_id || ("pay_" + Date.now()), custInfo, c, orderAmount);
        },
        modal: {
          ondismiss: function() {
            isSubmittingOrder = false;
            logFailedPayment(custInfo, c, orderAmount, "User closed payment window before completion");
          }
        }
      };

      try {
        var rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function(resp) {
          isSubmittingOrder = false;
          var desc = resp.error ? resp.error.description : "Transaction declined";
          logFailedPayment(custInfo, c, orderAmount, desc);
          alert("Payment Failed: " + desc + "\nYour cart items are preserved. You may retry or choose Cash on Delivery.");
        });
        rzp.open();
      } catch (err) {
        simulatePaymentFlow(custInfo, c, orderAmount);
      }
    } else {
      simulatePaymentFlow(custInfo, c, orderAmount);
    }
  }

  function simulatePaymentFlow(custInfo, c, orderAmount) {
    var confirmed = confirm(
      "Razorpay Sandbox / Test Mode:\n\nSimulate successful payment of " + rs(orderAmount) + " via Razorpay UPI/Cards?"
    );
    if (confirmed) {
      var simPayId = "pay_test_" + Math.random().toString(36).substr(2, 9);
      finalizeOnlineOrder(simPayId, custInfo, c, orderAmount);
    } else {
      isSubmittingOrder = false;
      logFailedPayment(custInfo, c, orderAmount, "Simulation cancelled by user in test mode");
    }
  }

  function finalizeOnlineOrder(paymentId, custInfo, c, orderAmount) {
    var orderId = "BK-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000);
    var now = new Date();
    var dateStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0') + " " + String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');

    var newOrder = {
      id: orderId,
      date: dateStr,
      customer: custInfo.name,
      phone: custInfo.phone,
      email: custInfo.email,
      city: custInfo.city,
      address: custInfo.address + (custInfo.pincode ? " - " + custInfo.pincode : ""),
      packagingNotes: custInfo.notes,
      payment: "Razorpay (Online Paid)",
      paymentId: paymentId,
      paymentStatus: "PAID",
      status: "processing",
      total: orderAmount,
      items: c.map(function(item) {
        return {
          id: item.id,
          name: item.name,
          size: item.size || "Standard",
          qty: item.qty,
          price: item.price
        };
      })
    };

    // Save to CRM Orders
    try {
      var orders = JSON.parse(localStorage.getItem("bk_crm_orders") || "[]");
      orders.push(newOrder);
      localStorage.setItem("bk_crm_orders", JSON.stringify(orders));
    } catch(e) {}

    // Update CRM Customers
    try {
      var customers = JSON.parse(localStorage.getItem("bk_crm_customers") || "[]");
      var existing = customers.find(function(x) { return x.phone === custInfo.phone; });
      if (existing) {
        existing.ordersCount = (existing.ordersCount || 1) + 1;
        existing.lifetimeSpend = (existing.lifetimeSpend || 0) + orderAmount;
        existing.city = custInfo.city || existing.city;
        existing.segment = existing.ordersCount >= 3 ? "VIP Patron" : "Loyal Buyer";
      } else {
        customers.push({
          id: "CUST-" + Math.floor(1000 + Math.random() * 9000),
          name: custInfo.name,
          phone: custInfo.phone,
          email: custInfo.email,
          city: custInfo.city,
          segment: "New Customer",
          ordersCount: 1,
          lifetimeSpend: orderAmount,
          notes: "Online order via Razorpay"
        });
      }
      localStorage.setItem("bk_crm_customers", JSON.stringify(customers));
    } catch(e) {}

    // Automatic Stock Deduction
    deductStock(c);

    // Send Instant Order Notification to bhaukorde1975@gmail.com
    if (window.BK_MAILER && typeof window.BK_MAILER.notifyOrder === "function") {
      window.BK_MAILER.notifyOrder(newOrder);
    }

    BK.clear();
    render();
    showSuccessModal(newOrder);
  }

  // Handle direct payment links (?pay=BK-...&amt=...)
  function checkDirectPayParam() {
    var params = new URLSearchParams(window.location.search);
    var payOrderId = params.get("pay");
    var payAmt = params.get("amt");
    if (payOrderId && payAmt) {
      setTimeout(function() {
        var s = {};
        try { s = JSON.parse(localStorage.getItem("bk_crm_settings") || "{}"); } catch(e) {}
        var keyId = ((window.BHAU_CONFIG && window.BHAU_CONFIG.razorpayKeyId) || s.razorpayKeyId || "rzp_live_U4HhHneqSk9NoP").trim();
        if (!keyId) {
          alert("Online payment gateway is being configured. Please contact store support on WhatsApp (+91 91678 34686) to complete your payment.");
          return;
        }
        var merchantName = (window.BHAU_CONFIG && window.BHAU_CONFIG.razorpayMerchantName) || s.razorpayMerchantName || "Bhau Korde Masale";
        if (typeof window.Razorpay !== "undefined") {
          var rzp = new window.Razorpay({
            key: keyId,
            amount: Math.round(Number(payAmt) * 100),
            currency: "INR",
            name: merchantName,
            description: "Direct Payment for Order #" + payOrderId,
            image: "LOGO-English.png",
            handler: function(response) {
              try {
                var orders = JSON.parse(localStorage.getItem("bk_crm_orders") || "[]");
                var ord = orders.find(function(o) { return o.id === payOrderId; });
                if (ord) {
                  ord.payment = "Razorpay (Online Paid)";
                  ord.paymentId = response.razorpay_payment_id;
                  ord.paymentStatus = "PAID";
                  ord.status = "processing";
                  localStorage.setItem("bk_crm_orders", JSON.stringify(orders));
                }
              } catch(e) {}
              alert("Payment Successful! Order #" + payOrderId + " is now PAID.\nPayment ID: " + response.razorpay_payment_id);
              window.location.href = "cart.html";
            }
          });
          rzp.open();
        }
      }, 500);
    }
  }
  document.addEventListener("DOMContentLoaded", checkDirectPayParam);

  document.addEventListener("click",function(e){
    var q=e.target.closest("[data-d]"),r=e.target.closest("[data-r]");
    if(q){var k=q.dataset.k,it=load().filter(function(x){return x.key===k})[0];if(it){BK.setQty(k,it.qty+ +q.dataset.d);render()}}
    if(r){BK.remove(r.dataset.r);render()}
    if(e.target.closest("#cclear")){BK.clear();render()}
    if(e.target.closest("#btnRzpCheckout")){openCheckoutModal("online")}
    if(e.target.closest("#cwa")){
      e.preventDefault();
      openCheckoutModal("cod");
    }});
  document.addEventListener("DOMContentLoaded",render);
  window.addEventListener("storage",render);
  document.addEventListener("DOMContentLoaded",render);
  window.addEventListener("storage",render);

  /* ---- Shop Now popup (quick shop) ---- */
  function getDynamicCat(){
    try {
      var p = JSON.parse(localStorage.getItem("bk_crm_products")||"null");
      if (Array.isArray(p) && p.length > 0) {
        var res = { blend: [], powder: [], pickle: [] };
        p.forEach(function(x){
          var cat = x.category || "blend";
          if (!res[cat]) res[cat] = [];
          res[cat].push({
            id: x.id,
            name: x.name,
            min: Number(x.minPrice || x.min || 0),
            max: Number(x.maxPrice || x.max || x.minPrice || 0),
            sizes: x.sizes || "",
            img: x.img || null
          });
        });
        return res;
      }
    } catch(e){}
    return null;
  }
  var DEFAULT_CAT={"blend":[{"id":"malvani-masala","name":"malvani masala","min":95,"max":500,"sizes":"50 g · 100 g · 200 g · 500 g","img":"images/Special%20Malvani%20Masala.png"},{"id":"chicken-kolhapuri-ready-mix-masala","name":"Chicken Kolhapuri Ready Mix Masala","min":80,"max":80,"sizes":"","img":null},{"id":"chiken-lolopop-ready-mix","name":"Chicken Lollypop Ready Mix","min":40,"max":40,"sizes":"50 g","img":"images/Chiken%20Lollypop%20Ready%20Mix.png"},{"id":"chole-masala","name":"Chole Masala","min":40,"max":40,"sizes":"50 g","img":"images/Chole%20Masala.png"},{"id":"darbari-sunday-mix-masala","name":"Darbari Sunday Mix Masala","min":95,"max":475,"sizes":"","img":"images/Darbari%20Sunday%20Mix%20Masala.png"},{"id":"fikka-masala","name":"Fikka Masala","min":80,"max":160,"sizes":"100 g · 200 g","img":"images/Fikka%20Masala.png"},{"id":"misal-pav-masala","name":"Misal Pav Masala","min":45,"max":45,"sizes":"50 g","img":"images/Misal%20Pav%20Masala.png"},{"id":"moglaei-matan-masala","name":"Moghlai Matan Masala","min":80,"max":80,"sizes":"100 g","img":"images/Moghlai%20Matan%20Masala.png"},{"id":"pavbhaji-masala","name":"Pav Bhaji Masala","min":40,"max":40,"sizes":"50 g","img":"images/Pav%20Bhaji%20Masala.png"},{"id":"pulao-masala","name":"Pulao Masala","min":40,"max":40,"sizes":"50 g","img":"images/Pulao%20Masala.png"},{"id":"rajshahi-biryani-masala","name":"Rajshahi Biryani Masala","min":68,"max":68,"sizes":"50 g","img":"images/Rajshahi%20Biryani%20Masala.png"},{"id":"ready-mango-pickle-masala","name":"Ready Mango Pickle Masala","min":75,"max":150,"sizes":"100 g · 200 g","img":"images/Ready%20Mango%20Pickle%20Masala.png"},{"id":"sagar-ratn-fish-masala","name":"Sagar Ratna Fish Masala","min":80,"max":400,"sizes":"","img":"images/Sagar%20Ratna%20Fish%20Masala.png"},{"id":"sambar-masala","name":"Sambar Masala","min":40,"max":40,"sizes":"50 g","img":"images/Sambar%20Masala.png"},{"id":"special-bramhni-kala-god-masala","name":"Special Bramhni Kala Goda Masala","min":80,"max":400,"sizes":"","img":"images/Special%20Bramhni%20Kala%20Goda%20Masala.png"},{"id":"special-koli-aagri-masala","name":"Special Koli Aagri Masala","min":100,"max":500,"sizes":"100 g · 200 g · 500 g","img":"images/Special%20Koli%20Aagri%20Masala.png"},{"id":"special-malvani-masala","name":"Special Malvani Masala","min":95,"max":475,"sizes":"100 g · 200 g · 500 g","img":"images/Special%20Malvani%20Masala.png"},{"id":"special-rajdrbari-garam-masala-2","name":"Special Rajdarbari Garam Masala","min":90,"max":450,"sizes":"100 g · 200 g · 500 g","img":"images/Special%20Rajdrbari%20Garam%20Masala.png"},{"id":"super-sunday-bhajlela-mix-masala","name":"Super Sunday Bhajlela Mix Masala","min":90,"max":900,"sizes":"","img":"images/Super%20Sunday%20Bhajlela%20Mix%20Masala.png"},{"id":"tandoori-masala","name":"Tandoori Masala","min":80,"max":80,"sizes":"100 g","img":"images/Tandoori%20Masala.jpg"}],"powder":[{"id":"jeera-powder","name":"Jeera Powder","min":40,"max":80,"sizes":"50 g · 100 g","img":"images/Jeera%20powder.png"},{"id":"special-kashmiri-chili-powder","name":"Special Kashmiri Chili Powder","min":120,"max":600,"sizes":"","img":"images/Special%20Kashmiri%20Chili%20Powder.png"},{"id":"special-suruchi-mirchi-powder","name":"Special Suruchi Mirchi Powder","min":80,"max":400,"sizes":"","img":"images/Special%20Suruchi%20Mirchi%20Powder.png"},{"id":"sudha-dhane-powder","name":"Sudha Dhane Powder","min":50,"max":100,"sizes":"100 g · 200 g","img":"images/Sudha%20dhane%20Powder.png"},{"id":"suvrna-shudha-halad-powder","name":"Suvrna Shudha Halad Powder","min":60,"max":300,"sizes":"","img":"images/Suvrna%20Shudha%20Halad%20Powder.png"}],"pickle":[{"id":"aamba-god-lonche","name":"Aamba Goad Lonche","min":75,"max":130,"sizes":"200 g · 500 g","img":"images/Aamba%20Goad%20Lonche.png"},{"id":"aamba-lonche","name":"Aamba Lonche","min":75,"max":240,"sizes":"","img":"images/Aamba%20Lonche.png"},{"id":"limbi-god-lonche","name":"Limbu Goad Lonche","min":75,"max":130,"sizes":"200 g · 500 g","img":"images/Limbu%20Goad%20Lonche.png"},{"id":"limbu-lonche","name":"Limbu Lonche","min":75,"max":240,"sizes":"","img":"images/Limbu%20Lonche.png"},{"id":"mirchi-lonche","name":"Mirchi Lonche","min":75,"max":130,"sizes":"200 g · 500 g","img":"images/Mirchi%20Lonche.png"},{"id":"mix-lonche","name":"Mix Lonche","min":75,"max":240,"sizes":"","img":"images/Mix%20Lonche.png"}]};
  var CAT = getDynamicCat() || DEFAULT_CAT;
  var TABS=[["blend","Blended Spices","blended-spices.html"],["powder","Spice Powder","spice-powder.html"],["pickle","Pickle","pickle.html"]];
  function opts(p){var s=p.sizes?p.sizes.split(/\s*\u00b7\s*/):[];
    if(s.length>1){var g=parseFloat(s[0]);return s.map(function(z,i){return {size:z,price:i===0?p.min:i===s.length-1?p.max:Math.round(p.min*parseFloat(z)/g)}})}
    if(s.length===1)return [{size:s[0],price:p.min}];
    return [{size:p.min===p.max?"":"Smallest pack",price:p.min}]}
  var modal,cur="blend",lastFocus;
  function build(){
    modal=document.createElement("div");modal.className="shopmodal";modal.hidden=true;
    modal.innerHTML='<div class="sm-box" role="dialog" aria-modal="true" aria-labelledby="smT"><button class="sm-x" aria-label="Close">&times;</button>'
     +'<h3 id="smT">Shop Now</h3><p class="sm-sub">Pick a category, choose a pack size and add to your cart.</p>'
     +'<div class="sm-tabs" role="tablist">'+TABS.map(function(t){return '<button role="tab" data-tab="'+t[0]+'">'+t[1]+'</button>'}).join("")+'</div>'
     +'<div class="sm-list" id="smList"></div>'
     +'<div class="sm-foot"><a class="btn ghost" id="smAll" href="#">View all</a><a class="btn" href="cart.html"><i class="bi bi-cart3"></i> Go to cart (<span class="cartN">0</span>)</a></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener("click",function(e){
      if(e.target===modal||e.target.closest(".sm-x"))return close();
      var t=e.target.closest("[data-tab]");if(t)return show(t.dataset.tab);
      var b=e.target.closest("[data-sadd]");
      if(b){var p=CAT[cur][+b.dataset.sadd],row=b.closest(".sm-row"),s=row.querySelector("select"),o=opts(p),x=o[s?+s.value:0];
        BK.add({id:p.id,name:p.name,price:x.price,size:x.size,img:p.img?U+p.img:""},true);
        b.innerHTML='<i class="bi bi-check2"></i> Added';b.classList.add("done");setTimeout(function(){b.innerHTML='<i class="bi bi-cart-plus"></i> Add';b.classList.remove("done")},1200)}});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!modal.hidden)close()});
  }
  function show(k){
    CAT = getDynamicCat() || DEFAULT_CAT;
    cur=k;var T=TABS.filter(function(t){return t[0]===k})[0];
    modal.querySelectorAll("[data-tab]").forEach(function(b){b.classList.toggle("on",b.dataset.tab===k);b.setAttribute("aria-selected",b.dataset.tab===k)});
    modal.querySelector("#smAll").href=T[2];modal.querySelector("#smAll").textContent="View all "+T[1];
    modal.querySelector("#smList").innerHTML=CAT[k].map(function(p,n){var o=opts(p);
      var pr=p.min===p.max?rs(p.min):rs(p.min)+" \u2013 "+rs(p.max);
      var sel=o.length>1?'<select aria-label="Pack size for '+esc(p.name)+'">'+o.map(function(x,j){return '<option value="'+j+'">'+esc(x.size)+' \u2013 '+rs(x.price)+'</option>'}).join("")+'</select>':'<span class="sm-sz">'+esc(o[0].size||"")+'</span>';
      return '<div class="sm-row"><div class="sm-im">'+(p.img?'<img src="'+U+p.img+'" alt="" loading="lazy" onerror="this.remove()">':'')+'</div><div class="sm-nm"><b>'+esc(p.name)+'</b><span>'+pr+'</span></div><div class="sm-ac">'+sel+'<button class="btn" data-sadd="'+n+'"><i class="bi bi-cart-plus"></i> Add</button></div></div>'}).join("");
    badge()}
  function open(k){if(!modal)build();lastFocus=document.activeElement;show(CAT[k]?k:"blend");modal.hidden=false;document.body.style.overflow="hidden";modal.querySelector(".sm-x").focus()}
  function close(){modal.hidden=true;document.body.style.overflow="";if(lastFocus&&lastFocus.focus)lastFocus.focus()}
  BK.openShop=open;
  document.addEventListener("click",function(e){var a=e.target.closest("[data-shop]");
    if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;e.preventDefault();open(a.dataset.shop)});
})();
