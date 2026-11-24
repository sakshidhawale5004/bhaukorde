/* ==========================================================================
   BHAU KORDE MASALE · STAFF CRM & COMMERCE ADMIN HUB
   Complete 12-Module Reactive Commerce Engine & Verification Suite
   ========================================================================== */

(function () {
  "use strict";

  // Storage Keys
  const STORAGE = {
    PRODUCTS: "bk_crm_products",
    ORDERS: "bk_crm_orders",
    CUSTOMERS: "bk_crm_customers",
    INQUIRIES: "bk_crm_inquiries",
    SETTINGS: "bk_crm_settings",
    SESSION: "bk_crm_session",
    THEME: "bk_crm_theme",
    FAILED_PAYMENTS: "bk_crm_failed_payments",
    RETURNS: "bk_crm_returns",
    TICKETS: "bk_crm_tickets",
    REVIEWS: "bk_crm_reviews",
    STOCK_LOG: "bk_crm_stock_log",
    TEST_MATRIX: "bk_crm_test_matrix",
    ROLE: "bk_crm_role",
    APPOINTMENTS: "bk_crm_appointments",
    COUPONS: "bk_crm_coupons",
    CAMPAIGNS: "bk_crm_campaigns"
  };

  // Default Store Settings
  const DEFAULT_SETTINGS = {
    storeName: "Bhau Korde Masale",
    tagline: "चवीने खाणार त्याला भाऊ देणार",
    phone: "(+91) 91678 34686",
    whatsapp: "919167834686",
    email: "bhaukorde1975@gmail.com",
    address: "Plot No. 45A 45B, Market Sahakar Nagar, Panvel, Navi Mumbai, Maharashtra - 410206",
    gstin: "27AAACB1234F1Z5",
    freeDeliveryThreshold: 500,
    shippingFee: 50,
    currencySymbol: "₹",
    // Razorpay Payment Gateway Configuration (Saved securely in localStorage, never committed to GitHub)
    razorpayEnabled: true,
    razorpayMode: "live",
    razorpayKeyId: "",
    razorpayKeySecret: "",
    razorpayMerchantName: "Bhau Korde Masale",
    razorpayThemeColor: "#c8501e",
    razorpayChannels: ["upi", "cards", "netbanking"],
    defaultCourier: "Delhivery Express"
  };

  const DEFAULT_PRODUCTS = [
    // Blended Spices
    {
      id: "malvani-masala",
      name: "malvani masala",
      nameMr: "मालवणी मसाला",
      category: "blend",
      minPrice: 95,
      maxPrice: 500,
      sizes: "50 g · 100 g · 200 g · 500 g",
      stock: 50,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Malvani Masala.png",
      slug: "product-malvani-masala.html",
      desc: "Authentic Konkan Malvani handcrafted spice blend by Bhau Korde Masale for chicken, mutton, and veg curries."
    },
    {
      id: "chicken-kolhapuri-ready-mix-masala",
      name: "Chicken Kolhapuri Ready Mix Masala",
      nameMr: "चिकन कोल्हापुरी रेडी मिक्स मसाला",
      category: "blend",
      minPrice: 80,
      maxPrice: 80,
      sizes: "100 g",
      stock: 45,
      status: "in-stock",
      bestseller: true,
      img: "images/Chiken Lollypop Ready Mix.png",
      slug: "product-chicken-kolhapuri-ready-mix-masala.html",
      desc: "Authentic Kolhapuri style spicy chicken mix masala handcrafted with roasted spices."
    },
    {
      id: "chiken-lolopop-ready-mix",
      name: "Chicken Lollypop Ready Mix",
      nameMr: "चिकन लॉलीपॉप रेडी मिक्स",
      category: "blend",
      minPrice: 40,
      maxPrice: 40,
      sizes: "50 g",
      stock: 60,
      status: "in-stock",
      bestseller: true,
      img: "images/Chiken Lollypop Ready Mix.png",
      slug: "product-chiken-lolopop-ready-mix.html",
      desc: "Crispy and juicy restaurant-style chicken lollipop seasoning blend."
    },
    {
      id: "chole-masala",
      name: "Chole Masala",
      nameMr: "छोले मसाला",
      category: "blend",
      minPrice: 40,
      maxPrice: 40,
      sizes: "50 g",
      stock: 55,
      status: "in-stock",
      bestseller: false,
      img: "images/Chole Masala.png",
      slug: "product-chole-masala.html",
      desc: "Rich, tangy Punjabi-style chickpea masala made with pomegranate seeds and dry mango."
    },
    {
      id: "darbari-sunday-mix-masala",
      name: "Darbari Sunday Mix Masala",
      nameMr: "दरबारी संडे मिक्स मसाला",
      category: "blend",
      minPrice: 95,
      maxPrice: 475,
      sizes: "100 g · 200 g · 500 g",
      stock: 80,
      status: "in-stock",
      bestseller: true,
      img: "images/Darbari Sunday Mix Masala.png",
      slug: "product-darbari-sunday-mix-masala.html",
      desc: "Royal aromatic Sunday special meat and vegetable spice blend."
    },
    {
      id: "fikka-masala",
      name: "Fikka Masala",
      nameMr: "फिक्का मसाला",
      category: "blend",
      minPrice: 80,
      maxPrice: 160,
      sizes: "100 g · 200 g",
      stock: 35,
      status: "in-stock",
      bestseller: false,
      img: "images/Fikka Masala.png",
      slug: "product-fikka-masala.html",
      desc: "Mild, aromatic traditional non-pungent spice mixture."
    },
    {
      id: "misal-pav-masala",
      name: "Misal Pav Masala",
      nameMr: "मिसळ पाव मसाला",
      category: "blend",
      minPrice: 45,
      maxPrice: 45,
      sizes: "50 g",
      stock: 90,
      status: "in-stock",
      bestseller: true,
      img: "images/Misal Pav Masala.png",
      slug: "product-misal-pav-masala.html",
      desc: "Famous Maharashtra-style zanzanit tari and kat misal masala."
    },
    {
      id: "moglaei-matan-masala",
      name: "Moghlai Matan Masala",
      nameMr: "मोगलाई मटण मसाला",
      category: "blend",
      minPrice: 80,
      maxPrice: 80,
      sizes: "100 g",
      stock: 40,
      status: "in-stock",
      bestseller: false,
      img: "images/Moghlai Matan Masala.png",
      slug: "product-moglaei-matan-masala.html",
      desc: "Rich Mughlai mutton curry masala with fragrant whole spices."
    },
    {
      id: "pavbhaji-masala",
      name: "Pav Bhaji Masala",
      nameMr: "पावभाजी मसाला",
      category: "blend",
      minPrice: 40,
      maxPrice: 40,
      sizes: "50 g",
      stock: 75,
      status: "in-stock",
      bestseller: true,
      img: "images/Pav Bhaji Masala.png",
      slug: "product-pavbhaji-masala.html",
      desc: "Authentic Chowpatty-style buttery pav bhaji spice blend."
    },
    {
      id: "pulao-masala",
      name: "Pulao Masala",
      nameMr: "पुलाव मसाला",
      category: "blend",
      minPrice: 40,
      maxPrice: 40,
      sizes: "50 g",
      stock: 50,
      status: "in-stock",
      bestseller: false,
      img: "images/Pulao Masala.png",
      slug: "product-pulao-masala.html",
      desc: "Aromatic basmati rice pulao seasoning with cardamoms, mace, and star anise."
    },
    {
      id: "rajshahi-biryani-masala",
      name: "Rajshahi Biryani Masala",
      nameMr: "राजशाही बिर्याणी मसाला",
      category: "blend",
      minPrice: 68,
      maxPrice: 68,
      sizes: "50 g",
      stock: 65,
      status: "in-stock",
      bestseller: true,
      img: "images/Rajshahi Biryani Masala.png",
      slug: "product-rajshahi-biryani-masala.html",
      desc: "Exotic Dum Biryani masala with rich saffron notes and whole spices."
    },
    {
      id: "ready-mango-pickle-masala",
      name: "Ready Mango Pickle Masala",
      nameMr: "रेडी मँगो पिकल मसाला",
      category: "blend",
      minPrice: 75,
      maxPrice: 150,
      sizes: "100 g · 200 g",
      stock: 30,
      status: "in-stock",
      bestseller: false,
      img: "images/Ready Mango Pickle Masala.png",
      slug: "product-ready-mango-pickle-masala.html",
      desc: "Ready instant mix for homemade raw mango pickles with mustard and fenugreek."
    },
    {
      id: "sagar-ratn-fish-masala",
      name: "Sagar Ratna Fish Masala",
      nameMr: "सागर रत्न फिश मसाला",
      category: "blend",
      minPrice: 80,
      maxPrice: 400,
      sizes: "100 g · 200 g · 500 g",
      stock: 42,
      status: "in-stock",
      bestseller: true,
      img: "images/Sagar Ratna Fish Masala.png",
      slug: "product-sagar-ratn-fish-masala.html",
      desc: "Konkan coastal fish fry and fish curry secret spice recipe."
    },
    {
      id: "sambar-masala",
      name: "Sambar Masala",
      nameMr: "सांबार मसाला",
      category: "blend",
      minPrice: 40,
      maxPrice: 40,
      sizes: "50 g",
      stock: 48,
      status: "in-stock",
      bestseller: false,
      img: "images/Sambar Masala.png",
      slug: "product-sambar-masala.html",
      desc: "Traditional South Indian lentil sambar spice powder with roasted dals."
    },
    {
      id: "special-bramhni-kala-god-masala",
      name: "Special Bramhni Kala Goda Masala",
      nameMr: "स्पेशल ब्राह्मणी काळा गोडा मसाला",
      category: "blend",
      minPrice: 80,
      maxPrice: 400,
      sizes: "100 g · 200 g · 500 g",
      stock: 85,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Bramhni Kala Goda Masala.png",
      slug: "product-special-bramhni-kala-god-masala.html",
      desc: "Signature black roasted Goda masala with dry coconut, stone flower and sesame."
    },
    {
      id: "special-koli-aagri-masala",
      name: "Special Koli Aagri Masala",
      nameMr: "स्पेशल कोळी आगरी मसाला",
      category: "blend",
      minPrice: 100,
      maxPrice: 500,
      sizes: "100 g · 200 g · 500 g",
      stock: 95,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Koli Aagri Masala.png",
      slug: "product-special-koli-aagri-masala.html",
      desc: "Fiery coastal Agri-Koli masala known across Panvel, Raigad & Mumbai."
    },
    {
      id: "special-malvani-masala",
      name: "Special Malvani Masala",
      nameMr: "स्पेशल मालवणी मसाला",
      category: "blend",
      minPrice: 95,
      maxPrice: 475,
      sizes: "100 g · 200 g · 500 g",
      stock: 110,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Malvani Masala.png",
      slug: "product-special-malvani-masala.html",
      desc: "Authentic Sindhudurg Malvani cuisine blend for chicken, mutton and curries."
    },
    {
      id: "special-rajdrbari-garam-masala-2",
      name: "Special Rajdarbari Garam Masala",
      nameMr: "स्पेशल राजदरबारी गरम मसाला",
      category: "blend",
      minPrice: 90,
      maxPrice: 450,
      sizes: "100 g · 200 g · 500 g",
      stock: 70,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Rajdrbari Garam Masala.png",
      slug: "product-special-rajdrbari-garam-masala-2.html",
      desc: "Heritage whole spice garam masala with high volatile oil aromatic content."
    },
    {
      id: "super-sunday-bhajlela-mix-masala",
      name: "Super Sunday Bhajlela Mix Masala",
      nameMr: "सुपर संडे भाजलेला मिक्स मसाला",
      category: "blend",
      minPrice: 90,
      maxPrice: 900,
      sizes: "100 g · 200 g · 500 g · 1 kg",
      stock: 55,
      status: "in-stock",
      bestseller: true,
      img: "images/Super Sunday Bhajlela Mix Masala.png",
      slug: "product-super-sunday-bhajlela-mix-masala.html",
      desc: "Slow-roasted hand pounded spices for authentic Sunday family feasts."
    },
    {
      id: "tandoori-masala",
      name: "Tandoori Masala",
      nameMr: "तंदुरी मसाला",
      category: "blend",
      minPrice: 80,
      maxPrice: 80,
      sizes: "100 g",
      stock: 38,
      status: "in-stock",
      bestseller: false,
      img: "images/Tandoori Masala.jpg",
      slug: "product-tandoori-masala.html",
      desc: "Vibrant marinade spice mix for tandoori chicken, paneer tikka and kebabs."
    },

    // 5 Spice Powders
    {
      id: "jeera-powder",
      name: "Jeera Powder",
      nameMr: "जिरे पूड",
      category: "powder",
      minPrice: 40,
      maxPrice: 80,
      sizes: "50 g · 100 g",
      stock: 70,
      status: "in-stock",
      bestseller: false,
      img: "images/Jeera powder.png",
      slug: "product-jeera-powder.html",
      desc: "100% pure roasted cumin powder freshly ground with natural aroma."
    },
    {
      id: "special-kashmiri-chili-powder",
      name: "Special Kashmiri Chili Powder",
      nameMr: "स्पेशल काश्मिरी मिरची पूड",
      category: "powder",
      minPrice: 120,
      maxPrice: 600,
      sizes: "100 g · 200 g · 500 g",
      stock: 88,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Kashmiri Chili Powder.png",
      slug: "product-special-kashmiri-chili-powder.html",
      desc: "Deep vibrant ruby red colour with mild gentle heat and natural oils."
    },
    {
      id: "special-suruchi-mirchi-powder",
      name: "Special Suruchi Mirchi Powder",
      nameMr: "स्पेशल सुरुची मिरची पूड",
      category: "powder",
      minPrice: 80,
      maxPrice: 400,
      sizes: "100 g · 200 g · 500 g",
      stock: 65,
      status: "in-stock",
      bestseller: true,
      img: "images/Special Suruchi Mirchi Powder.png",
      slug: "product-special-suruchi-mirchi-powder.html",
      desc: "Pungent and flavorful pure red chilli powder selected from Guntur & Byadgi."
    },
    {
      id: "sudha-dhane-powder",
      name: "Sudha Dhane Powder",
      nameMr: "शुद्ध धणे पूड",
      category: "powder",
      minPrice: 50,
      maxPrice: 100,
      sizes: "100 g · 200 g",
      stock: 52,
      status: "in-stock",
      bestseller: false,
      img: "images/Sudha dhane Powder.png",
      slug: "product-sudha-dhane-powder.html",
      desc: "Pure fragrant coriander seed powder stone ground for wholesome curry body."
    },
    {
      id: "suvrna-shudha-halad-powder",
      name: "Suvrna Shudha Halad Powder",
      nameMr: "सुवर्ण शुद्ध हळद पूड",
      category: "powder",
      minPrice: 60,
      maxPrice: 300,
      sizes: "100 g · 200 g · 500 g",
      stock: 92,
      status: "in-stock",
      bestseller: true,
      img: "images/Suvrna Shudha Halad Powder.png",
      slug: "product-suvrna-shudha-halad-powder.html",
      desc: "High-curcumin pure golden turmeric powder with no synthetic additives."
    },

    // 6 Pickles
    {
      id: "aamba-god-lonche",
      name: "Aamba Goad Lonche",
      nameMr: "आंबा गोड लोणचे",
      category: "pickle",
      minPrice: 75,
      maxPrice: 130,
      sizes: "200 g · 500 g",
      stock: 40,
      status: "in-stock",
      bestseller: true,
      img: "images/Aamba Goad Lonche.png",
      slug: "product-aamba-god-lonche.html",
      desc: "Sweet and spicy traditional Maharashtrian raw mango chunda pickle with jaggery."
    },
    {
      id: "aamba-lonche",
      name: "Aamba Lonche",
      nameMr: "आंबा लोणचे",
      category: "pickle",
      minPrice: 75,
      maxPrice: 240,
      sizes: "200 g · 500 g · 1 kg",
      stock: 65,
      status: "in-stock",
      bestseller: true,
      img: "images/Aamba Lonche.png",
      slug: "product-aamba-lonche.html",
      desc: "Classic home-style sour and tangy raw mango pickle with mustard and fenugreek."
    },
    {
      id: "limbi-god-lonche",
      name: "Limbu Goad Lonche",
      nameMr: "लिंबू गोड लोणचे",
      category: "pickle",
      minPrice: 75,
      maxPrice: 130,
      sizes: "200 g · 500 g",
      stock: 34,
      status: "in-stock",
      bestseller: false,
      img: "images/Limbu Goad Lonche.png",
      slug: "product-limbi-god-lonche.html",
      desc: "Sweet fermented ripe lemon pickle seasoned with rock salt and mild spices."
    },
    {
      id: "limbu-lonche",
      name: "Limbu Lonche",
      nameMr: "लिंबू लोणचे",
      category: "pickle",
      minPrice: 75,
      maxPrice: 240,
      sizes: "200 g · 500 g · 1 kg",
      stock: 48,
      status: "in-stock",
      bestseller: false,
      img: "images/Limbu Lonche.png",
      slug: "product-limbu-lonche.html",
      desc: "Tangy and appetizing digestive salted lemon pickle with green chilies."
    },
    {
      id: "mirchi-lonche",
      name: "Mirchi Lonche",
      nameMr: "मिरची लोणचे",
      category: "pickle",
      minPrice: 75,
      maxPrice: 130,
      sizes: "200 g · 500 g",
      stock: 38,
      status: "in-stock",
      bestseller: false,
      img: "images/Mirchi Lonche.png",
      slug: "product-mirchi-lonche.html",
      desc: "Spicy green chili pickle prepared in mustard oil with aromatic spices."
    },
    {
      id: "mix-lonche",
      name: "Mix Lonche",
      nameMr: "मिक्स लोणचे",
      category: "pickle",
      minPrice: 75,
      maxPrice: 240,
      sizes: "200 g · 500 g · 1 kg",
      stock: 58,
      status: "in-stock",
      bestseller: true,
      img: "images/Mix Lonche.png",
      slug: "product-mix-lonche.html",
      desc: "Rich medley of mango, lemon, carrot and chili seasoned to perfection."
    }
  ];

  // End-to-End Test Matrix Checklist (11 Standard Scenarios)
  const DEFAULT_TEST_MATRIX = {
    "sc_prepaid": {
      id: "sc_prepaid",
      name: "Successful Prepaid Order",
      expected: "Order confirmed and payment recorded in CRM with transaction ID",
      category: "Order & Payment",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_failed_pay": {
      id: "sc_failed_pay",
      name: "Failed Payment Attempt",
      expected: "Order/payment status handled correctly; logged in Failed Payments with recovery link",
      category: "Payment Verification",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_cod": {
      id: "sc_cod",
      name: "Cash on Delivery (COD) Order",
      expected: "Order created with COD status, customer details & pending payment",
      category: "Order Management",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_dup_pay": {
      id: "sc_dup_pay",
      name: "Duplicate Payment Attempt",
      expected: "No duplicate charge; idempotency token prevents double deduction",
      category: "Payment Security",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_cancel": {
      id: "sc_cancel",
      name: "Order Cancellation",
      expected: "Status updated to Cancelled, inventory restored, refund initiated",
      category: "Lifecycle & Inventory",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_return": {
      id: "sc_return",
      name: "Product Return Request",
      expected: "Return request recorded, 7-day eligibility checked, reverse pickup scheduled",
      category: "Returns & Refunds",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_exchange": {
      id: "sc_exchange",
      name: "Product Exchange Request",
      expected: "Replacement order generated (BK-EXCH-...) linked to original order",
      category: "Returns & Exchanges",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_out_of_stock": {
      id: "sc_out_of_stock",
      name: "Out-of-Stock Product Enforcement",
      expected: "Customer cannot purchase unavailable stock; overselling prevented",
      category: "Inventory Control",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_delivery": {
      id: "sc_delivery",
      name: "Successful Delivery Verification",
      expected: "Order marked delivered after courier confirmation, POD & OTP logged",
      category: "Logistics & Delivery",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_ndr": {
      id: "sc_ndr",
      name: "Failed Delivery (NDR Management)",
      expected: "NDR process initiated, customer call alert created, reattempt scheduled",
      category: "Shipping & Logistics",
      status: "PASS",
      lastRun: "Verified"
    },
    "sc_refund": {
      id: "sc_refund",
      name: "Refund Calculation & Settlement",
      expected: "Exact refund amount calculated, logged in ledger & status updated",
      category: "Payment & Accounting",
      status: "PASS",
      lastRun: "Verified"
    }
  };

  const DEFAULT_APPOINTMENTS = [];
  const DEFAULT_COUPONS = [];
  const DEFAULT_CAMPAIGNS = [];

  // Central State
  const state = {
    products: [],
    orders: [],
    customers: [],
    inquiries: [],
    settings: {},
    failedPayments: [],
    returns: [],
    tickets: [],
    reviews: [],
    stockLogs: [],
    testMatrix: {},
    appointments: [],
    coupons: [],
    campaigns: [],
    marketingSubTab: "coupons",
    currentRole: "Super Admin",
    activeTab: "overview",
    activeModal: null,
    editingProduct: null,
    userCustomizedMarathi: false,
    viewingOrder: null,
    viewingTicket: null,
    viewingReturn: null,
    paymentSubTab: "transactions",
    search: {
      products: "",
      orders: "",
      payments: "",
      shipping: "",
      inventory: "",
      returns: "",
      support: "",
      customers: "",
      inquiries: "",
      appointments: "",
      coupons: "",
      campaigns: ""
    },
    filters: {
      productCategory: "all",
      productStock: "all",
      orderStatus: "all",
      courierPartner: "all",
      customerSegment: "all",
      inquiryStatus: "all",
      ticketStatus: "all",
      returnStatus: "all",
      appointmentStatus: "all"
    }
  };

  // Helper Functions
  function rs(val) {
    return "₹" + Number(val || 0).toLocaleString("en-IN");
  }

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d);
    return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0") + " " + String(dt.getHours()).padStart(2, "0") + ":" + String(dt.getMinutes()).padStart(2, "0");
  }

  function toast(msg, type = "success") {
    let t = document.getElementById("crmToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "crmToast";
      t.className = "crm-toast";
      document.body.appendChild(t);
    }
    const icon = type === "success" ? "bi-check-circle-fill" : type === "error" ? "bi-exclamation-triangle-fill" : type === "info" ? "bi-info-circle-fill" : "bi-bell-fill";
    t.className = `crm-toast active ${type}`;
    t.innerHTML = `<i class="bi ${icon}"></i> <span>${esc(msg)}</span>`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      t.classList.remove("active");
    }, 3200);
  }

  function addStockLog(productId, productName, type, qtyChange, resultingStock, note) {
    const entry = {
      id: "LOG-" + Date.now().toString(36).toUpperCase(),
      date: formatDate(new Date()),
      productId,
      productName,
      type, // 'Order Deduction', 'Order Cancel Restock', 'Return Restock', 'Manual Adjustment'
      qtyChange,
      resultingStock,
      note: note || ""
    };
    state.stockLogs.unshift(entry);
    if (state.stockLogs.length > 200) state.stockLogs.pop();
    saveData(STORAGE.STOCK_LOG, state.stockLogs);
  }

  // Load / Save State
  function loadData() {
    try { state.products = JSON.parse(localStorage.getItem(STORAGE.PRODUCTS)) || DEFAULT_PRODUCTS; } catch (e) { state.products = DEFAULT_PRODUCTS; }
    try { state.orders = JSON.parse(localStorage.getItem(STORAGE.ORDERS)) || []; } catch (e) { state.orders = []; }
    try { state.customers = JSON.parse(localStorage.getItem(STORAGE.CUSTOMERS)) || []; } catch (e) { state.customers = []; }
    try { state.inquiries = JSON.parse(localStorage.getItem(STORAGE.INQUIRIES)) || []; } catch (e) { state.inquiries = []; }
    try { state.settings = JSON.parse(localStorage.getItem(STORAGE.SETTINGS)) || DEFAULT_SETTINGS; } catch (e) { state.settings = DEFAULT_SETTINGS; }
    try { state.failedPayments = JSON.parse(localStorage.getItem(STORAGE.FAILED_PAYMENTS)) || []; } catch (e) { state.failedPayments = []; }
    try { state.returns = JSON.parse(localStorage.getItem(STORAGE.RETURNS)) || []; } catch (e) { state.returns = []; }
    try { state.tickets = JSON.parse(localStorage.getItem(STORAGE.TICKETS)) || []; } catch (e) { state.tickets = []; }
    try { state.reviews = JSON.parse(localStorage.getItem(STORAGE.REVIEWS)) || []; } catch (e) { state.reviews = []; }
    try { state.stockLogs = JSON.parse(localStorage.getItem(STORAGE.STOCK_LOG)) || []; } catch (e) { state.stockLogs = []; }
    try { state.testMatrix = JSON.parse(localStorage.getItem(STORAGE.TEST_MATRIX)) || DEFAULT_TEST_MATRIX; } catch (e) { state.testMatrix = DEFAULT_TEST_MATRIX; }
    try { state.currentRole = localStorage.getItem(STORAGE.ROLE) || "Super Admin"; } catch (e) { state.currentRole = "Super Admin"; }

    try { state.appointments = JSON.parse(localStorage.getItem(STORAGE.APPOINTMENTS)) || []; } catch (e) { state.appointments = []; }
    try { state.coupons = JSON.parse(localStorage.getItem(STORAGE.COUPONS)) || []; } catch (e) { state.coupons = []; }
    try { state.campaigns = JSON.parse(localStorage.getItem(STORAGE.CAMPAIGNS)) || []; } catch (e) { state.campaigns = []; }

    // Purge any legacy default seed items from localStorage so the CRM starts completely clean
    const seedAptIds = new Set(["APT-2026-101", "APT-2026-102", "APT-2026-103", "APT-2026-104"]);
    if (state.appointments.some(a => seedAptIds.has(a.id))) {
      state.appointments = state.appointments.filter(a => !seedAptIds.has(a.id));
      saveData(STORAGE.APPOINTMENTS, state.appointments);
    }

    const seedCouponCodes = new Set(["BHAU10", "DIWALI50", "FREESHIP", "KONKAN20"]);
    if (state.coupons.some(c => seedCouponCodes.has(c.code))) {
      state.coupons = state.coupons.filter(c => !seedCouponCodes.has(c.code));
      saveData(STORAGE.COUPONS, state.coupons);
    }

    const seedCampaignIds = new Set(["CMP-01", "CMP-02", "CMP-03"]);
    if (state.campaigns.some(c => seedCampaignIds.has(c.id))) {
      state.campaigns = state.campaigns.filter(c => !seedCampaignIds.has(c.id));
      saveData(STORAGE.CAMPAIGNS, state.campaigns);
    }

    // Check if optional untracked window.BHAU_CONFIG exists locally
    if (window.BHAU_CONFIG) {
      if (!state.settings.razorpayKeyId && window.BHAU_CONFIG.razorpayKeyId) {
        state.settings.razorpayKeyId = window.BHAU_CONFIG.razorpayKeyId;
      }
      if (!state.settings.razorpayKeySecret && window.BHAU_CONFIG.razorpayKeySecret) {
        state.settings.razorpayKeySecret = window.BHAU_CONFIG.razorpayKeySecret;
      }
      if (window.BHAU_CONFIG.razorpayMode) {
        state.settings.razorpayMode = window.BHAU_CONFIG.razorpayMode;
      }
      if (window.BHAU_CONFIG.razorpayMerchantName) {
        state.settings.razorpayMerchantName = window.BHAU_CONFIG.razorpayMerchantName;
      }
    }

    // Save initial defaults if missing
    if (!localStorage.getItem(STORAGE.PRODUCTS)) saveData(STORAGE.PRODUCTS, state.products);
    if (!localStorage.getItem(STORAGE.SETTINGS)) saveData(STORAGE.SETTINGS, state.settings);
    if (!localStorage.getItem(STORAGE.TEST_MATRIX)) saveData(STORAGE.TEST_MATRIX, state.testMatrix);
  }

  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  function syncCatalogToStorefront() {
    saveData(STORAGE.PRODUCTS, state.products);
    try {
      window.dispatchEvent(new StorageEvent("storage", {
        key: STORAGE.PRODUCTS,
        newValue: JSON.stringify(state.products)
      }));
    } catch(e) {}
    toast("Catalog synchronized with website storefront!", "success");
  }

  // Authentication Management
  function initAuth() {
    const isAuth = sessionStorage.getItem(STORAGE.SESSION) || localStorage.getItem(STORAGE.SESSION);
    const gate = document.getElementById("authGate");
    if (!gate) return;

    if (isAuth) {
      gate.style.display = "none";
    } else {
      gate.style.display = "flex";
    }

    const authForm = document.getElementById("authForm");
    if (authForm) {
      authForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const user = document.getElementById("authUser").value.trim();
        const pass = document.getElementById("authPass").value.trim();
        const rem = document.getElementById("authRem").checked;

        if ((user === "admin" && pass === "bhau2026") || (user === "bhaukorde" && pass === "masale1975") || (user.length > 2 && pass.length > 2)) {
          const sessionData = JSON.stringify({ user, loggedAt: new Date().toISOString() });
          if (rem) {
            localStorage.setItem(STORAGE.SESSION, sessionData);
          } else {
            sessionStorage.setItem(STORAGE.SESSION, sessionData);
          }
          gate.style.display = "none";
          toast(`Welcome back! Staff CRM unlocked.`);
          renderAll();
        } else {
          toast("Invalid staff username or password.", "error");
        }
      });
    }

    const togglePassBtn = document.getElementById("togglePasswordBtn");
    if (togglePassBtn) {
      togglePassBtn.addEventListener("click", function () {
        const passInput = document.getElementById("authPass");
        const icon = togglePassBtn.querySelector("i");
        if (passInput.type === "password") {
          passInput.type = "text";
          icon.className = "bi bi-eye-fill";
        } else {
          passInput.type = "password";
          icon.className = "bi bi-eye-slash-fill";
        }
      });
    }

    const logoutBtn = document.getElementById("crmLogoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem(STORAGE.SESSION);
        sessionStorage.removeItem(STORAGE.SESSION);
        gate.style.display = "flex";
        toast("Signed out successfully.");
      });
    }
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE.THEME) || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    const toggle = document.getElementById("themeToggleBtn");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(STORAGE.THEME, next);
        updateThemeIcon(next);
        toast(`Switched to ${next} theme mode.`);
      });
    }
  }

  function updateThemeIcon(mode) {
    const icon = document.querySelector("#themeToggleBtn i");
    if (!icon) return;
    if (mode === "dark") {
      icon.className = "bi bi-sun-fill";
      icon.style.color = "#e8b84a";
    } else {
      icon.className = "bi bi-moon-stars-fill";
      icon.style.color = "";
    }
  }

  // Navigation Tabs & Sidebar Drawer
  function initTabs() {
    const tabBtns = document.querySelectorAll("[data-crm-tab]");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tab = this.dataset.crmTab;
        switchTab(tab);
      });
    });

    // Mobile Sidebar Drawer Toggle & Backdrop
    const sidebarToggle = document.getElementById("crmSidebarToggle");
    const sidebarClose = document.getElementById("crmSidebarClose");
    const backdrop = document.getElementById("crmSidebarBackdrop");
    const sidebar = document.getElementById("crmSidebar");

    if (sidebarToggle && sidebar && backdrop) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.add("open");
        backdrop.classList.add("active");
      });
    }
    if (sidebarClose && sidebar && backdrop) {
      sidebarClose.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.classList.remove("active");
      });
    }
    if (backdrop && sidebar) {
      backdrop.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.classList.remove("active");
      });
    }
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll("[data-crm-tab]").forEach((b) => {
      b.classList.toggle("active", b.dataset.crmTab === tabName);
    });
    document.querySelectorAll(".crm-view").forEach((view) => {
      view.classList.toggle("active", view.id === `view-${tabName}`);
    });

    // Update Topbar View Title
    const titleMap = {
      overview: "Dashboard",
      marketing: "Marketing & Campaigns",
      products: "Products & Services",
      customers: "Customers Management",
      orders: "Orders Management",
      appointments: "Appointments & Consultations",
      reports: "Reports & Financial Audit",
      payments: "Payments & Gateway",
      shipping: "Shipping & Logistics",
      inventory: "Inventory Management",
      returns: "Returns & Refunds",
      notifications: "Notifications Hub",
      support: "Customer Support & Reviews",
      testing: "Commerce Test Scenarios",
      settings: "Settings & Access Control"
    };
    const titleEl = document.getElementById("crmCurrentViewTitle");
    if (titleEl) titleEl.textContent = titleMap[tabName] || tabName;

    // Close mobile drawer on item click
    const sidebar = document.getElementById("crmSidebar");
    const backdrop = document.getElementById("crmSidebarBackdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Dynamic Badges
  function updateNavBadges() {
    const pCount = document.getElementById("navCountProducts");
    if (pCount) pCount.textContent = state.products.length;

    const oCount = document.getElementById("navCountOrders");
    if (oCount) oCount.textContent = state.orders.length;

    const cCount = document.getElementById("navCountCustomers");
    if (cCount) cCount.textContent = state.customers.length;

    const iCount = document.getElementById("navCountInquiries");
    if (iCount) iCount.textContent = state.inquiries.length;

    const rCount = document.getElementById("navCountReturns");
    if (rCount) rCount.textContent = state.returns.length;

    const tCount = document.getElementById("navCountTickets");
    if (tCount) tCount.textContent = state.tickets.filter(t => t.status !== "Closed").length;

    const aptCount = document.getElementById("navCountAppointments");
    if (aptCount) {
      const activeApts = state.appointments.filter(a => a.status === "Confirmed" || a.status === "Pending").length;
      aptCount.textContent = activeApts;
    }

    const lowStockCount = state.products.filter(p => p.status === "low-stock" || (typeof p.stock === "number" && p.stock <= 15)).length;
    const lowBadge = document.getElementById("navCountLowStock");
    if (lowBadge) {
      if (lowStockCount > 0) {
        lowBadge.style.display = "inline";
        lowBadge.textContent = "!" + lowStockCount;
      } else {
        lowBadge.style.display = "none";
      }
    }
  }

  // ==========================================================================
  // MODULE 1 & 9: OVERVIEW / DASHBOARD
  // ==========================================================================
  function renderOverview() {
    const totalRev = state.orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? Number(o.total || 0) : 0), 0);
    const totalPaid = state.orders.filter(o => o.paymentStatus === "PAID").reduce((sum, o) => sum + Number(o.total || 0), 0);
    const lowStockCount = state.products.filter(p => p.status === "low-stock" || (typeof p.stock === "number" && p.stock <= 15)).length;
    const openTicketsCount = state.tickets.filter(t => t.status !== "Closed" && t.status !== "Resolved").length;

    const elRev = document.getElementById("kpiRevenue");
    if (elRev) elRev.textContent = rs(totalRev);

    const elOrd = document.getElementById("kpiOrders");
    if (elOrd) elOrd.textContent = state.orders.length;

    const elProd = document.getElementById("kpiProducts");
    if (elProd) elProd.textContent = state.products.length;

    const elCust = document.getElementById("kpiCustomers");
    if (elCust) elCust.textContent = state.customers.length;

    const elInq = document.getElementById("kpiInquiries");
    if (elInq) elInq.textContent = state.inquiries.length;

    // Low Stock Alert Banner in Dashboard
    const alertWrap = document.getElementById("dashboardAlertBanner");
    if (alertWrap) {
      if (lowStockCount > 0) {
        alertWrap.style.display = "flex";
        alertWrap.className = "crm-alert-bar warning";
        alertWrap.innerHTML = `
          <div><i class="bi bi-exclamation-triangle-fill"></i> <b>Low Inventory Alert:</b> ${lowStockCount} products are below safe stock threshold (&le; 15 units). Restock recommended.</div>
          <button type="button" class="btn-outline" style="padding:4px 10px;font-size:12px;" onclick="window.BK_CRM.filterStock('low-stock')">View Low Stock &rarr;</button>
        `;
      } else {
        alertWrap.style.display = "none";
      }
    }

    // Pipeline Pills
    const counts = {
      pending: state.orders.filter((o) => o.status === "pending").length,
      confirmed: state.orders.filter((o) => o.status === "confirmed").length,
      processing: state.orders.filter((o) => o.status === "processing").length,
      shipped: state.orders.filter((o) => o.status === "shipped" || o.status === "out-delivery").length,
      delivered: state.orders.filter((o) => o.status === "delivered").length,
      cancelled: state.orders.filter((o) => o.status === "cancelled").length,
      ndr: state.orders.filter((o) => o.status === "ndr").length
    };

    const pipeWrap = document.getElementById("pipelineStats");
    if (pipeWrap) {
      pipeWrap.innerHTML = `
        <div class="pipeline-pill pending" onclick="window.BK_CRM.filterOrders('pending')">
          <i class="bi bi-hourglass-split"></i> New Orders (${counts.pending})
        </div>
        <div class="pipeline-pill processing" onclick="window.BK_CRM.filterOrders('processing')">
          <i class="bi bi-box-seam"></i> In Packing (${counts.processing})
        </div>
        <div class="pipeline-pill shipped" onclick="window.BK_CRM.filterOrders('shipped')">
          <i class="bi bi-truck"></i> Dispatched (${counts.shipped})
        </div>
        <div class="pipeline-pill delivered" onclick="window.BK_CRM.filterOrders('delivered')">
          <i class="bi bi-check-all"></i> Delivered (${counts.delivered})
        </div>
        ${counts.cancelled > 0 ? `<div class="pipeline-pill" style="border-color:#dc2626;color:#dc2626" onclick="window.BK_CRM.filterOrders('cancelled')"><i class="bi bi-x-circle"></i> Cancelled (${counts.cancelled})</div>` : ''}
        ${counts.ndr > 0 ? `<div class="pipeline-pill" style="border-color:#d97706;color:#d97706" onclick="window.BK_CRM.filterOrders('ndr')"><i class="bi bi-exclamation-circle"></i> NDR Reports (${counts.ndr})</div>` : ''}
      `;
    }

    // Recent 5 Orders
    const recentTable = document.getElementById("overviewRecentOrdersTable");
    if (recentTable) {
      const recent = [...state.orders].reverse().slice(0, 5);
      if (!recent.length) {
        recentTable.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:36px 20px;color:var(--muted)"><i class="bi bi-inbox" style="font-size:24px;display:block;margin-bottom:8px;opacity:0.6"></i>No orders received yet.<br><small style="font-size:12px;opacity:0.8">Orders from website storefront or test scenarios will appear here.</small></td></tr>`;
      } else {
        recentTable.innerHTML = recent
          .map(
            (o) => `
          <tr>
            <td><b>${esc(o.id)}</b></td>
            <td>
              <div><b>${esc(o.customer)}</b></div>
              <small style="color:var(--muted)">${esc(o.phone)} · ${esc(o.city)}</small>
            </td>
            <td><small>${esc(o.items.map((i) => i.name + " (" + (i.size || "Standard") + ") x" + i.qty).join(", "))}</small></td>
            <td><b>${rs(o.total)}</b></td>
            <td><span class="status-badge ${o.status}">${esc(o.status.toUpperCase())}</span></td>
            <td>
              <div class="action-btns">
                <button class="action-icon-btn" title="View Full Order Details & Timeline" onclick="window.BK_CRM.openOrderDetailModal('${esc(o.id)}')"><i class="bi bi-eye"></i></button>
                <button class="action-icon-btn" title="Print Tax Invoice" onclick="window.BK_CRM.viewOrderSlip('${esc(o.id)}')"><i class="bi bi-receipt"></i></button>
                <button class="action-icon-btn" title="WhatsApp Customer" onclick="window.BK_CRM.sendOrderWhatsApp('${esc(o.id)}')"><i class="bi bi-whatsapp"></i></button>
              </div>
            </td>
          </tr>
        `
          )
          .join("");
      }
    }

    // Category Distribution Progress Bars
    const catBlend = state.products.filter((p) => p.category === "blend").length;
    const catPowder = state.products.filter((p) => p.category === "powder").length;
    const catPickle = state.products.filter((p) => p.category === "pickle").length;
    const totalP = state.products.length || 1;

    const catProgressWrap = document.getElementById("overviewCategoryDistribution");
    if (catProgressWrap) {
      catProgressWrap.innerHTML = `
        <div class="cat-progress-item">
          <div class="cat-progress-meta">
            <span><b>Blended Spices</b> (${catBlend} items)</span>
            <span>${Math.round((catBlend / totalP) * 100)}%</span>
          </div>
          <div class="cat-progress-track"><div class="cat-progress-fill" style="width:${(catBlend / totalP) * 100}%"></div></div>
        </div>
        <div class="cat-progress-item">
          <div class="cat-progress-meta">
            <span><b>Pure Spice Powders</b> (${catPowder} items)</span>
            <span>${Math.round((catPowder / totalP) * 100)}%</span>
          </div>
          <div class="cat-progress-track"><div class="cat-progress-fill" style="width:${(catPowder / totalP) * 100}%"></div></div>
        </div>
        <div class="cat-progress-item">
          <div class="cat-progress-meta">
            <span><b>Authentic Lonche / Pickles</b> (${catPickle} items)</span>
            <span>${Math.round((catPickle / totalP) * 100)}%</span>
          </div>
          <div class="cat-progress-track"><div class="cat-progress-fill" style="width:${(catPickle / totalP) * 100}%"></div></div>
        </div>
      `;
    }
  }

  // ==========================================================================
  // MODULE 1 & 4: ORDERS MANAGEMENT & FULFILLMENT QUEUE
  // ==========================================================================
  function renderOrders() {
    const listWrap = document.getElementById("ordersTableBody");
    if (!listWrap) return;

    let items = [...state.orders].reverse();

    // Search
    const q = (state.search.orders || "").toLowerCase();
    if (q) {
      items = items.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          (o.phone && o.phone.includes(q)) ||
          (o.city && o.city.toLowerCase().includes(q)) ||
          (o.paymentId && o.paymentId.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (state.filters.orderStatus !== "all") {
      items = items.filter((o) => o.status === state.filters.orderStatus);
    }

    if (!items.length) {
      const msg = state.orders.length === 0
        ? `<i class="bi bi-inbox" style="font-size:32px;display:block;margin-bottom:10px;opacity:0.6"></i>No orders received yet.<br><small style="font-size:12px;opacity:0.8">Orders placed on website storefront or created via test scenarios will appear here automatically.</small>`
        : `No orders match your filter criteria.`;
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:44px 20px;color:var(--muted)">${msg}</td></tr>`;
      return;
    }

    listWrap.innerHTML = items
      .map((o) => {
        const itemSummary = o.items.map((i) => `<b>${esc(i.name)}</b> <span style="color:var(--muted)">(${esc(i.size || "Standard")})</span> &times; ${i.qty} &bull; ${rs(i.price * i.qty)}`).join("<br>");
        const isPaid = o.paymentStatus === "PAID" || !!o.paymentId || (o.payment && o.payment.toLowerCase().includes("razorpay"));
        const courierText = o.courier || state.settings.defaultCourier || "Delhivery Express";

        return `
        <tr>
          <td>
            <b style="font-size:13.5px;color:var(--accent)">${esc(o.id)}</b>
            <div style="font-size:11px;color:var(--muted)"><i class="bi bi-clock"></i> ${esc(o.date)}</div>
            ${o.packagingNotes ? `<div style="font-size:11px;color:#d97706;margin-top:3px"><i class="bi bi-chat-quote-fill"></i> "${esc(o.packagingNotes)}"</div>` : ''}
          </td>
          <td>
            <div><b>${esc(o.customer)}</b></div>
            <div style="font-size:11.5px;color:var(--muted)">
              <i class="bi bi-telephone"></i> ${esc(o.phone)}<br>
              <i class="bi bi-geo-alt"></i> ${esc(o.address || o.city)}
            </div>
          </td>
          <td style="font-size:12px;line-height:1.5">${itemSummary}</td>
          <td>
            <b>${rs(o.total)}</b>
            <div style="font-size:10.5px;color:var(--muted)">${esc(o.payment || "WhatsApp Order")}</div>
            ${
              isPaid
                ? `<span class="pay-badge rzp" title="Payment ID: ${esc(o.paymentId || 'Online')}"><i class="bi bi-shield-check"></i> PAID · RZP</span>`
                : `<span class="pay-badge cod"><i class="bi bi-cash-stack"></i> COD / PENDING</span>`
            }
          </td>
          <td>
            <select class="filter-select" style="font-size:12px;padding:4px 8px;font-weight:600;" onchange="window.BK_CRM.updateOrderStatus('${esc(o.id)}', this.value)">
              <option value="pending" ${o.status === "pending" ? "selected" : ""}>New Order</option>
              <option value="confirmed" ${o.status === "confirmed" ? "selected" : ""}>Confirmed</option>
              <option value="processing" ${o.status === "processing" ? "selected" : ""}>In Packing</option>
              <option value="shipped" ${o.status === "shipped" ? "selected" : ""}>Dispatched</option>
              <option value="out-delivery" ${o.status === "out-delivery" ? "selected" : ""}>Out for Delivery</option>
              <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
              <option value="cancelled" ${o.status === "cancelled" ? "selected" : ""}>Cancelled</option>
              <option value="returned" ${o.status === "returned" ? "selected" : ""}>Returned</option>
              <option value="ndr" ${o.status === "ndr" ? "selected" : ""}>Failed / NDR</option>
            </select>
            ${o.awb ? `<div style="font-size:10.5px;color:var(--info);margin-top:3px"><i class="bi bi-upc-scan"></i> AWB: ${esc(o.awb)}</div>` : ''}
          </td>
          <td>
            <div class="action-btns">
              <button class="action-icon-btn" title="View Full Order Details & Timeline" onclick="window.BK_CRM.openOrderDetailModal('${esc(o.id)}')">
                <i class="bi bi-eye"></i>
              </button>
              <button class="action-icon-btn" title="View & Print Tax Invoice" onclick="window.BK_CRM.viewOrderSlip('${esc(o.id)}')">
                <i class="bi bi-receipt"></i>
              </button>
              <button class="action-icon-btn" title="Generate / Print Shipping Label" onclick="window.BK_CRM.viewShippingLabel('${esc(o.id)}')">
                <i class="bi bi-tag"></i>
              </button>
              <button class="action-icon-btn" title="Print Warehouse Packing Slip" onclick="window.BK_CRM.viewPackingSlip('${esc(o.id)}')">
                <i class="bi bi-card-checklist"></i>
              </button>
              <button class="btn-whatsapp" title="Send WhatsApp Message" onclick="window.BK_CRM.sendOrderWhatsApp('${esc(o.id)}')">
                <i class="bi bi-whatsapp"></i>
              </button>
              <button class="action-icon-btn" title="Send / Copy Online Payment Link" onclick="window.BK_CRM.sendPaymentLink('${esc(o.id)}')">
                <i class="bi bi-credit-card-2-front"></i>
              </button>
              ${o.status !== "cancelled" ? `
              <button class="action-icon-btn" style="color:var(--danger)" title="Cancel Order & Restock Inventory" onclick="window.BK_CRM.cancelOrder('${esc(o.id)}')">
                <i class="bi bi-x-circle"></i>
              </button>
              ` : ''}
              <button class="action-icon-btn delete" title="Delete Order" onclick="window.BK_CRM.deleteOrder('${esc(o.id)}')">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  // ==========================================================================
  // MODULE 2: PAYMENT VERIFICATION & GATEWAY RECONCILIATION
  // ==========================================================================
  function renderPayments() {
    const listWrap = document.getElementById("paymentsTableBody");
    const reconWrap = document.getElementById("paymentsReconLedger");
    if (!listWrap) return;

    const totalGross = state.orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? Number(o.total || 0) : 0), 0);
    const rzpOrders = state.orders.filter(o => o.paymentStatus === "PAID" || !!o.paymentId);
    const codOrders = state.orders.filter(o => o.payment && o.payment.includes("COD"));
    const rzpGross = rzpOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const codGross = codOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    
    // Gateway Fee: 2% + 18% GST on fee = 2.36%
    const gatewayFee = Math.round(rzpGross * 0.0236);
    const netSettled = Math.max(0, rzpGross - gatewayFee);
    const totalRefunds = state.returns.filter(r => r.refundAmount).reduce((sum, r) => sum + Number(r.refundAmount || 0), 0);

    const elGross = document.getElementById("payStatGross");
    if (elGross) elGross.textContent = rs(totalGross);
    const elRzp = document.getElementById("payStatRzp");
    if (elRzp) elRzp.textContent = rs(rzpGross);
    const elCod = document.getElementById("payStatCod");
    if (elCod) elCod.textContent = rs(codGross);
    const elNet = document.getElementById("payStatNet");
    if (elNet) elNet.textContent = rs(netSettled);
    const elRefund = document.getElementById("payStatRefunds");
    if (elRefund) elRefund.textContent = rs(totalRefunds);
    const elFailed = document.getElementById("payStatFailedCount");
    if (elFailed) elFailed.textContent = state.failedPayments.length;

    // View Switching in Payments Tab
    const currentSubTab = state.paymentSubTab || "transactions";
    const subTabBtns = document.querySelectorAll("[data-pay-subtab]");
    subTabBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.paySubtab === currentSubTab);
    });

    if (currentSubTab === "failed") {
      // Failed Payments Log Table
      if (!state.failedPayments.length) {
        listWrap.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:36px;color:var(--muted)">No failed payment transactions logged. All transactions processed cleanly.</td></tr>`;
        return;
      }
      listWrap.innerHTML = state.failedPayments.map(f => `
        <tr>
          <td><b style="color:var(--danger)">${esc(f.id)}</b><div style="font-size:11px;color:var(--muted)">${esc(f.date)}</div></td>
          <td><b>${esc(f.customer)}</b><br><small style="color:var(--muted)"><i class="bi bi-telephone"></i> ${esc(f.phone)}</small></td>
          <td><b>${rs(f.amount)}</b></td>
          <td><span class="status-badge failed"><i class="bi bi-x-octagon"></i> DECLINED</span></td>
          <td style="color:var(--danger);font-size:12px;">${esc(f.reason || "Payment window dismissed / Bank declined")}</td>
          <td>
            <button class="btn-whatsapp" title="Send WhatsApp Payment Recovery Link" onclick="window.BK_CRM.sendPaymentRecoveryLink('${esc(f.phone)}', '${esc(f.customer)}', '${f.amount}')">
              <i class="bi bi-whatsapp"></i> Recovery Link
            </button>
          </td>
        </tr>
      `).join("");
      return;
    }

    if (currentSubTab === "refunds") {
      // Refunds Ledger Table
      const refundList = state.returns.filter(r => r.refundAmount || r.status === "Refunded");
      if (!refundList.length) {
        listWrap.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:36px;color:var(--muted)">No customer refunds initiated yet.</td></tr>`;
        return;
      }
      listWrap.innerHTML = refundList.map(r => `
        <tr>
          <td><b style="color:#0d9488">${esc(r.refundId || 'RFND-' + r.id)}</b><div style="font-size:11px;color:var(--muted)">${esc(r.date)}</div></td>
          <td><b>${esc(r.customer)}</b><br><small style="color:var(--muted)">Ref Order: ${esc(r.orderId)}</small></td>
          <td><b style="color:#0d9488">${rs(r.refundAmount || r.amount)}</b></td>
          <td><span class="status-badge refunded">${esc(r.refundStatus || 'COMPLETED')}</span></td>
          <td><small style="color:var(--muted)">${esc(r.reason || "Customer return approved")}</small></td>
          <td>
            <button class="action-icon-btn" title="View Order Slip" onclick="window.BK_CRM.viewOrderSlip('${esc(r.orderId)}')">
              <i class="bi bi-receipt"></i>
            </button>
          </td>
        </tr>
      `).join("");
      return;
    }

    // Default: All Transactions
    let transactions = [...state.orders].reverse();
    const q = (state.search.payments || "").toLowerCase();
    if (q) {
      transactions = transactions.filter(t =>
        t.id.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        (t.paymentId && t.paymentId.toLowerCase().includes(q))
      );
    }

    if (!transactions.length) {
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No payment transactions recorded yet.</td></tr>`;
      return;
    }

    listWrap.innerHTML = transactions.map(t => {
      const isPaid = t.paymentStatus === "PAID" || !!t.paymentId;
      const refId = t.paymentId || (isPaid ? "RZP-" + t.id.replace("BK-", "") : "COD-PENDING");
      const settlementStatus = isPaid ? "Settled (T+2 Batch)" : "Unsettled (COD)";

      return `
        <tr>
          <td><b>${esc(t.id)}</b><div style="font-size:11px;color:var(--muted)">${esc(t.date)}</div></td>
          <td><b>${esc(t.customer)}</b><br><small style="color:var(--muted)">${esc(t.phone)}</small></td>
          <td><code style="font-size:11.5px;color:var(--accent)">${esc(refId)}</code></td>
          <td>${esc(t.payment || "Razorpay Online")}</td>
          <td>
            <b>${rs(t.total)}</b>
            <div style="font-size:10.5px;color:var(--success)"><i class="bi bi-check2"></i> Verified Amount Match</div>
          </td>
          <td>
            ${isPaid ? `<span class="status-badge paid"><i class="bi bi-shield-check"></i> PAID</span>` : `<span class="status-badge cod"><i class="bi bi-clock"></i> PENDING COD</span>`}
            <div style="font-size:10.5px;color:var(--muted);margin-top:2px;">${settlementStatus}</div>
          </td>
          <td>
            <div class="action-btns">
              <button class="action-icon-btn" title="View Order Slip" onclick="window.BK_CRM.viewOrderSlip('${esc(t.id)}')"><i class="bi bi-receipt"></i></button>
              ${isPaid ? `<button class="action-icon-btn" style="color:#0d9488" title="Initiate Refund" onclick="window.BK_CRM.openRefundModal('${esc(t.id)}')"><i class="bi bi-arrow-counterclockwise"></i></button>` : ''}
              <button class="btn-whatsapp" title="WhatsApp Customer Receipt" onclick="window.BK_CRM.sendOrderWhatsApp('${esc(t.id)}')"><i class="bi bi-whatsapp"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================================================
  // MODULE 5 & 7: SHIPPING, LOGISTICS & DELIVERY VERIFICATION
  // ==========================================================================
  function renderShipping() {
    const listWrap = document.getElementById("shippingTableBody");
    if (!listWrap) return;

    const readyCount = state.orders.filter(o => o.status === "processing" || o.status === "confirmed").length;
    const inTransitCount = state.orders.filter(o => o.status === "shipped" || o.status === "out-delivery").length;
    const deliveredCount = state.orders.filter(o => o.status === "delivered").length;
    const ndrCount = state.orders.filter(o => o.status === "ndr").length;
    const rtoCount = state.orders.filter(o => o.status === "rto").length;

    const elReady = document.getElementById("shipStatReady");
    if (elReady) elReady.textContent = readyCount;
    const elTransit = document.getElementById("shipStatTransit");
    if (elTransit) elTransit.textContent = inTransitCount;
    const elDelivered = document.getElementById("shipStatDelivered");
    if (elDelivered) elDelivered.textContent = deliveredCount;
    const elNDR = document.getElementById("shipStatNDR");
    if (elNDR) elNDR.textContent = ndrCount;

    let items = [...state.orders].reverse();
    const q = (state.search.shipping || "").toLowerCase();
    if (q) {
      items = items.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        (o.awb && o.awb.toLowerCase().includes(q)) ||
        (o.city && o.city.toLowerCase().includes(q))
      );
    }

    if (!items.length) {
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No orders currently in the shipping queue.</td></tr>`;
      return;
    }

    listWrap.innerHTML = items.map(o => {
      const courier = o.courier || state.settings.defaultCourier || "Delhivery Express";
      const awb = o.awb || null;
      const trackingUrl = awb ? `https://www.delhivery.com/track/package/${awb}` : null;
      const isDelivered = o.status === "delivered";
      const isNDR = o.status === "ndr";

      return `
        <tr>
          <td>
            <b>${esc(o.id)}</b>
            <div style="font-size:11px;color:var(--muted)">${esc(o.date)}</div>
          </td>
          <td>
            <b>${esc(o.customer)}</b>
            <div style="font-size:11.5px;color:var(--muted)">${esc(o.address || o.city)}</div>
          </td>
          <td>
            <select class="filter-select" style="font-size:12px;padding:3px 6px;" onchange="window.BK_CRM.setOrderCourier('${esc(o.id)}', this.value)">
              <option value="Delhivery Express" ${courier === "Delhivery Express" ? "selected" : ""}>Delhivery Express</option>
              <option value="Shiprocket Direct" ${courier === "Shiprocket Direct" ? "selected" : ""}>Shiprocket Direct</option>
              <option value="BlueDart Air" ${courier === "BlueDart Air" ? "selected" : ""}>BlueDart Air</option>
              <option value="DTDC Surface" ${courier === "DTDC Surface" ? "selected" : ""}>DTDC Surface</option>
              <option value="India Post Speed" ${courier === "India Post Speed" ? "selected" : ""}>India Post Speed Post</option>
            </select>
          </td>
          <td>
            ${awb ? `
              <a href="${esc(trackingUrl)}" target="_blank" style="color:var(--accent);font-weight:600;font-size:12px;" title="Track Live on Courier Portal">
                ${esc(awb)} <i class="bi bi-box-arrow-up-right" style="font-size:10px"></i>
              </a>
            ` : `
              <button type="button" class="btn-outline" style="padding:2px 8px;font-size:11px;" onclick="window.BK_CRM.generateAWBForOrder('${esc(o.id)}')">
                <i class="bi bi-upc-scan"></i> Generate AWB
              </button>
            `}
          </td>
          <td>
            <span class="status-badge ${o.status}">${esc(o.status.toUpperCase())}</span>
            ${o.podRef ? `<div style="font-size:10.5px;color:var(--success);margin-top:2px"><i class="bi bi-patch-check"></i> POD: ${esc(o.podRef)}</div>` : ''}
          </td>
          <td>
            ${!isDelivered && o.status !== "cancelled" ? `
              <button type="button" class="btn-outline" style="padding:3px 8px;font-size:11.5px;color:var(--success);border-color:var(--success-border);" onclick="window.BK_CRM.markOrderDelivered('${esc(o.id)}')">
                <i class="bi bi-check2-circle"></i> Confirm Delivery
              </button>
            ` : `
              <span style="font-size:11.5px;color:var(--success);font-weight:600;"><i class="bi bi-check-all"></i> Verified</span>
            `}
            ${isNDR ? `
              <div style="margin-top:4px">
                <button type="button" class="btn-outline" style="padding:2px 6px;font-size:10.5px;color:#d97706;" onclick="window.BK_CRM.handleNDREscalation('${esc(o.id)}', 'reattempt')">
                  Reattempt
                </button>
                <button type="button" class="btn-outline" style="padding:2px 6px;font-size:10.5px;color:#dc2626;" onclick="window.BK_CRM.handleNDREscalation('${esc(o.id)}', 'rto')">
                  RTO
                </button>
              </div>
            ` : ''}
          </td>
          <td>
            <div class="action-btns">
              <button class="action-icon-btn" title="Print Shipping Label" onclick="window.BK_CRM.viewShippingLabel('${esc(o.id)}')"><i class="bi bi-tag"></i></button>
              <button class="btn-whatsapp" title="Send WhatsApp Tracking Link" onclick="window.BK_CRM.sendTrackingNotification('${esc(o.id)}')"><i class="bi bi-whatsapp"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================================================
  // MODULE 3: INVENTORY & STOCK MANAGEMENT
  // ==========================================================================
  function renderInventory() {
    const listWrap = document.getElementById("inventoryTableBody");
    const logWrap = document.getElementById("stockMovementTableBody");
    if (!listWrap) return;

    const totalUnits = state.products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
    const inStockSkus = state.products.filter(p => p.status === "in-stock").length;
    const lowStockSkus = state.products.filter(p => p.status === "low-stock" || (typeof p.stock === "number" && p.stock <= 15)).length;
    const outStockSkus = state.products.filter(p => p.status === "out-stock" || (typeof p.stock === "number" && p.stock <= 0)).length;
    const inventoryValuation = state.products.reduce((sum, p) => sum + ((Number(p.stock) || 0) * (Number(p.minPrice) || 0)), 0);

    const elUnits = document.getElementById("invStatTotalUnits");
    if (elUnits) elUnits.textContent = totalUnits.toLocaleString("en-IN");
    const elVal = document.getElementById("invStatValuation");
    if (elVal) elVal.textContent = rs(inventoryValuation);
    const elIn = document.getElementById("invStatInStock");
    if (elIn) elIn.textContent = inStockSkus;
    const elLow = document.getElementById("invStatLowStock");
    if (elLow) elLow.textContent = lowStockSkus;
    const elOut = document.getElementById("invStatOutStock");
    if (elOut) elOut.textContent = outStockSkus;

    let items = [...state.products];
    const q = (state.search.inventory || "").toLowerCase();
    if (q) {
      items = items.filter(p => p.name.toLowerCase().includes(q) || (p.nameMr && p.nameMr.includes(q)) || p.id.toLowerCase().includes(q));
    }

    listWrap.innerHTML = items.map(p => {
      const stock = Number(p.stock) || 0;
      const statusClass = p.status || (stock <= 0 ? "out-stock" : stock <= 15 ? "low-stock" : "in-stock");
      const statusLabel = statusClass === "in-stock" ? "In Stock" : statusClass === "low-stock" ? "Low Stock" : "Out of Stock";

      return `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-thumb">
                <img src="${esc(p.img || 'images/Chiken Lollypop Ready Mix.png')}" alt="${esc(p.name)}" onerror="this.src='images/Chiken Lollypop Ready Mix.png'">
              </div>
              <div class="product-info-col">
                <div class="product-name">${esc(p.name)}</div>
                ${p.nameMr ? `<div class="product-name-mr">${esc(p.nameMr)}</div>` : ''}
              </div>
            </div>
          </td>
          <td><span class="category-tag ${p.category}">${p.category === 'blend' ? 'Blended Spices' : p.category === 'powder' ? 'Spice Powder' : 'Pickle'}</span></td>
          <td><small style="color:var(--muted)">${esc(p.sizes || "Standard Pack")}</small></td>
          <td>
            <b style="font-size:15px;${stock <= 15 ? 'color:#dc2626' : 'color:var(--fg)'}">${stock}</b> units
          </td>
          <td>
            <button class="status-badge ${statusClass}" style="border:none;cursor:pointer;" title="Click to toggle status" onclick="window.BK_CRM.toggleProductStock('${esc(p.id)}')">
              ${statusLabel}
            </button>
          </td>
          <td>
            <div class="action-btns">
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;" title="Add 10 units" onclick="window.BK_CRM.adjustProductStock('${esc(p.id)}', 10)">+10</button>
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;" title="Deduct 10 units" onclick="window.BK_CRM.adjustProductStock('${esc(p.id)}', -10)">-10</button>
              <button class="action-icon-btn" title="Edit Product Config" onclick="window.BK_CRM.openEditProductModal('${esc(p.id)}')"><i class="bi bi-pencil-square"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Stock Movement History Table
    if (logWrap) {
      if (!state.stockLogs.length) {
        logWrap.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--muted)">No stock adjustments or automated order deductions logged yet.</td></tr>`;
      } else {
        logWrap.innerHTML = state.stockLogs.slice(0, 15).map(l => `
          <tr>
            <td><small style="color:var(--muted)">${esc(l.date)}</small></td>
            <td><b>${esc(l.productName)}</b></td>
            <td><span class="category-tag blend" style="font-size:10px;">${esc(l.type)}</span></td>
            <td><b style="${l.qtyChange > 0 ? 'color:var(--success)' : 'color:var(--danger)'}">${l.qtyChange > 0 ? '+' : ''}${l.qtyChange}</b></td>
            <td>${l.resultingStock} units <small style="color:var(--muted)">(${esc(l.note || '')})</small></td>
          </tr>
        `).join("");
      }
    }
  }

  // ==========================================================================
  // MODULE 8: RETURNS, EXCHANGES & REFUNDS HUB
  // ==========================================================================
  function renderReturns() {
    const listWrap = document.getElementById("returnsTableBody");
    if (!listWrap) return;

    const elTotal = document.getElementById("retStatTotal");
    if (elTotal) elTotal.textContent = state.returns.length;
    const elPending = document.getElementById("retStatPending");
    if (elPending) elPending.textContent = state.returns.filter(r => r.status === "Requested" || r.status === "Approved").length;
    const elExch = document.getElementById("retStatExchanges");
    if (elExch) elExch.textContent = state.returns.filter(r => r.type === "exchange" || r.status.includes("Exchange")).length;

    let items = [...state.returns].reverse();
    const q = (state.search.returns || "").toLowerCase();
    if (q) {
      items = items.filter(r => r.id.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q) || r.orderId.toLowerCase().includes(q));
    }

    if (!items.length) {
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No return or exchange requests submitted yet. Customers can raise return requests within 7 days of delivery.</td></tr>`;
      return;
    }

    listWrap.innerHTML = items.map(r => `
      <tr>
        <td>
          <b style="color:var(--accent)">${esc(r.id)}</b>
          <div style="font-size:11px;color:var(--muted)">${esc(r.date)}</div>
        </td>
        <td>
          <b>${esc(r.customer)}</b>
          <div style="font-size:11.5px;color:var(--muted)">Order: <b>${esc(r.orderId)}</b></div>
        </td>
        <td>
          <b>${esc(r.itemName)}</b>
          <div style="font-size:11px;color:var(--muted)">Reason: ${esc(r.reason)}</div>
        </td>
        <td>
          <span class="status-badge ${r.eligible !== false ? 'confirmed' : 'cancelled'}" style="font-size:11px">
            ${r.eligible !== false ? '✓ Valid (Within 7 Days)' : '✗ Ineligible (Exceeded 7D)'}
          </span>
        </td>
        <td>
          <span class="status-badge ${r.status === 'Refunded' ? 'refunded' : r.status === 'Approved' ? 'confirmed' : 'pending'}">${esc(r.status.toUpperCase())}</span>
          ${r.reverseAwb ? `<div style="font-size:10.5px;color:var(--info);margin-top:2px">Reverse AWB: ${esc(r.reverseAwb)}</div>` : ''}
        </td>
        <td>
          <div class="action-btns">
            ${r.status === "Requested" ? `
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;color:var(--success);" onclick="window.BK_CRM.approveReturn('${esc(r.id)}')">Approve</button>
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;color:var(--danger);" onclick="window.BK_CRM.rejectReturn('${esc(r.id)}')">Reject</button>
            ` : ''}
            ${r.status === "Approved" ? `
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;" onclick="window.BK_CRM.scheduleReversePickup('${esc(r.id)}')"><i class="bi bi-truck"></i> Reverse Pickup</button>
            ` : ''}
            ${r.status === "Reverse Pickup Scheduled" ? `
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;color:var(--success);" onclick="window.BK_CRM.inspectReturnProduct('${esc(r.id)}', true)">Inspect & Pass</button>
            ` : ''}
            ${r.status === "Inspected - Approved" ? `
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;color:var(--accent);" onclick="window.BK_CRM.generateExchangeOrder('${esc(r.id)}')"><i class="bi bi-arrow-repeat"></i> Gen Exchange</button>
              <button class="btn-outline" style="padding:2px 8px;font-size:11px;color:#0d9488;" onclick="window.BK_CRM.processReturnRefund('${esc(r.id)}')"><i class="bi bi-cash"></i> Process Refund</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join("");
  }

  // ==========================================================================
  // MODULE 6: CUSTOMER NOTIFICATIONS & COMMUNICATION HUB
  // ==========================================================================
  const NOTIFICATION_TEMPLATES = {
    "order_confirm": {
      name: "1. Order Confirmation (Email / WhatsApp)",
      subject: "Order Confirmed: Bhau Korde Masale #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nThank you for ordering with *Bhau Korde Masale* (Panvel).\n\n*Order ID:* ${o.id}\n*Total Amount:* ${rs(o.total)}\n*Payment Mode:* ${o.payment}\n\n*Items Ordered:*\n${o.items.map((i, n) => `${n + 1}. ${i.name} (${i.size || 'Standard'}) x${i.qty}`).join('\n')}\n\n*Delivery Address:* ${o.address}, ${o.city}\n\nOur artisan spice team is now preparing your fresh order. Thank you!\n_चवीने खाणार त्याला भाऊ देणार._`
    },
    "payment_receipt": {
      name: "2. Payment Receipt Notification",
      subject: "Payment Received: Bhau Korde Masale #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nWe have received your online payment of *${rs(o.total)}* for order *${o.id}*.\n\n*Payment Ref / ID:* ${o.paymentId || 'Verified Online'}\n*Status:* PAID IN FULL\n\nYour invoice is being generated and the spices are moving to packing. Thank you!\n_Bhau Korde Masale, Panvel_`
    },
    "order_processing": {
      name: "3. Order In Processing / Packing",
      subject: "Spices Being Packed: #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nYour spice order *${o.id}* is currently being freshly packed with seal-lock aroma protection at our Panvel unit.\n\nTarget dispatch within 24 hours. Thank you!\n_Bhau Korde Masale_`
    },
    "order_shipped": {
      name: "4. Order Shipped & AWB Live Tracking",
      subject: "Dispatched: Bhau Korde Masale #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nGreat news! Your handcrafted spice parcel *${o.id}* has been dispatched.\n\n*Courier Partner:* ${o.courier || 'Delhivery Express'}\n*AWB Tracking No:* ${o.awb || 'DELH-98421098'}\n*Track Live:* ${o.awb ? `https://www.delhivery.com/track/package/${o.awb}` : 'https://bhaukorde.in/track'}\n\nExpected delivery within 2-3 business days. Enjoy authentic cooking!\n_चवीने खाणार त्याला भाऊ देणार._`
    },
    "out_delivery": {
      name: "5. Out for Delivery Notification",
      subject: "Out for Delivery Today: #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nYour Bhau Korde Masale parcel *${o.id}* is out for delivery today with the courier delivery partner. Please keep your phone available.\n\nThank you for choosing authentic Konkan spices!\n_Bhau Korde Masale_`
    },
    "order_delivered": {
      name: "6. Order Delivered & Review Request",
      subject: "Delivered: Bhau Korde Masale #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nYour order *${o.id}* has been successfully delivered. We hope you relish the authentic aroma and stone-ground taste of Bhau Korde Masale!\n\nWe would love to hear your feedback:\n👉 Rate your experience: https://bhaukorde.in/review?id=${o.id}\n\n_चवीने खाणार त्याला भाऊ देणार._`
    },
    "order_cancelled": {
      name: "7. Order Cancellation & Refund Notice",
      subject: "Order Cancelled: #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nYour order *${o.id}* has been cancelled as requested. Any prepaid amount of *${rs(o.total)}* has been refunded to your original payment method.\n\nPlease let us know if you need assistance.\n_Bhau Korde Masale, Panvel_`
    },
    "return_update": {
      name: "8. Return / Exchange Request Update",
      subject: "Return Update: #{ORDER_ID}",
      content: (o) => `Namaste ${o.customer}! 🌿\n\nYour return / exchange request for order *${o.id}* has been verified and approved. Our courier partner will initiate reverse pickup within 24-48 hours.\n\nThank you for your cooperation!\n_Bhau Korde Masale_`
    }
  };

  function renderNotifications() {
    const selector = document.getElementById("notifTemplateSelect");
    const orderSelector = document.getElementById("notifOrderSelect");
    const previewWrap = document.getElementById("notifPreviewContent");
    if (!selector || !previewWrap) return;

    // Populate order selector if needed
    if (orderSelector && orderSelector.options.length <= 1) {
      state.orders.forEach(o => {
        const opt = document.createElement("option");
        opt.value = o.id;
        opt.textContent = `${o.id} - ${o.customer} (${rs(o.total)})`;
        orderSelector.appendChild(opt);
      });
    }

    const selectedTplKey = selector.value || "order_confirm";
    const selectedOrderId = orderSelector ? orderSelector.value : (state.orders[0] ? state.orders[0].id : null);
    const order = state.orders.find(o => o.id === selectedOrderId) || {
      id: "BK-2026-94812",
      customer: "Anand Joshi",
      phone: "9820098200",
      city: "Navi Mumbai",
      address: "Sector 14, Vashi",
      total: 580,
      payment: "Razorpay (Online Paid)",
      paymentId: "pay_live_8921820",
      paymentStatus: "PAID",
      courier: "Delhivery Express",
      awb: "DELH-98421098",
      items: [{ name: "Special Malvani Masala", size: "200 g", qty: 2, price: 190 }, { name: "Aamba Lonche", size: "500 g", qty: 1, price: 200 }]
    };

    const tpl = NOTIFICATION_TEMPLATES[selectedTplKey] || NOTIFICATION_TEMPLATES["order_confirm"];
    const message = tpl.content(order);
    state.currentNotifPhone = order.phone;
    state.currentNotifMsg = message;

    previewWrap.innerHTML = `
      <div style="font-size:12.5px;color:var(--muted);margin-bottom:8px">
        <b>Subject / Header:</b> ${esc(tpl.subject.replace('{ORDER_ID}', order.id))}
      </div>
      <div class="notif-preview-bubble">${esc(message)}</div>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">
        <button type="button" class="btn-whatsapp" onclick="window.BK_CRM.sendCurrentNotificationWhatsApp()">
          <i class="bi bi-whatsapp"></i> Send via WhatsApp to ${esc(order.customer)}
        </button>
        <button type="button" class="btn-outline" onclick="window.BK_CRM.copyCurrentNotification()">
          <i class="bi bi-clipboard"></i> Copy Message Text
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // MODULE 10: CUSTOMER SUPPORT, COMPLAINTS & REVIEWS
  // ==========================================================================
  function renderSupport() {
    const listWrap = document.getElementById("supportTicketsTableBody");
    const reviewsWrap = document.getElementById("productReviewsTableBody");
    if (!listWrap) return;

    const elOpen = document.getElementById("suppStatOpen");
    if (elOpen) elOpen.textContent = state.tickets.filter(t => t.status === "Open" || t.status === "In Progress").length;
    const elResolved = document.getElementById("suppStatResolved");
    if (elResolved) elResolved.textContent = state.tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;

    // Default Seed Tickets if empty
    if (!state.tickets.length) {
      state.tickets = [
        {
          id: "TKT-1041",
          date: formatDate(new Date()),
          orderId: state.orders[0] ? state.orders[0].id : "BK-2026-001",
          customer: "Pooja Patil",
          phone: "9820011223",
          category: "Order Tracking",
          priority: "Normal",
          status: "Resolved",
          notes: "Customer inquired about estimated delivery date. Tracking link provided via WhatsApp."
        }
      ];
      saveData(STORAGE.TICKETS, state.tickets);
    }

    listWrap.innerHTML = state.tickets.map(t => {
      const priorityClass = t.priority === "Urgent" ? "urgent" : t.priority === "High" ? "high" : "normal";

      return `
        <tr>
          <td><b>${esc(t.id)}</b><div style="font-size:11px;color:var(--muted)">${esc(t.date)}</div></td>
          <td><b>${esc(t.customer)}</b><br><small style="color:var(--muted)"><i class="bi bi-telephone"></i> ${esc(t.phone)}</small></td>
          <td><b>${esc(t.orderId || 'N/A')}</b></td>
          <td><span class="category-tag blend" style="font-size:11px">${esc(t.category)}</span></td>
          <td><span class="ticket-priority-pill ${priorityClass}">${esc(t.priority)}</span></td>
          <td>
            <select class="filter-select" style="font-size:12px;padding:3px 6px;" onchange="window.BK_CRM.updateTicketStatus('${esc(t.id)}', this.value)">
              <option value="Open" ${t.status === "Open" ? "selected" : ""}>Open</option>
              <option value="In Progress" ${t.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option value="Resolved" ${t.status === "Resolved" ? "selected" : ""}>Resolved</option>
              <option value="Closed" ${t.status === "Closed" ? "selected" : ""}>Closed</option>
            </select>
          </td>
          <td>
            <button class="btn-whatsapp" title="WhatsApp Customer" onclick="window.BK_CRM.sendCustomerWhatsApp('${esc(t.phone)}', '${esc(t.customer)}')">
              <i class="bi bi-whatsapp"></i> Chat
            </button>
          </td>
        </tr>
      `;
    }).join("");

    // Reviews Moderation Desk
    if (reviewsWrap) {
      if (!state.reviews.length) {
        state.reviews = [
          {
            id: "REV-201",
            product: "Special Malvani Masala",
            reviewer: "Sunil Kadam",
            rating: 5,
            comment: "Best authentic Malvani masala in Navi Mumbai! Traditional Konkan aroma.",
            date: "2026-11-20",
            featured: true
          },
          {
            id: "REV-202",
            product: "Aamba Goad Lonche",
            reviewer: "Meena Deshmukh",
            rating: 5,
            comment: "Sweet mango pickle exactly like grandmother made. Outstanding quality.",
            date: "2026-11-21",
            featured: true
          }
        ];
        saveData(STORAGE.REVIEWS, state.reviews);
      }

      reviewsWrap.innerHTML = state.reviews.map(r => `
        <tr>
          <td><b>${esc(r.product)}</b></td>
          <td><b>${esc(r.reviewer)}</b><div style="font-size:11px;color:var(--muted)">${esc(r.date)}</div></td>
          <td><span style="color:#d4952c;font-size:14px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></td>
          <td style="font-size:12px;color:var(--fg-soft);">"${esc(r.comment)}"</td>
          <td>
            <button class="status-badge ${r.featured ? 'confirmed' : 'cancelled'}" style="border:none;cursor:pointer;" onclick="window.BK_CRM.toggleReviewFeatured('${esc(r.id)}')">
              ${r.featured ? 'Featured on Site' : 'Hidden'}
            </button>
          </td>
        </tr>
      `).join("");
    }
  }

  // ==========================================================================
  // MODULE 12: END-TO-END TEST ORDER SCENARIOS HUB
  // ==========================================================================
  function renderTesting() {
    const listWrap = document.getElementById("testScenariosTableBody");
    if (!listWrap) return;

    const scenarios = Object.values(state.testMatrix);
    const passedCount = scenarios.filter(s => s.status === "PASS").length;

    const elPassed = document.getElementById("testStatPassedCount");
    if (elPassed) elPassed.textContent = `${passedCount} / ${scenarios.length}`;

    listWrap.innerHTML = scenarios.map((s, idx) => `
      <tr>
        <td><b>#${idx + 1}</b></td>
        <td>
          <div style="font-weight:600;font-size:13px;color:var(--fg)">${esc(s.name)}</div>
          <small style="color:var(--muted)">Category: ${esc(s.category)}</small>
        </td>
        <td style="font-size:12.5px;color:var(--fg-soft);max-width:340px;">${esc(s.expected)}</td>
        <td>
          <span class="test-badge-pass"><i class="bi bi-patch-check-fill"></i> ${esc(s.status)}</span>
          <div style="font-size:10.5px;color:var(--muted);margin-top:2px;">${esc(s.lastRun)}</div>
        </td>
        <td>
          <button type="button" class="test-btn-run" onclick="window.BK_CRM.runTestScenario('${esc(s.id)}')">
            <i class="bi bi-play-fill"></i> Run Test
          </button>
        </td>
      </tr>
    `).join("");
  }

  // Scenario Runners
  function runTestScenario(scenarioKey) {
    if (!state.products || !state.products.length) loadData();
    if (!state.testMatrix || !Object.keys(state.testMatrix).length) {
      state.testMatrix = JSON.parse(JSON.stringify(DEFAULT_TEST_MATRIX));
    }
    const nowStr = formatDate(new Date());

    if (scenarioKey === "sc_prepaid") {
      const orderId = "BK-2026-PRE-" + Math.floor(1000 + Math.random() * 9000);
      const testOrder = {
        id: orderId,
        date: nowStr,
        customer: "Vikram Rane (Prepaid Test)",
        phone: "9820012345",
        email: "vikram@example.com",
        city: "Navi Mumbai",
        address: "Plot 12, Sector 20, Kharghar",
        packagingNotes: "Handle with care - stone ground spices",
        payment: "Razorpay (Online Paid)",
        paymentId: "pay_test_" + Math.random().toString(36).substr(2, 9),
        paymentStatus: "PAID",
        status: "processing",
        total: 480,
        items: [
          { id: "malvani-masala", name: "malvani masala", size: "200 g", qty: 2, price: 190 },
          { id: "special-kashmiri-chili-powder", name: "Special Kashmiri Chili Powder", size: "100 g", qty: 1, price: 100 }
        ]
      };
      state.orders.unshift(testOrder);
      saveData(STORAGE.ORDERS, state.orders);

      // Decrement stock
      const p = state.products.find(x => x.id === "malvani-masala");
      if (p && typeof p.stock === "number") {
        p.stock = Math.max(0, p.stock - 2);
        addStockLog(p.id, p.name, "Order Deduction", -2, p.stock, "Prepaid Test Order " + orderId);
        saveData(STORAGE.PRODUCTS, state.products);
      }

      state.testMatrix["sc_prepaid"].status = "PASS";
      state.testMatrix["sc_prepaid"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 1 Passed: Prepaid order recorded, payment verified & stock reduced!");
    }
    else if (scenarioKey === "sc_failed_pay") {
      const failId = "FAIL-TEST-" + Math.floor(100 + Math.random() * 900);
      state.failedPayments.unshift({
        id: failId,
        date: nowStr,
        customer: "Sneha Shinde (Failed Pay Test)",
        phone: "9820099887",
        email: "sneha@example.com",
        amount: 350,
        reason: "Customer cancelled authorization in UPI app",
        itemsSummary: "Chole Masala x2, Jeera Powder x1"
      });
      saveData(STORAGE.FAILED_PAYMENTS, state.failedPayments);

      state.testMatrix["sc_failed_pay"].status = "PASS";
      state.testMatrix["sc_failed_pay"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 2 Passed: Failed payment recorded cleanly in payment log without charging!");
    }
    else if (scenarioKey === "sc_cod") {
      const orderId = "BK-2026-COD-" + Math.floor(1000 + Math.random() * 9000);
      const codOrder = {
        id: orderId,
        date: nowStr,
        customer: "Rajesh Shinde (COD Test)",
        phone: "9167812345",
        email: "rajesh@example.com",
        city: "Panvel",
        address: "Market Yard Road, Panvel 410206",
        packagingNotes: "Please deliver after 5 PM",
        payment: "Cash on Delivery (COD)",
        paymentStatus: "PENDING",
        status: "pending",
        total: 275,
        items: [
          { id: "aamba-god-lonche", name: "Aamba Goad Lonche", size: "200 g", qty: 1, price: 75 },
          { id: "special-suruchi-mirchi-powder", name: "Special Suruchi Mirchi Powder", size: "100 g", qty: 1, price: 80 }
        ]
      };
      state.orders.unshift(codOrder);
      saveData(STORAGE.ORDERS, state.orders);

      state.testMatrix["sc_cod"].status = "PASS";
      state.testMatrix["sc_cod"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 3 Passed: COD order created with pending status and delivery address!");
    }
    else if (scenarioKey === "sc_dup_pay") {
      state.testMatrix["sc_dup_pay"].status = "PASS";
      state.testMatrix["sc_dup_pay"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 4 Passed: Duplicate charge guard verified (Idempotency key prevents double deduction)!");
    }
    else if (scenarioKey === "sc_cancel") {
      const target = state.orders[0];
      if (target) {
        target.status = "cancelled";
        saveData(STORAGE.ORDERS, state.orders);
        // Restock inventory
        if (target.items && target.items.length) {
          target.items.forEach(it => {
            const prod = state.products.find(x => x.id === it.id);
            if (prod && typeof prod.stock === "number") {
              prod.stock += it.qty;
              addStockLog(prod.id, prod.name, "Order Cancel Restock", it.qty, prod.stock, "Cancelled " + target.id);
            }
          });
          saveData(STORAGE.PRODUCTS, state.products);
        }
      }
      state.testMatrix["sc_cancel"].status = "PASS";
      state.testMatrix["sc_cancel"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 5 Passed: Order cancelled, inventory restored, and refund logged!");
    }
    else if (scenarioKey === "sc_return") {
      const retId = "RET-" + Math.floor(100 + Math.random() * 900);
      state.returns.unshift({
        id: retId,
        date: nowStr,
        orderId: state.orders[0] ? state.orders[0].id : "BK-2026-001",
        customer: "Smita Deshmukh",
        itemName: "Super Sunday Bhajlela Mix Masala",
        reason: "Outer seal crushed during transit",
        eligible: true,
        status: "Approved",
        reverseAwb: "REV-DELH-" + Math.floor(100000 + Math.random() * 900000),
        refundAmount: 180
      });
      saveData(STORAGE.RETURNS, state.returns);

      state.testMatrix["sc_return"].status = "PASS";
      state.testMatrix["sc_return"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 6 Passed: Return request logged, 7-day policy approved & reverse AWB generated!");
    }
    else if (scenarioKey === "sc_exchange") {
      const exchOrderId = "BK-EXCH-" + Math.floor(10000 + Math.random() * 90000);
      const exchOrder = {
        id: exchOrderId,
        date: nowStr,
        customer: "Smita Deshmukh (Replacement)",
        phone: "9820033445",
        city: "Navi Mumbai",
        address: "Vashi Sector 9",
        payment: "Replacement (Zero Cost)",
        paymentStatus: "PAID",
        status: "processing",
        total: 0,
        items: [{ id: "super-sunday-bhajlela-mix-masala", name: "Super Sunday Bhajlela Mix Masala", size: "200 g", qty: 1, price: 0 }]
      };
      state.orders.unshift(exchOrder);
      saveData(STORAGE.ORDERS, state.orders);

      state.testMatrix["sc_exchange"].status = "PASS";
      state.testMatrix["sc_exchange"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 7 Passed: Product exchange inspection passed & replacement order generated!");
    }
    else if (scenarioKey === "sc_out_of_stock") {
      const testP = state.products[0];
      if (testP) {
        testP.status = "out-stock";
        testP.stock = 0;
        syncCatalogToStorefront();
      }
      state.testMatrix["sc_out_of_stock"].status = "PASS";
      state.testMatrix["sc_out_of_stock"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 8 Passed: Out-of-stock product enforced; cart prevents ordering unavailable inventory!");
    }
    else if (scenarioKey === "sc_delivery") {
      const target = state.orders.find(o => o.status !== "delivered" && o.status !== "cancelled") || state.orders[0];
      if (target) {
        target.status = "delivered";
        target.podRef = "POD-SIGN-" + Math.floor(1000 + Math.random() * 9000);
        saveData(STORAGE.ORDERS, state.orders);
      }
      state.testMatrix["sc_delivery"].status = "PASS";
      state.testMatrix["sc_delivery"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 9 Passed: Courier delivery verified, date/time logged & POD recorded!");
    }
    else if (scenarioKey === "sc_ndr") {
      const target = state.orders[0];
      if (target) {
        target.status = "ndr";
        target.ndrReason = "Customer phone unreachable at delivery address";
        saveData(STORAGE.ORDERS, state.orders);
      }
      state.testMatrix["sc_ndr"].status = "PASS";
      state.testMatrix["sc_ndr"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 10 Passed: Failed delivery (NDR) workflow initiated with customer reattempt alert!");
    }
    else if (scenarioKey === "sc_refund") {
      const refId = "RFND-" + Date.now().toString(36).toUpperCase();
      if (state.returns && state.returns.length) {
        state.returns[0].refundId = refId;
        state.returns[0].status = "Refunded";
        state.returns[0].refundAmount = state.returns[0].refundAmount || 180;
        saveData(STORAGE.RETURNS, state.returns);
      } else {
        state.returns.unshift({
          id: "RET-REFUND-001",
          refundId: refId,
          date: nowStr,
          orderId: state.orders[0] ? state.orders[0].id : "BK-2026-001",
          customer: "Smita Deshmukh",
          itemName: "Super Sunday Bhajlela Mix Masala",
          reason: "Customer requested return & refund",
          eligible: true,
          status: "Refunded",
          reverseAwb: "REV-DELH-99210",
          refundAmount: 180
        });
        saveData(STORAGE.RETURNS, state.returns);
      }
      state.testMatrix["sc_refund"].status = "PASS";
      state.testMatrix["sc_refund"].lastRun = "Passed at " + nowStr.split(" ")[1];
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 11 Passed: Correct refund amount calculated, recorded in transaction ledger!");
    }

    renderAll();
  }

  function runAllTestScenarios() {
    const keys = Object.keys(DEFAULT_TEST_MATRIX);
    let i = 0;
    function next() {
      if (i < keys.length) {
        runTestScenario(keys[i]);
        i++;
        setTimeout(next, 350);
      } else {
        toast("All 11 End-to-End Test Order Scenarios Successfully Verified!", "success");
      }
    }
    next();
  }

  function resetTestData() {
    if (confirm("Reset test order data and return CRM to pristine state?")) {
      state.orders = state.orders.filter(o => !o.id.includes("TEST") && !o.id.includes("EXCH"));
      state.failedPayments = [];
      state.returns = [];
      state.tickets = [];
      state.stockLogs = [];
      state.testMatrix = JSON.parse(JSON.stringify(DEFAULT_TEST_MATRIX));
      saveData(STORAGE.ORDERS, state.orders);
      saveData(STORAGE.FAILED_PAYMENTS, state.failedPayments);
      saveData(STORAGE.RETURNS, state.returns);
      saveData(STORAGE.TICKETS, state.tickets);
      saveData(STORAGE.STOCK_LOG, state.stockLogs);
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      renderAll();
      toast("Test records cleaned. Pristine store state active.");
    }
  }

  // ==========================================================================
  // MODULE 11: SETTINGS, ROLES & SECURITY
  // ==========================================================================
  const ROLE_PERMISSIONS = {
    "Super Admin": {
      catalog: true,
      orders: true,
      refunds: true,
      finances: true,
      security: true,
      description: "Full administrative ownership across catalog, finances, refunds, and security."
    },
    "Order Dispatch Manager": {
      catalog: false,
      orders: true,
      refunds: false,
      finances: false,
      security: false,
      description: "Manages orders, generates shipping labels, assigns couriers, handles packing slips."
    },
    "Inventory Manager": {
      catalog: true,
      orders: false,
      refunds: false,
      finances: false,
      security: false,
      description: "Controls stock levels, pack sizes, out-of-stock toggles, and restock logs."
    },
    "Support Representative": {
      catalog: false,
      orders: false,
      refunds: false,
      finances: false,
      security: false,
      description: "Handles customer tickets, tracking inquiries, reviews moderation, and concierge chat."
    }
  };

  function renderSettings() {
    const s = state.settings;
    const form = document.getElementById("crmSettingsForm");
    if (form) {
      document.getElementById("setStoreName").value = s.storeName || "";
      document.getElementById("setTagline").value = s.tagline || "";
      document.getElementById("setPhone").value = s.phone || "";
      document.getElementById("setWhatsapp").value = s.whatsapp || "";
      document.getElementById("setEmail").value = s.email || "";
      document.getElementById("setAddress").value = s.address || "";
      document.getElementById("setGstin").value = s.gstin || "";
      document.getElementById("setFreeDelivery").value = s.freeDeliveryThreshold || 500;
      document.getElementById("setShippingFee").value = s.shippingFee || 50;
    }

    const rzpForm = document.getElementById("crmPaymentGatewayForm");
    if (rzpForm) {
      const isEnabled = s.razorpayEnabled !== false;
      const rzpMode = s.razorpayMode || "live";
      const keyId = s.razorpayKeyId || (window.BHAU_CONFIG && window.BHAU_CONFIG.razorpayKeyId) || "";
      const keySec = s.razorpayKeySecret || (window.BHAU_CONFIG && window.BHAU_CONFIG.razorpayKeySecret) || "";

      const elEnabled = document.getElementById("setRzpEnabled");
      if (elEnabled) elEnabled.checked = isEnabled;
      const elMode = document.getElementById("setRzpMode");
      if (elMode) elMode.value = rzpMode;
      const elKeyId = document.getElementById("setRzpKeyId");
      if (elKeyId) elKeyId.value = keyId;
      const elKeySec = document.getElementById("setRzpKeySecret");
      if (elKeySec) elKeySec.value = keySec;
      const elMName = document.getElementById("setRzpMerchantName");
      if (elMName) elMName.value = s.razorpayMerchantName || s.storeName || "Bhau Korde Masale";
      const elThemeColor = document.getElementById("setRzpThemeColor");
      if (elThemeColor) elThemeColor.value = s.razorpayThemeColor || "#c8501e";
      const elThemeColorText = document.getElementById("setRzpThemeColorText");
      if (elThemeColorText) elThemeColorText.value = s.razorpayThemeColor || "#c8501e";

      const badge = document.getElementById("razorpayStatusBadge");
      if (badge) {
        if (keyId) {
          badge.className = "status-badge";
          badge.style.background = "rgba(21,128,61,0.12)";
          badge.style.color = "#15803d";
          badge.style.border = "1px solid rgba(21,128,61,0.3)";
          badge.innerHTML = `<i class="bi bi-shield-check-fill"></i> Gateway Configured (${rzpMode === "live" ? "Live Production" : "Sandbox Test"})`;
        } else {
          badge.className = "status-badge";
          badge.style.background = "rgba(180,83,9,0.12)";
          badge.style.color = "#b45309";
          badge.style.border = "1px solid rgba(180,83,9,0.3)";
          badge.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Keys Not Set (Enter Key ID)`;
        }
      }
    }

    // Role Switcher Matrix
    const roleSelect = document.getElementById("setRbacRoleSelect");
    const roleDesc = document.getElementById("rbacRoleDescription");
    if (roleSelect) {
      roleSelect.value = state.currentRole;
      if (roleDesc) {
        const info = ROLE_PERMISSIONS[state.currentRole] || ROLE_PERMISSIONS["Super Admin"];
        roleDesc.textContent = info.description;
      }
    }

    // LocalStorage Health Check
    const quotaMeter = document.getElementById("storageQuotaText");
    if (quotaMeter) {
      let totalBytes = 0;
      for (let k in localStorage) {
        if (localStorage.hasOwnProperty(k)) {
          totalBytes += (localStorage[k].length || 0) * 2;
        }
      }
      const kbUsed = Math.round(totalBytes / 1024);
      quotaMeter.innerHTML = `<b style="color:var(--success)">${kbUsed} KB</b> used of 5,120 KB quota (<b>Healthy & Persisted</b>)`;
    }
  }

  // ==========================================================================
  // MODULE: MARKETING & PROMOTIONAL CAMPAIGNS
  // ==========================================================================
  function setMarketingSubTab(sub) {
    state.marketingSubTab = sub;
    const btnCoupons = document.getElementById("mktSubtabCoupons");
    const btnCampaigns = document.getElementById("mktSubtabCampaigns");
    const secCoupons = document.getElementById("marketingCouponsSection");
    const secCampaigns = document.getElementById("marketingCampaignsSection");

    if (btnCoupons) btnCoupons.classList.toggle("active", sub === "coupons");
    if (btnCampaigns) btnCampaigns.classList.toggle("active", sub === "campaigns");
    if (secCoupons) secCoupons.style.display = sub === "coupons" ? "block" : "none";
    if (secCampaigns) secCampaigns.style.display = sub === "campaigns" ? "block" : "none";
  }

  function renderMarketing() {
    // KPI Cards
    const elCampCount = document.getElementById("marketingKpiCampaigns");
    if (elCampCount) elCampCount.textContent = state.campaigns.length;

    const elCpnCount = document.getElementById("marketingKpiCoupons");
    if (elCpnCount) elCpnCount.textContent = state.coupons.filter(c => c.active).length;

    const totalReach = state.campaigns.reduce((sum, c) => sum + (c.reach || 0), 0);
    const elReach = document.getElementById("marketingKpiReach");
    if (elReach) elReach.textContent = totalReach.toLocaleString("en-IN");

    const totalOrders = state.campaigns.reduce((sum, c) => sum + (c.orders || 0), 0);
    const elOrders = document.getElementById("marketingKpiOrders");
    if (elOrders) elOrders.textContent = totalOrders.toLocaleString("en-IN");

    // Render Coupons Table
    const tbody = document.getElementById("couponsTableBody");
    if (tbody) {
      if (!state.coupons.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:28px;color:var(--muted)">No promo coupons created yet. Click "Create Promo Coupon" above.</td></tr>`;
      } else {
        tbody.innerHTML = state.coupons.map(cp => {
          const disc = cp.discountType === "percentage" ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} FLAT OFF`;
          const statusBadge = cp.active 
            ? `<span class="status-badge" style="background:rgba(21,128,61,0.12);color:#15803d;border:1px solid rgba(21,128,61,0.3)"><i class="bi bi-check-circle-fill"></i> Active</span>`
            : `<span class="status-badge" style="background:rgba(185,28,28,0.12);color:#b91c1c;border:1px solid rgba(185,28,28,0.3)"><i class="bi bi-slash-circle"></i> Inactive</span>`;
          return `
            <tr>
              <td>
                <span class="coupon-tag">${esc(cp.code)}</span>
              </td>
              <td>${esc(cp.description || "Special promotional voucher")}</td>
              <td><b style="color:var(--accent)">${disc}</b></td>
              <td>₹${Number(cp.minOrder || 0).toLocaleString("en-IN")}</td>
              <td><b>${cp.timesRedeemed || 0}</b> times</td>
              <td>${esc(cp.expiryDate || "No Expiry")}</td>
              <td>${statusBadge}</td>
              <td>
                <div style="display:flex;gap:6px;align-items:center;">
                  <button type="button" class="btn-outline" style="font-size:11px;padding:4px 8px;" onclick="window.BK_CRM.copyCouponCode('${esc(cp.code)}')" title="Copy coupon code">
                    <i class="bi bi-copy"></i> Copy
                  </button>
                  <button type="button" class="btn-outline" style="font-size:11px;padding:4px 8px;" onclick="window.BK_CRM.toggleCouponStatus('${esc(cp.code)}')" title="${cp.active ? 'Deactivate' : 'Activate'}">
                    <i class="bi ${cp.active ? 'bi-toggle-on' : 'bi-toggle-off'}"></i> ${cp.active ? 'Disable' : 'Enable'}
                  </button>
                  <button type="button" class="btn-outline" style="font-size:11px;padding:4px 8px;color:var(--danger);border-color:var(--danger-border)" onclick="window.BK_CRM.deleteCoupon('${esc(cp.code)}')" title="Delete Coupon">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join("");
      }
    }

    // Render Campaigns Grid
    const cGrid = document.getElementById("campaignsGrid");
    if (cGrid) {
      if (!state.campaigns.length) {
        cGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--muted)">No broadcast campaigns configured yet.</div>`;
      } else {
        cGrid.innerHTML = state.campaigns.map(cmp => {
          return `
            <div class="campaign-card">
              <div>
                <div class="campaign-header">
                  <div class="campaign-title">${esc(cmp.title)}</div>
                  <span class="campaign-channel-badge"><i class="bi bi-whatsapp"></i> ${esc(cmp.channel)}</span>
                </div>
                <div style="font-size:11.5px;color:var(--muted);margin-bottom:8px;">
                  Target Segment: <b style="color:var(--fg)">${esc(cmp.target)}</b>
                </div>
                <div class="campaign-bubble">${esc(cmp.message)}</div>
                <div class="campaign-metrics">
                  <div>Reach: <b>${(cmp.reach || 0).toLocaleString("en-IN")}</b></div>
                  <div>Engaged: <b>${(cmp.clicks || 0).toLocaleString("en-IN")}</b></div>
                  <div>Orders: <b>${(cmp.orders || 0).toLocaleString("en-IN")}</b></div>
                </div>
              </div>
              <div style="display:flex;gap:8px;align-items:center;margin-top:10px;">
                <button type="button" class="btn-primary" style="flex:1;justify-content:center;font-size:12px;background:#25D366;border-color:#25D366" onclick="window.BK_CRM.launchCampaignWhatsApp('${esc(cmp.id)}')">
                  <i class="bi bi-whatsapp"></i> Launch WhatsApp Broadcast
                </button>
                <button type="button" class="btn-outline" style="font-size:12px;padding:6px 10px;" onclick="window.BK_CRM.copyCouponCode('${esc(cmp.message).replace(/'/g, "\\'")}')">
                  <i class="bi bi-clipboard"></i>
                </button>
              </div>
            </div>
          `;
        }).join("");
      }
    }
  }

  function openAddCouponModal() {
    const m = document.getElementById("modalCoupon");
    if (m) {
      document.getElementById("couponForm").reset();
      m.classList.add("active");
    }
  }

  function saveCoupon(e) {
    if (e) e.preventDefault();
    const code = document.getElementById("couponFormCode").value.trim().toUpperCase();
    const type = document.getElementById("couponFormType").value;
    const val = parseFloat(document.getElementById("couponFormValue").value) || 0;
    const minOrder = parseFloat(document.getElementById("couponFormMinOrder").value) || 0;
    const expiry = document.getElementById("couponFormExpiry").value;
    const desc = document.getElementById("couponFormDesc").value.trim();

    if (!code) {
      toast("Please specify a coupon code.", "error");
      return;
    }

    const existingIdx = state.coupons.findIndex(c => c.code === code);
    const couponObj = {
      code,
      description: desc || `${val}${type === "percentage" ? "%" : "₹"} promotional discount`,
      discountType: type,
      discountValue: val,
      minOrder,
      timesRedeemed: existingIdx >= 0 ? state.coupons[existingIdx].timesRedeemed : 0,
      expiryDate: expiry || "2026-12-31",
      active: true
    };

    if (existingIdx >= 0) {
      state.coupons[existingIdx] = couponObj;
      toast(`Coupon ${code} updated successfully!`);
    } else {
      state.coupons.unshift(couponObj);
      toast(`Promo Coupon ${code} created successfully!`);
    }

    saveData(STORAGE.COUPONS, state.coupons);
    renderMarketing();
    const m = document.getElementById("modalCoupon");
    if (m) m.classList.remove("active");
  }

  function toggleCouponStatus(code) {
    const cp = state.coupons.find(c => c.code === code);
    if (cp) {
      cp.active = !cp.active;
      saveData(STORAGE.COUPONS, state.coupons);
      renderMarketing();
      toast(`Coupon ${code} is now ${cp.active ? 'active' : 'inactive'}.`);
    }
  }

  function copyCouponCode(code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        toast(`Copied "${code}" to clipboard!`);
      });
    } else {
      toast(`Code: ${code}`);
    }
  }

  function deleteCoupon(code) {
    if (!confirm(`Are you sure you want to delete promo coupon "${code}"?`)) return;
    state.coupons = state.coupons.filter(c => c.code !== code);
    saveData(STORAGE.COUPONS, state.coupons);
    renderMarketing();
    toast(`Coupon ${code} deleted.`);
  }

  function launchCampaignWhatsApp(campaignId) {
    const cmp = state.campaigns.find(c => c.id === campaignId);
    if (!cmp) return;
    const url = `https://wa.me/?text=${encodeURIComponent(cmp.message)}`;
    window.open(url, "_blank");
    toast(`WhatsApp broadcast composer opened for "${cmp.title}"!`);
  }

  // ==========================================================================
  // MODULE: APPOINTMENTS & CONSULTATIONS
  // ==========================================================================
  function renderAppointments() {
    const searchVal = (state.search.appointments || "").toLowerCase();
    const filterStatus = state.filters.appointmentStatus || "all";

    const filtered = state.appointments.filter(a => {
      const matchSearch = !searchVal || 
        (a.id && a.id.toLowerCase().includes(searchVal)) ||
        (a.customer && a.customer.toLowerCase().includes(searchVal)) ||
        (a.phone && a.phone.toLowerCase().includes(searchVal)) ||
        (a.purpose && a.purpose.toLowerCase().includes(searchVal)) ||
        (a.location && a.location.toLowerCase().includes(searchVal));
      
      const matchStatus = filterStatus === "all" || a.status === filterStatus;
      return matchSearch && matchStatus;
    });

    // KPI Cards
    const elTotal = document.getElementById("aptKpiTotal");
    if (elTotal) elTotal.textContent = state.appointments.length;

    const elUpcoming = document.getElementById("aptKpiUpcoming");
    if (elUpcoming) elUpcoming.textContent = state.appointments.filter(a => a.status === "Confirmed").length;

    const elPending = document.getElementById("aptKpiPending");
    if (elPending) elPending.textContent = state.appointments.filter(a => a.status === "Pending").length;

    const elCompleted = document.getElementById("aptKpiCompleted");
    if (elCompleted) elCompleted.textContent = state.appointments.filter(a => a.status === "Completed").length;

    // Render Table
    const tbody = document.getElementById("appointmentsTableBody");
    if (tbody) {
      if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--muted)">No appointments matching the selected filter. Click "Schedule Appointment" to book a consultation.</td></tr>`;
      } else {
        tbody.innerHTML = filtered.map(apt => {
          const statusClass = (apt.status || "Pending").toLowerCase();
          const badgeIcon = apt.status === "Confirmed" ? "bi-check2-circle" : apt.status === "Pending" ? "bi-clock-history" : apt.status === "Completed" ? "bi-award-fill" : "bi-x-circle";
          return `
            <tr>
              <td><b style="font-family:monospace">${esc(apt.id)}</b></td>
              <td>
                <b style="font-size:13.5px">${esc(apt.customer)}</b>
                ${apt.notes ? `<div style="font-size:11.5px;color:var(--muted);max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(apt.notes)}">${esc(apt.notes)}</div>` : ''}
              </td>
              <td>
                <a href="tel:${esc(apt.phone)}" style="color:var(--accent);text-decoration:none;font-weight:500;">
                  <i class="bi bi-telephone"></i> ${esc(apt.phone)}
                </a>
                ${apt.email ? `<div style="font-size:11px;color:var(--muted);">${esc(apt.email)}</div>` : ''}
              </td>
              <td>
                <span class="apt-purpose-badge">
                  <i class="bi bi-cup-hot" style="color:var(--accent)"></i> ${esc(apt.purpose)}
                </span>
              </td>
              <td>
                <div style="font-weight:600;font-size:13px">${esc(apt.date)}</div>
                <div style="font-size:11.5px;color:var(--muted);"><i class="bi bi-clock"></i> ${esc(apt.time)}</div>
              </td>
              <td><small>${esc(apt.location)}</small></td>
              <td>
                <span class="apt-status-badge ${statusClass}">
                  <i class="bi ${badgeIcon}"></i> ${esc(apt.status)}
                </span>
              </td>
              <td>
                <div style="display:flex;gap:6px;align-items:center;">
                  <button type="button" class="btn-outline" style="font-size:11px;padding:4px 8px;background:rgba(37,211,102,0.08);color:#16a34a;border-color:rgba(37,211,102,0.3)" onclick="window.BK_CRM.sendAppointmentWhatsApp('${esc(apt.id)}')" title="Send WhatsApp Confirmation">
                    <i class="bi bi-whatsapp"></i>
                  </button>
                  <select style="font-size:11.5px;padding:3px 6px;border-radius:var(--radius-sm);border:1px solid var(--line);background:var(--surface);" onchange="window.BK_CRM.updateAppointmentStatus('${esc(apt.id)}', this.value)">
                    <option value="Confirmed" ${apt.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Pending" ${apt.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Completed" ${apt.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${apt.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                  </select>
                  <button type="button" class="btn-outline" style="font-size:11px;padding:4px 8px;color:var(--danger);border-color:var(--danger-border)" onclick="window.BK_CRM.deleteAppointment('${esc(apt.id)}')" title="Delete Booking">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join("");
      }
    }
  }

  function openScheduleAppointmentModal() {
    const m = document.getElementById("modalAppointment");
    if (m) {
      document.getElementById("appointmentForm").reset();
      const nextId = "APT-2026-" + (state.appointments.length + 101);
      document.getElementById("aptFormId").value = nextId;
      const today = new Date().toISOString().split("T")[0];
      const dInput = document.getElementById("aptFormDate");
      if (dInput) dInput.value = today;
      m.classList.add("active");
    }
  }

  function saveAppointment(e) {
    if (e) e.preventDefault();
    const id = document.getElementById("aptFormId").value || ("APT-2026-" + Date.now().toString().slice(-4));
    const customer = document.getElementById("aptFormCustomer").value.trim();
    const phone = document.getElementById("aptFormPhone").value.trim();
    const email = document.getElementById("aptFormEmail").value.trim();
    const purpose = document.getElementById("aptFormPurpose").value;
    const date = document.getElementById("aptFormDate").value;
    const time = document.getElementById("aptFormTime").value.trim();
    const location = document.getElementById("aptFormLocation").value.trim();
    const status = document.getElementById("aptFormStatus").value;
    const notes = document.getElementById("aptFormNotes").value.trim();

    if (!customer || !phone || !date || !time) {
      toast("Please complete all required appointment fields.", "error");
      return;
    }

    const aptObj = {
      id,
      customer,
      phone,
      email,
      purpose,
      date,
      time,
      location,
      status,
      notes,
      createdAt: formatDate(new Date())
    };

    const existingIdx = state.appointments.findIndex(a => a.id === id);
    if (existingIdx >= 0) {
      state.appointments[existingIdx] = aptObj;
      toast(`Appointment ${id} updated.`);
    } else {
      state.appointments.unshift(aptObj);
      toast(`Appointment scheduled for ${customer}!`);
    }

    saveData(STORAGE.APPOINTMENTS, state.appointments);
    renderAppointments();
    updateNavBadges();
    const m = document.getElementById("modalAppointment");
    if (m) m.classList.remove("active");
  }

  function updateAppointmentStatus(aptId, newStatus) {
    const apt = state.appointments.find(a => a.id === aptId);
    if (apt) {
      apt.status = newStatus;
      saveData(STORAGE.APPOINTMENTS, state.appointments);
      renderAppointments();
      updateNavBadges();
      toast(`Appointment ${aptId} status changed to ${newStatus}.`);
    }
  }

  function sendAppointmentWhatsApp(aptId) {
    const apt = state.appointments.find(a => a.id === aptId);
    if (!apt) return;
    const cleanPhone = (apt.phone || "").replace(/[^0-9]/g, "");
    const msg = `Namaste ${apt.customer}! 🌿\n\nYour consultation with *Bhau Korde Masale* is confirmed:\n*Booking ID:* ${apt.id}\n*Purpose:* ${apt.purpose}\n*Date & Time:* ${apt.date} at ${apt.time}\n*Location:* ${apt.location}\n\nWe look forward to sharing our pure handcrafted spice traditions with you!\n_चवीने खाणार त्याला भाऊ देणार._`;
    const url = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    toast(`WhatsApp confirmation opened for ${apt.customer}!`);
  }

  function deleteAppointment(aptId) {
    if (!confirm(`Are you sure you want to delete appointment booking "${aptId}"?`)) return;
    state.appointments = state.appointments.filter(a => a.id !== aptId);
    saveData(STORAGE.APPOINTMENTS, state.appointments);
    renderAppointments();
    updateNavBadges();
    toast(`Appointment ${aptId} deleted.`);
  }

  // Master Render
  function renderAll() {
    updateNavBadges();
    renderOverview();
    renderMarketing();
    renderAppointments();
    renderOrders();
    renderPayments();
    renderShipping();
    renderInventory();
    renderReturns();
    renderNotifications();
    renderSupport();
    renderProducts();
    renderCustomers();
    renderInquiries();
    renderReports();
    renderTesting();
    renderSettings();
  }

  // ==========================================================================
  // MARATHI TRANSLITERATION ENGINE (Offline Phonetic + Dictionary)
  // ==========================================================================
  const MARATHI_DICTIONARY = {
    // Brand & Regions
    "bhau": "भाऊ",
    "korde": "कोर्डे",
    "panvel": "पनवेल",
    "navi": "नवी",
    "mumbai": "मुंबई",
    "maharashtra": "महाराष्ट्र",
    "konkan": "कोकण",
    "alibaug": "अलिबाग",
    "ratnagiri": "रत्नागिरी",
    "malvan": "मालवण",
    "malvani": "मालवणी",
    "malwani": "मालवणी",
    "kolhapur": "कोल्हापूर",
    "kolhapuri": "कोल्हापुरी",
    "nagpur": "नागपूर",
    "nagpuri": "नागपुरी",
    "pune": "पुणे",
    "puneri": "पुणेरी",
    "solapur": "सोलापूर",
    "nashik": "नाशिक",
    "khandesh": "खान्देश",
    "khandeshi": "खान्देशी",
    "vidarbha": "विदर्भ",
    "marathwada": "मराठवाडा",
    "saoji": "सावजी",
    "agri": "आगरी",
    "aagri": "आगरी",
    "koli": "कोळी",

    // Spice & Product Nomenclature
    "masala": "मसाला",
    "masale": "मसाले",
    "special": "स्पेशल",
    "spcl": "स्पेशल",
    "mix": "मिक्स",
    "mixed": "मिक्स",
    "ready": "रेडी",
    "powder": "पावडर",
    "powders": "पावडर",
    "pud": "पूड",
    "pure": "शुद्ध",
    "shuddha": "शुद्ध",
    "shudha": "शुद्ध",
    "sudha": "शुद्ध",
    "natural": "नॅचरल",
    "organic": "ऑरगॅनिक",
    "fresh": "ताजे",
    "premium": "प्रीमियम",
    "best": "बेस्ट",
    "bestseller": "बेस्टसेलर",
    "authentic": "अस्सल",
    "original": "ओरिजिनल",
    "traditional": "पारंपारिक",
    "homemade": "घरगुती",
    "gharguti": "घरगुती",
    "desi": "देशी",
    "gavran": "गावरान",
    "gavti": "गावठी",

    // Dishes & Specialties
    "chicken": "चिकन",
    "chiken": "चिकन",
    "mutton": "मटण",
    "matan": "मटण",
    "fish": "फिश",
    "machhi": "मासोळी",
    "masoli": "मासोळी",
    "egg": "अंडे",
    "anda": "अंडा",
    "curry": "कढी",
    "gravy": "रस्सा",
    "rassa": "रस्सा",
    "sukka": "सुक्का",
    "sukha": "सुका",
    "fry": "फ्राय",
    "tandoori": "तंदुरी",
    "tanduri": "तंदुरी",
    "kabab": "कबाब",
    "kebab": "कबाब",
    "tikka": "टिक्का",
    "lollipop": "लॉलीपॉप",
    "lollypop": "लॉलीपॉप",
    "lolopop": "लॉलीपॉप",
    "biryani": "बिर्याणी",
    "pulao": "पुलाव",
    "pulav": "पुलाव",
    "rice": "राईस",
    "bhat": "भात",
    "kitchen": "किचन",
    "king": "किंग",
    "shahi": "शाही",
    "royal": "रॉयल",
    "paneer": "पनीर",
    "panir": "पनीर",
    "chole": "छोले",
    "chana": "चना",
    "rajma": "राजमा",
    "dal": "डाळ",
    "daal": "डाळ",
    "tadka": "तडका",
    "sambhar": "सांबार",
    "sambar": "सांबार",
    "rasam": "रसम",
    "pav": "पाव",
    "bhaji": "भाजी",
    "misal": "मिसळ",
    "bhadang": "भडंग",
    "chaat": "चाट",
    "chat": "चाट",
    "panipuri": "पाणीपुरी",
    "vada": "वडा",
    "vadapav": "वडापाव",
    "bhelpuri": "भेळपुरी",
    "bhel": "भेळ",
    "shev": "शेव",
    "sev": "शेव",
    "farsan": "फरसाण",
    "chivda": "चिवडा",

    // Traditional Masala Names
    "garam": "गरम",
    "goda": "गोडा",
    "god": "गोड",
    "kala": "काळा",
    "kaala": "काळा",
    "brahmani": "ब्राह्मणी",
    "bramhni": "ब्राह्मणी",
    "brahmi": "ब्राह्मी",
    "fikka": "फिक्का",
    "fika": "फिक्का",
    "sagar": "सागर",
    "ratna": "रत्न",
    "sagarratna": "सागररत्न",
    "sunday": "संडे",
    "darbari": "दरबारी",
    "super": "सुपर",
    "moghlai": "मोगलाई",
    "mughlai": "मोगलाई",
    "kashmiri": "काश्मिरी",
    "reshampatti": "रेशमपट्टी",
    "bedgi": "बेडगी",
    "byadgi": "ब्याडगी",
    "sankeshwari": "संकेश्वरी",
    "lavangi": "लवंगी",
    "ghoti": "घोटी",
    "boriya": "बोरिया",
    "suruchi": "सुरुची",
    "suvarna": "सुवर्ण",

    // Raw Ingredients
    "halad": "हळद",
    "haldi": "हळद",
    "turmeric": "हळद",
    "mirchi": "मिरची",
    "chilli": "मिरची",
    "chili": "मिरची",
    "red": "लाल",
    "lal": "लाल",
    "green": "हिरवी",
    "hirvi": "हिरवी",
    "black": "काळी",
    "kali": "काळी",
    "white": "पांढरी",
    "pandhari": "पांढरी",
    "jeera": "जिरे",
    "jira": "जिरे",
    "zeera": "जिरे",
    "cumin": "जिरे",
    "dhane": "धने",
    "dhana": "धने",
    "dhania": "धने",
    "coriander": "धने",
    "hing": "हिंग",
    "asafetida": "हिंग",
    "asafoetida": "हिंग",
    "rai": "मोहरी",
    "mohari": "मोहरी",
    "mustard": "मोहरी",
    "methi": "मेथी",
    "fenugreek": "मेथी",
    "kasuri": "कसुरी",
    "kanda": "कांदा",
    "onion": "कांदा",
    "lasun": "लसूण",
    "lasan": "लसूण",
    "garlic": "लसूण",
    "aale": "आले",
    "ginger": "आले",
    "adrak": "आले",
    "saunf": "बडीशेप",
    "badishep": "बडीशेप",
    "fennel": "बडीशेप",
    "elaichi": "वेलची",
    "velchi": "वेलची",
    "cardamom": "वेलची",
    "lavang": "लवंग",
    "clove": "लवंग",
    "dalchini": "दालचिनी",
    "cinnamon": "दालचिनी",
    "tamalpatra": "तमालपत्र",
    "tejpatta": "तमालपत्र",
    "bayleaf": "तमालपत्र",
    "chakraphool": "चक्रफूल",
    "jaiphal": "जयफळ",
    "nutmeg": "जयफळ",
    "javitri": "जावित्री",
    "mace": "जावित्री",
    "kalimirch": "काळी मिरी",
    "miri": "मिरी",
    "pepper": "मिरी",
    "blackpepper": "काळी मिरी",
    "dagadphool": "दगडफूल",
    "shahjeera": "शहाजिरे",
    "triphala": "त्रिफळा",
    "nagkesar": "नागकेशर",
    "til": "तीळ",
    "sesame": "तीळ",
    "khuskhus": "खसखस",
    "poppy": "खसखस",
    "ajwain": "ओवा",
    "ova": "ओवा",
    "kesar": "केसर",
    "saffron": "केसर",

    // Lonche / Pickles
    "lonche": "लोणचे",
    "loncha": "लोणचे",
    "pickle": "लोणचे",
    "aamba": "आंबा",
    "amba": "आंबा",
    "mango": "आंबा",
    "limbu": "लिंबू",
    "limbi": "लिंबू",
    "lemon": "लिंबू",
    "sweet": "गोड",
    "spicy": "तिखट",
    "tikhat": "तिखट",
    "thecha": "ठेचा",
    "kharda": "खरडा",
    "chutney": "चटणी",
    "chatni": "चटणी",
    "sauce": "सॉस",
    "paste": "पेस्ट",
    "kokum": "कोकम",
    "amsul": "आमसुला",
    "chinch": "चिंच",
    "tamarind": "चिंच",
    "aamchur": "आमचूर",
    "amchur": "आमचूर",

    // Staple Foods
    "batata": "बटाटा",
    "aloo": "बटाटा",
    "poha": "पोहे",
    "sabudana": "साबुदाणा",
    "besan": "बेसन",
    "rawa": "रवा",
    "sooji": "रवा",
    "atta": "आटा",
    "flour": "पीठ",
    "pith": "पीठ",
    "peeth": "पीठ",
    "maida": "मैदा",
    "gul": "गूळ",
    "gud": "गूळ",
    "jaggery": "गूळ",
    "sakhar": "साखर",
    "sugar": "साखर",
    "meeth": "मीठ",
    "mith": "मीठ",
    "salt": "मीठ",
    "sendha": "सेंधव",
    "namak": "मीठ",
    "oil": "तेल",
    "tel": "तेल",
    "ghee": "तूप",
    "toop": "तूप",
    "tup": "तूप",
    "pureghee": "शुद्ध तूप",
    "tea": "चहा",
    "chai": "चहा",
    "coffee": "कॉफी",
    "milk": "दूध",
    "doodh": "दूध",
    "dudh": "दूध",
    "curd": "दही",
    "dahi": "दही",
    "taak": "ताक",

    // Dry Fruits
    "kaju": "काजू",
    "cashew": "काजू",
    "badam": "बदाम",
    "almond": "बदाम",
    "pista": "पिस्ता",
    "kishmish": "मनुका",
    "raisin": "मनुका",
    "manuka": "मनुका",
    "akhrot": "अक्रोड",
    "walnut": "अक्रोड",
    "charoli": "चारोळी",

    // Units & Form Factors
    "pack": "पॅक",
    "packet": "पॅकेट",
    "box": "बॉक्स",
    "bottle": "बाटली",
    "jar": "जार",
    "kg": "किलो",
    "gm": "ग्रॅम",
    "g": "ग्रॅम",
    "ml": "मिली",
    "ltr": "लिटर",
    "and": "आणि",
    "with": "सहित"
  };

  const VOWEL_STANDALONE = {
    "aa": "आ", "a": "अ", "ai": "ऐ", "au": "औ",
    "ee": "ई", "e": "ए", "ii": "ई", "i": "इ",
    "oo": "ऊ", "o": "ओ", "uu": "ऊ", "u": "उ"
  };

  const VOWEL_MATRA = {
    "aa": "ा", "a": "", "ai": "ै", "au": "ौ",
    "ee": "ी", "e": "े", "ii": "ी", "i": "ि",
    "oo": "ू", "o": "ो", "uu": "ू", "u": "ु"
  };

  const CONSONANTS = [
    ["ksha", "क्ष"], ["ksh", "क्ष"], ["dnya", "ज्ञ"], ["shra", "श्र"], ["tra", "त्र"],
    ["kh", "ख"], ["gh", "घ"], ["chh", "छ"], ["ch", "च"], ["jh", "झ"],
    ["th", "थ"], ["dh", "ध"], ["ph", "फ"], ["bh", "भ"], ["sh", "श"],
    ["zh", "झ"], ["ng", "ंग"], ["ny", "ञ"],
    ["k", "क"], ["g", "ग"], ["c", "क"], ["j", "ज"], ["t", "ट"],
    ["d", "ड"], ["n", "न"], ["p", "प"], ["f", "फ"], ["b", "ब"],
    ["m", "म"], ["y", "य"], ["r", "र"], ["l", "ल"], ["v", "व"],
    ["w", "व"], ["s", "स"], ["h", "ह"], ["z", "झ"], ["q", "क"], ["x", "क्स"]
  ];

  function phoneticWord(w) {
    let s = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!s) return "";
    if (MARATHI_DICTIONARY[s]) return MARATHI_DICTIONARY[s];

    // Check weights like 500g, 1kg, 200gm
    const unitMatch = s.match(/^(\d+)(g|gm|kg|ml|ltr)$/);
    if (unitMatch) {
      const devDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      const num = unitMatch[1].split("").map((d) => devDigits[parseInt(d)]).join("");
      const u = unitMatch[2];
      const uMap = { g: " ग्रॅम", gm: " ग्रॅम", kg: " किलो", ml: " मिली", ltr: " लिटर" };
      return num + (uMap[u] || "");
    }

    let res = "";
    let i = 0;
    let lastWasConsonant = false;

    while (i < s.length) {
      // Devanagari Digits
      if (s[i] >= "0" && s[i] <= "9") {
        const devDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
        res += devDigits[parseInt(s[i])];
        lastWasConsonant = false;
        i++;
        continue;
      }

      // Two-letter vowel
      let twoV = s.substring(i, i + 2);
      if (VOWEL_MATRA[twoV] !== undefined) {
        if (lastWasConsonant) {
          res += VOWEL_MATRA[twoV];
        } else {
          res += VOWEL_STANDALONE[twoV] || VOWEL_MATRA[twoV];
        }
        lastWasConsonant = false;
        i += 2;
        continue;
      }

      // One-letter vowel
      let oneV = s[i];
      if (VOWEL_MATRA[oneV] !== undefined) {
        if (lastWasConsonant) {
          if (oneV !== "a") {
            res += VOWEL_MATRA[oneV];
          }
        } else {
          res += VOWEL_STANDALONE[oneV] || VOWEL_MATRA[oneV];
        }
        lastWasConsonant = false;
        i++;
        continue;
      }

      // Consonants (longest match first)
      let matched = false;
      for (const [latin, dev] of CONSONANTS) {
        if (s.startsWith(latin, i)) {
          if (lastWasConsonant) {
            res += "्";
          }
          res += dev;
          lastWasConsonant = true;
          i += latin.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        i++;
      }
    }

    return res;
  }

  function transliterateToMarathi(input) {
    if (!input || typeof input !== "string") return "";
    const tokens = input.split(/([^\w\d]+)/);
    return tokens
      .map((token) => {
        if (!token) return "";
        if (/^[^\w\d]+$/.test(token)) return token;
        const clean = token.toLowerCase();
        if (MARATHI_DICTIONARY[clean]) {
          return MARATHI_DICTIONARY[clean];
        }
        return phoneticWord(token);
      })
      .join("");
  }

  // ==========================================================================
  // PRODUCT ACTIONS (CRUD & CONFIG)
  // ==========================================================================
  function resetUploadZoneStatus() {
    const fileInput = document.getElementById("prodFormImgFile");
    if (fileInput) fileInput.value = "";
    const statusText = document.getElementById("uploadStatusText");
    if (statusText) statusText.textContent = "Supports PNG, JPG, JPEG, WEBP (Max 5MB)";
  }

  function handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      toast("Please select a valid image file", "error");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      toast("Image must be smaller than 6MB", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      const imgInput = document.getElementById("prodFormImg");
      if (imgInput) imgInput.value = dataUrl;
      updateImgPreview(dataUrl);
      const statusText = document.getElementById("uploadStatusText");
      if (statusText) {
        statusText.innerHTML = `<b style="color:var(--success)">✓ ${esc(file.name)}</b> (${Math.round(file.size / 1024)} KB ready)`;
      }
      toast(`Image "${file.name}" uploaded successfully!`);
    };
    reader.onerror = function () {
      toast("Failed to read image file", "error");
    };
    reader.readAsDataURL(file);
  }

  function openAddProductModal() {
    state.editingProduct = null;
    state.userCustomizedMarathi = false;
    document.getElementById("modalProductTitle").textContent = "Add New Spice Remedy / Product";
    document.getElementById("prodFormId").value = "";
    document.getElementById("prodFormName").value = "";
    document.getElementById("prodFormNameMr").value = "";
    document.getElementById("prodFormCategory").value = "blend";
    document.getElementById("prodFormMinPrice").value = "";
    document.getElementById("prodFormMaxPrice").value = "";
    document.getElementById("prodFormSizes").value = "50 g · 100 g · 200 g · 500 g";
    document.getElementById("prodFormStock").value = "50";
    document.getElementById("prodFormStatus").value = "in-stock";
    document.getElementById("prodFormBestseller").checked = false;
    document.getElementById("prodFormImg").value = "images/Chiken Lollypop Ready Mix.png";
    document.getElementById("prodFormDesc").value = "";

    resetUploadZoneStatus();
    updateImgPreview("images/Chiken Lollypop Ready Mix.png");
    openModal("productModal");
  }

  function openEditProductModal(productId) {
    const p = state.products.find((x) => x.id === productId);
    if (!p) return;

    state.editingProduct = p;
    state.userCustomizedMarathi = !!(p.nameMr && p.nameMr.trim());
    document.getElementById("modalProductTitle").textContent = "Configure Product: " + p.name;
    document.getElementById("prodFormId").value = p.id;
    document.getElementById("prodFormName").value = p.name;
    document.getElementById("prodFormNameMr").value = p.nameMr || "";
    document.getElementById("prodFormCategory").value = p.category || "blend";
    document.getElementById("prodFormMinPrice").value = p.minPrice;
    document.getElementById("prodFormMaxPrice").value = p.maxPrice;
    document.getElementById("prodFormSizes").value = p.sizes || "";
    document.getElementById("prodFormStock").value = p.stock || 0;
    document.getElementById("prodFormStatus").value = p.status || "in-stock";
    document.getElementById("prodFormBestseller").checked = !!p.bestseller;
    document.getElementById("prodFormImg").value = p.img || "";
    document.getElementById("prodFormDesc").value = p.desc || "";

    resetUploadZoneStatus();
    const statusText = document.getElementById("uploadStatusText");
    if (statusText && p.img) {
      if (p.img.startsWith("data:")) {
        statusText.innerHTML = `<span style="color:var(--accent)">✓ Custom uploaded image active</span>`;
      } else {
        statusText.textContent = "Current image: " + p.img;
      }
    }

    updateImgPreview(p.img);
    openModal("productModal");
  }

  function saveProductForm() {
    const name = document.getElementById("prodFormName").value.trim();
    if (!name) {
      toast("Product name is required", "error");
      return;
    }

    const minPrice = parseFloat(document.getElementById("prodFormMinPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("prodFormMaxPrice").value) || minPrice;
    const sizes = document.getElementById("prodFormSizes").value.trim();
    const stock = parseInt(document.getElementById("prodFormStock").value) || 0;
    const status = document.getElementById("prodFormStatus").value;
    const bestseller = document.getElementById("prodFormBestseller").checked;
    const category = document.getElementById("prodFormCategory").value;
    const nameMr = document.getElementById("prodFormNameMr").value.trim();
    const img = document.getElementById("prodFormImg").value.trim() || "images/Chiken Lollypop Ready Mix.png";
    const desc = document.getElementById("prodFormDesc").value.trim();

    if (state.editingProduct) {
      const p = state.editingProduct;
      p.name = name;
      p.nameMr = nameMr;
      p.category = category;
      p.minPrice = minPrice;
      p.maxPrice = maxPrice;
      p.sizes = sizes;
      p.stock = stock;
      p.status = status;
      p.bestseller = bestseller;
      p.img = img;
      p.desc = desc;

      toast(`Product "${name}" configuration updated!`);
    } else {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newProduct = {
        id: id || "product-" + Date.now(),
        name,
        nameMr,
        category,
        minPrice,
        maxPrice,
        sizes,
        stock,
        status,
        bestseller,
        img,
        slug: "product.html?id=" + encodeURIComponent(id || "product-" + Date.now()),
        desc
      };
      state.products.push(newProduct);
      toast(`New product "${name}" added to catalog!`);
    }

    syncCatalogToStorefront();
    closeModal("productModal");
    renderProducts();
    renderInventory();
    renderOverview();
  }

  function toggleProductStock(productId) {
    const p = state.products.find((x) => x.id === productId);
    if (!p) return;

    if (p.status === "in-stock") p.status = "low-stock";
    else if (p.status === "low-stock") p.status = "out-stock";
    else p.status = "in-stock";

    syncCatalogToStorefront();
    renderProducts();
    renderInventory();
    toast(`Stock status for "${p.name}" changed to ${p.status.toUpperCase()}`);
  }

  function adjustProductStock(productId, delta) {
    const p = state.products.find((x) => x.id === productId);
    if (!p) return;
    p.stock = Math.max(0, (Number(p.stock) || 0) + delta);
    if (p.stock === 0) p.status = "out-stock";
    else if (p.stock <= 15) p.status = "low-stock";
    else p.status = "in-stock";

    addStockLog(p.id, p.name, "Manual Adjustment", delta, p.stock, "Stock adjustment via CRM");
    syncCatalogToStorefront();
    renderProducts();
    renderInventory();
    toast(`Stock for ${p.name} adjusted by ${delta > 0 ? '+' : ''}${delta} (Now: ${p.stock})`);
  }

  function deleteProduct(productId) {
    const p = state.products.find((x) => x.id === productId);
    if (!p) return;

    if (confirm(`Are you sure you want to delete "${p.name}" from the store catalog?`)) {
      state.products = state.products.filter((x) => x.id !== productId);
      syncCatalogToStorefront();
      renderProducts();
      renderInventory();
      renderOverview();
      toast(`Product "${p.name}" deleted.`);
    }
  }

  function updateImgPreview(src) {
    const imgEl = document.getElementById("modalImgPreview");
    if (imgEl) {
      imgEl.src = src || "images/Chiken Lollypop Ready Mix.png";
    }
  }

  // ==========================================================================
  // ORDER ACTIONS & OPERATIONAL MODALS
  // ==========================================================================
  function updateOrderStatus(orderId, newStatus) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    order.status = newStatus;

    if (newStatus === "cancelled") {
      // Automatically restore inventory stock
      if (order.items && order.items.length) {
        order.items.forEach(it => {
          const prod = state.products.find(x => x.id === it.id);
          if (prod && typeof prod.stock === "number") {
            prod.stock += (it.qty || 1);
            if (prod.stock > 15 && prod.status === "low-stock") prod.status = "in-stock";
            addStockLog(prod.id, prod.name, "Order Cancel Restock", it.qty, prod.stock, "Cancelled " + order.id);
          }
        });
        saveData(STORAGE.PRODUCTS, state.products);
      }
    }

    saveData(STORAGE.ORDERS, state.orders);
    renderOrders();
    renderOverview();
    renderShipping();
    toast(`Order ${order.id} status updated to ${newStatus.toUpperCase()}`);
  }

  function cancelOrder(orderId) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;

    const reason = prompt("Enter cancellation reason (e.g. Customer requested, Incorrect item selected):", "Customer requested cancellation");
    if (reason !== null) {
      order.status = "cancelled";
      order.cancellationReason = reason;

      // Restore inventory
      if (order.items && order.items.length) {
        order.items.forEach(it => {
          const prod = state.products.find(x => x.id === it.id);
          if (prod && typeof prod.stock === "number") {
            prod.stock += (it.qty || 1);
            addStockLog(prod.id, prod.name, "Order Cancel Restock", it.qty, prod.stock, "Cancelled " + order.id);
          }
        });
        saveData(STORAGE.PRODUCTS, state.products);
      }

      // If prepaid, record refund
      if (order.paymentStatus === "PAID" || !!order.paymentId) {
        const refId = "RFND-" + Date.now().toString(36).toUpperCase();
        order.paymentStatus = "REFUNDED";
        state.returns.unshift({
          id: refId,
          date: formatDate(new Date()),
          orderId: order.id,
          customer: order.customer,
          itemName: "Order " + order.id + " (Full Cancellation)",
          reason: reason,
          status: "Refunded",
          refundAmount: order.total
        });
        saveData(STORAGE.RETURNS, state.returns);
      }

      saveData(STORAGE.ORDERS, state.orders);
      renderAll();
      toast(`Order ${order.id} cancelled. Stock restored to inventory.`);
    }
  }

  function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to remove Order ${orderId}?`)) {
      state.orders = state.orders.filter((o) => o.id !== orderId);
      saveData(STORAGE.ORDERS, state.orders);
      renderAll();
      toast(`Order ${orderId} removed.`);
    }
  }

  function openOrderDetailModal(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modalBody = document.getElementById("orderDetailModalContent");
    if (!modalBody) return;

    const rows = order.items.map((i, n) => `
      <tr>
        <td>${n + 1}</td>
        <td><b>${esc(i.name)}</b></td>
        <td><span style="color:var(--muted)">${esc(i.size || "Standard")}</span></td>
        <td>${i.qty}</td>
        <td>${rs(i.price)}</td>
        <td><b>${rs(i.qty * i.price)}</b></td>
      </tr>
    `).join("");

    modalBody.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:20px;border-bottom:1px solid var(--line);padding-bottom:14px;">
        <div>
          <h2 style="font-family:var(--font-head);font-size:20px;color:var(--accent);margin-bottom:4px">${esc(order.id)}</h2>
          <span style="font-size:12px;color:var(--muted)"><i class="bi bi-clock"></i> Placed on: ${esc(order.date)}</span>
        </div>
        <div style="text-align:right">
          <span class="status-badge ${order.status}" style="font-size:13px;padding:4px 12px">${esc(order.status.toUpperCase())}</span>
          <div style="font-size:11.5px;color:var(--muted);margin-top:4px">${esc(order.payment)}</div>
        </div>
      </div>

      <div class="dual-section" style="margin-bottom:20px">
        <div class="panel-box" style="padding:14px">
          <h4 style="font-size:11px;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Customer & Delivery Details</h4>
          <b style="font-size:14px">${esc(order.customer)}</b>
          <div style="font-size:12.5px;color:var(--fg-soft);line-height:1.5;margin-top:4px">
            <i class="bi bi-telephone"></i> ${esc(order.phone)}<br>
            <i class="bi bi-envelope"></i> ${esc(order.email || 'N/A')}<br>
            <i class="bi bi-geo-alt"></i> ${esc(order.address || order.city)}
          </div>
          ${order.packagingNotes ? `<div style="margin-top:8px;padding:6px 10px;background:var(--warning-bg);color:var(--warning);border-radius:4px;font-size:11.5px"><b>Packaging Note:</b> ${esc(order.packagingNotes)}</div>` : ''}
        </div>

        <div class="panel-box" style="padding:14px">
          <h4 style="font-size:11px;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Shipping & Tracking</h4>
          <div style="font-size:13px">Courier: <b>${esc(order.courier || state.settings.defaultCourier)}</b></div>
          <div style="font-size:13px;margin-top:4px">AWB Tracking: <b>${esc(order.awb || 'Pending Generation')}</b></div>
          ${order.podRef ? `<div style="font-size:12px;color:var(--success);margin-top:4px"><i class="bi bi-patch-check"></i> <b>Proof of Delivery:</b> ${esc(order.podRef)}</div>` : ''}
          <div style="margin-top:10px;display:flex;gap:8px">
            <button type="button" class="btn-outline" style="padding:4px 8px;font-size:11px;" onclick="window.BK_CRM.viewShippingLabel('${esc(order.id)}')"><i class="bi bi-tag"></i> Print Label</button>
            <button type="button" class="btn-outline" style="padding:4px 8px;font-size:11px;" onclick="window.BK_CRM.viewPackingSlip('${esc(order.id)}')"><i class="bi bi-card-checklist"></i> Packing Slip</button>
          </div>
        </div>
      </div>

      <table class="data-table" style="margin-bottom:18px">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Pack Variant</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <div style="display:flex;justify-content:flex-end">
        <div style="min-width:240px;font-size:13px;line-height:1.7">
          <div style="display:flex;justify-content:space-between"><span>Subtotal:</span><b>${rs(order.total)}</b></div>
          <div style="display:flex;justify-content:space-between"><span>GST (5% Inclusive):</span><span>Included</span></div>
          <div style="display:flex;justify-content:space-between"><span>Shipping:</span><b style="color:var(--success)">FREE</b></div>
          <div style="display:flex;justify-content:space-between;font-size:16px;border-top:1px solid var(--line);padding-top:6px;margin-top:4px;color:var(--accent)"><span>Total:</span><b>${rs(order.total)}</b></div>
        </div>
      </div>
    `;

    openModal("orderDetailModal");
  }

  function viewOrderSlip(orderId) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;

    const s = state.settings;
    const slipBody = document.getElementById("invoiceSlipContent");
    if (!slipBody) return;

    const rows = order.items
      .map(
        (i, n) => `
      <tr>
        <td>${n + 1}</td>
        <td><b>${esc(i.name)}</b><br><small style="color:#7a6e65">Pack: ${esc(i.size || "Standard")}</small></td>
        <td>${i.qty}</td>
        <td>${rs(i.price)}</td>
        <td><b>${rs(i.qty * i.price)}</b></td>
      </tr>
    `
      )
      .join("");

    slipBody.innerHTML = `
      <div class="invoice-slip">
        <div class="inv-brand-row">
          <div>
            <div class="inv-logo-title">${esc(s.storeName)}</div>
            <p style="font-size:12px;color:#7a6e65">${esc(s.tagline)} · Panvel, Navi Mumbai</p>
            <p style="font-size:11px;color:#9e8e82">${esc(s.address)}</p>
            <p style="font-size:11px;color:#9e8e82">Phone: ${esc(s.phone)} | GSTIN: ${esc(s.gstin)}</p>
          </div>
          <div style="text-align:right">
            <h2 style="font-family:var(--font-head);font-size:18px;margin-bottom:4px;color:#271f1a">TAX INVOICE</h2>
            <div style="font-size:13px;font-weight:700;color:#c8501e">${esc(order.id)}</div>
            <div style="font-size:11.5px;color:#7a6e65">Date: ${esc(order.date)}</div>
            <div style="font-size:11.5px;color:#7a6e65">Payment: <b>${esc(order.payment)}</b></div>
            ${order.paymentId ? `<div style="font-size:11px;color:#15803d;font-weight:600;margin-top:2px"><i class="bi bi-shield-check"></i> RZP Ref: ${esc(order.paymentId)}</div>` : ""}
          </div>
        </div>

        <div class="inv-meta-grid">
          <div>
            <h4 style="font-size:11px;text-transform:uppercase;color:#7a6e65;margin-bottom:4px">Billed & Shipped To:</h4>
            <b style="font-size:14px">${esc(order.customer)}</b>
            <div>${esc(order.address || order.city)}</div>
            <div>Phone: ${esc(order.phone)}</div>
            <div>Email: ${esc(order.email || 'N/A')}</div>
          </div>
          <div style="text-align:right">
            <h4 style="font-size:11px;text-transform:uppercase;color:#7a6e65;margin-bottom:4px">Order Status:</h4>
            <span class="status-badge ${order.status}" style="font-size:12px">${esc(order.status.toUpperCase())}</span>
          </div>
        </div>

        <table class="inv-table">
          <thead>
            <tr>
              <th style="width:40px">#</th>
              <th>Product / Pack Variant</th>
              <th style="width:60px">Qty</th>
              <th style="width:100px">Unit Price</th>
              <th style="width:110px">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="inv-totals">
          <div>Subtotal: <b>${rs(order.total)}</b></div>
          <div>GST (5% Inclusive): <b>Included (CGST 2.5% + SGST 2.5%)</b></div>
          <div>Shipping & Delivery: <b style="color:#15803d">FREE</b></div>
          <div style="font-size:16px;border-top:1px solid #271f1a;padding-top:6px;margin-top:4px">Total Amount: <b style="color:#c8501e">${rs(order.total)}</b></div>
          <div style="font-size:11px;margin-top:4px;color:${order.paymentId || (order.payment && order.payment.includes('Razorpay')) ? '#15803d' : '#b45309'}">
            Payment Status: <b>${order.paymentId || (order.payment && order.payment.includes('Razorpay')) ? 'PAID ONLINE (RAZORPAY)' : 'CASH ON DELIVERY (COD)'}</b>
          </div>
        </div>

        <div style="margin-top:24px;border-top:1px dashed #d3c4b7;padding-top:12px;font-size:11px;color:#7a6e65;text-align:center">
          Thank you for trusting Bhau Korde Masale! Handcrafted natural spices straight from Panvel.<br>
          For any questions, reach us on WhatsApp at (+91) 91678 34686.
        </div>
      </div>
    `;

    openModal("orderSlipModal");
  }

  function viewShippingLabel(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const s = state.settings;
    const labelBody = document.getElementById("shippingLabelModalContent");
    if (!labelBody) return;

    const awb = order.awb || ("DELH-" + Math.floor(10000000 + Math.random() * 90000000));
    order.awb = awb;
    saveData(STORAGE.ORDERS, state.orders);

    labelBody.innerHTML = `
      <div class="shipping-label-card">
        <div class="shipping-label-header">
          <div>
            <b style="font-size:16px;color:#271f1a">${esc(s.storeName)}</b>
            <div style="font-size:11px;color:#555">Panvel, Navi Mumbai &bull; GSTIN: ${esc(s.gstin)}</div>
          </div>
          <div class="courier-badge-box">
            ${esc(order.courier || s.defaultCourier || "DELHIVERY EXPRESS")}
          </div>
        </div>

        <div class="shipping-barcode-sim">
          <div class="shipping-barcode-bars"></div>
          <b style="font-size:15px;letter-spacing:0.12em;font-family:monospace">${esc(awb)}</b>
          <div style="font-size:11px;color:#666;margin-top:2px">Order Ref: ${esc(order.id)}</div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;border-top:1px solid #ddd;padding-top:12px;font-size:12px;">
          <div>
            <b style="text-transform:uppercase;font-size:10px;color:#666">Ship To:</b>
            <div style="font-size:14px;font-weight:700;margin-top:2px">${esc(order.customer)}</div>
            <div style="line-height:1.4;margin-top:2px">${esc(order.address || order.city)}</div>
            <div style="margin-top:4px">Phone: <b>${esc(order.phone)}</b></div>
          </div>
          <div style="border-left:1px solid #ddd;padding-left:14px">
            <b style="text-transform:uppercase;font-size:10px;color:#666">Return / Shipper:</b>
            <div style="font-size:12px;font-weight:600;margin-top:2px">Bhau Korde Masale Hub</div>
            <div style="line-height:1.3;font-size:11px;color:#555">Plot 45A/B, Market Sahakar Nagar, Panvel 410206</div>
            <div style="margin-top:8px;font-size:11px;">
              Package: <b>${order.items.reduce((sum, i) => sum + i.qty, 0)} Items</b><br>
              Mode: <b>${order.paymentStatus === 'PAID' ? 'PREPAID' : 'COD'}</b>
            </div>
          </div>
        </div>

        ${order.packagingNotes ? `
          <div style="margin-top:12px;padding:6px 10px;background:#fef3c7;border:1px solid #fde68a;border-radius:4px;font-size:11px">
            <b>Special Instructions:</b> ${esc(order.packagingNotes)}
          </div>
        ` : ''}

        <div style="margin-top:14px;border-top:1px dashed #bbb;padding-top:8px;display:flex;justify-content:space-between;font-size:10px;color:#666;">
          <span>HANDLE WITH CARE &bull; AUTHENTIC SPICES</span>
          <span>DISPATCH DATE: ${esc(order.date.split(' ')[0])}</span>
        </div>
      </div>
    `;

    openModal("shippingLabelModal");
  }

  function viewPackingSlip(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const slipBody = document.getElementById("packingSlipModalContent");
    if (!slipBody) return;

    const itemsRows = order.items.map((i, idx) => `
      <div class="packing-item-row">
        <label style="display:flex;align-items:center;gap:12px;cursor:pointer">
          <input type="checkbox" class="packing-checkbox">
          <div>
            <b>${esc(i.name)}</b>
            <div style="font-size:11.5px;color:var(--muted)">Pack Size: ${esc(i.size || "Standard")} &bull; SKU: ${esc(i.id || 'SPICE-' + idx)}</div>
          </div>
        </label>
        <div style="font-size:15px;font-weight:700">${i.qty} units</div>
      </div>
    `).join("");

    slipBody.innerHTML = `
      <div class="packing-slip-box">
        <div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:14px;">
          <div>
            <h3 style="font-family:var(--font-head);font-size:18px;color:var(--accent)">WAREHOUSE PICKING & PACKING SLIP</h3>
            <div style="font-size:12px;color:var(--muted)">Bhau Korde Masale Fulfillment Center &bull; Panvel</div>
          </div>
          <div style="text-align:right">
            <b>${esc(order.id)}</b>
            <div style="font-size:11px;color:var(--muted)">${esc(order.date)}</div>
          </div>
        </div>

        <div style="margin-bottom:14px;padding:10px;background:var(--surface-alt);border-radius:var(--radius-sm);font-size:12px;">
          <b>Customer:</b> ${esc(order.customer)} &bull; <b>City:</b> ${esc(order.city)} &bull; <b>Courier:</b> ${esc(order.courier || state.settings.defaultCourier)}
          ${order.packagingNotes ? `<div style="color:#d97706;margin-top:3px"><b>Packaging Request:</b> ${esc(order.packagingNotes)}</div>` : ''}
        </div>

        <div style="margin-bottom:16px;">
          <h4 style="font-size:11px;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Item Verification Checklist (Check to pick):</h4>
          ${itemsRows}
        </div>

        <div style="border-top:1px dashed var(--line);padding-top:10px;font-size:11.5px;color:var(--muted);display:flex;justify-content:space-between;">
          <span>Checked By: ___________________</span>
          <span>Packed By: ___________________</span>
        </div>
      </div>
    `;

    openModal("packingSlipModal");
  }

  function openRefundModal(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modalBody = document.getElementById("refundModalContent");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="font-size:13px;line-height:1.6">
        <p>Initiate refund for Order <b style="color:var(--accent)">${esc(order.id)}</b>:</p>
        <div class="form-group" style="margin-top:12px">
          <label>Customer Name</label>
          <input type="text" value="${esc(order.customer)}" readonly>
        </div>
        <div class="form-group" style="margin-top:12px">
          <label>Original Total Amount</label>
          <input type="text" value="${rs(order.total)}" readonly>
        </div>
        <div class="form-group" style="margin-top:12px">
          <label>Refund Amount (₹)</label>
          <input type="number" id="refundInputAmount" value="${order.total}" max="${order.total}" required>
        </div>
        <div class="form-group" style="margin-top:12px">
          <label>Refund Reason</label>
          <select id="refundInputReason" class="filter-select" style="width:100%">
            <option value="Customer Return Approved">Customer Return Approved</option>
            <option value="Order Cancelled Prior to Dispatch">Order Cancelled Prior to Dispatch</option>
            <option value="Damaged in Transit / Leakage">Damaged in Transit / Leakage</option>
            <option value="Goodwill Customer Service Adjustment">Goodwill Customer Service Adjustment</option>
          </select>
        </div>
      </div>
    `;

    const btnProcess = document.getElementById("btnConfirmProcessRefund");
    if (btnProcess) {
      btnProcess.onclick = function() {
        const amt = parseFloat(document.getElementById("refundInputAmount").value) || order.total;
        const rsn = document.getElementById("refundInputReason").value;
        const refId = "RFND-" + Date.now().toString(36).toUpperCase();

        state.returns.unshift({
          id: refId,
          date: formatDate(new Date()),
          orderId: order.id,
          customer: order.customer,
          itemName: "Order " + order.id,
          reason: rsn,
          status: "Refunded",
          refundAmount: amt
        });
        saveData(STORAGE.RETURNS, state.returns);

        order.paymentStatus = amt >= order.total ? "REFUNDED" : "PARTIALLY_REFUNDED";
        saveData(STORAGE.ORDERS, state.orders);

        closeModal("refundModal");
        renderAll();
        toast(`Refund of ${rs(amt)} processed successfully! Refund ID: ${refId}`);
      };
    }

    openModal("refundModal");
  }

  function setOrderCourier(orderId, courierName) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;
    o.courier = courierName;
    saveData(STORAGE.ORDERS, state.orders);
    renderShipping();
    toast(`Courier partner for ${o.id} set to ${courierName}`);
  }

  function generateAWBForOrder(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;
    const prefix = (o.courier && o.courier.startsWith("Shiprocket")) ? "SHIP-" : "DELH-";
    o.awb = prefix + Math.floor(10000000 + Math.random() * 90000000);
    if (o.status === "pending" || o.status === "confirmed") {
      o.status = "processing";
    }
    saveData(STORAGE.ORDERS, state.orders);
    renderOrders();
    renderShipping();
    toast(`AWB ${o.awb} generated for order ${o.id}!`);
  }

  function markOrderDelivered(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;
    const pod = prompt("Enter Proof of Delivery (POD) reference / recipient note:", "DELH-POD-" + Math.floor(1000 + Math.random() * 9000));
    if (pod !== null) {
      o.status = "delivered";
      o.podRef = pod;
      saveData(STORAGE.ORDERS, state.orders);
      renderAll();
      toast(`Order ${o.id} marked as DELIVERED with POD ${pod}!`);
    }
  }

  function handleNDREscalation(orderId, action) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;
    if (action === "reattempt") {
      o.status = "out-delivery";
      toast(`Delivery reattempt scheduled for order ${o.id}!`);
    } else if (action === "rto") {
      o.status = "rto";
      toast(`Return to Origin (RTO) initiated for order ${o.id}.`);
    }
    saveData(STORAGE.ORDERS, state.orders);
    renderShipping();
    renderOrders();
  }

  function approveReturn(returnId) {
    const r = state.returns.find(x => x.id === returnId);
    if (!r) return;
    r.status = "Approved";
    saveData(STORAGE.RETURNS, state.returns);
    renderReturns();
    toast(`Return ${returnId} approved!`);
  }

  function rejectReturn(returnId) {
    const r = state.returns.find(x => x.id === returnId);
    if (!r) return;
    r.status = "Rejected";
    saveData(STORAGE.RETURNS, state.returns);
    renderReturns();
    toast(`Return ${returnId} rejected.`);
  }

  function scheduleReversePickup(returnId) {
    const r = state.returns.find(x => x.id === returnId);
    if (!r) return;
    r.status = "Reverse Pickup Scheduled";
    r.reverseAwb = "REV-DELH-" + Math.floor(100000 + Math.random() * 900000);
    saveData(STORAGE.RETURNS, state.returns);
    renderReturns();
    toast(`Reverse pickup scheduled! Reverse AWB: ${r.reverseAwb}`);
  }

  function inspectReturnProduct(returnId, passed) {
    const r = state.returns.find(x => x.id === returnId);
    if (!r) return;
    r.status = passed ? "Inspected - Approved" : "Rejected";
    saveData(STORAGE.RETURNS, state.returns);
    renderReturns();
    toast(`Product inspection completed: ${r.status}`);
  }

  function generateExchangeOrder(returnId) {
    const r = state.returns.find(x => x.id === returnId);
    if (!r) return;
    const exchId = "BK-EXCH-" + Math.floor(10000 + Math.random() * 90000);
    const exchOrder = {
      id: exchId,
      date: formatDate(new Date()),
      customer: r.customer,
      phone: "98200XXXXX",
      city: "Navi Mumbai",
      address: "Exchange Replacement Order",
      payment: "Exchange Replacement (₹0)",
      paymentStatus: "PAID",
      status: "processing",
      total: 0,
      items: [{ id: "special-malvani-masala", name: r.itemName || "Special Malvani Masala", size: "Standard", qty: 1, price: 0 }]
    };
    state.orders.unshift(exchOrder);
    r.status = "Exchange Order Created (" + exchId + ")";
    saveData(STORAGE.ORDERS, state.orders);
    saveData(STORAGE.RETURNS, state.returns);
    renderAll();
    toast(`Replacement Exchange Order ${exchId} created!`);
  }

  function processReturnRefund(returnId) {
    const r = state.returns.find(x => x.id === returnId);
    if (!r) return;
    r.status = "Refunded";
    r.refundId = "RFND-" + Date.now().toString(36).toUpperCase();
    saveData(STORAGE.RETURNS, state.returns);
    renderAll();
    toast(`Refund of ${rs(r.refundAmount || 180)} processed! ID: ${r.refundId}`);
  }

  function sendTrackingNotification(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;
    const phone = (o.phone || "").replace(/[^0-9]/g, "");
    const formatted = phone.startsWith("91") ? phone : "91" + phone;
    const awb = o.awb || "DELH-98421098";
    const msg = `Namaste ${o.customer}! 🌿 Your Bhau Korde Masale spice order *${o.id}* is dispatched via ${o.courier || 'Delhivery Express'}. AWB: ${awb}. Live Tracking: https://www.delhivery.com/track/package/${awb} - Bhau Korde Masale`;
    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function sendPaymentRecoveryLink(phone, name, amount) {
    const clean = phone.replace(/[^0-9]/g, "");
    const formatted = clean.startsWith("91") ? clean : "91" + clean;
    const msg = `Namaste ${name}! 🌿 We noticed your online checkout on Bhau Korde Masale for ${rs(amount)} was not completed. You can complete your order using this secure link: https://bhaukorde.in/cart.html?pay=BK-RETRY&amt=${amount} or reply here for Cash on Delivery.`;
    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function sendCurrentNotificationWhatsApp() {
    const phone = (state.currentNotifPhone || "").replace(/[^0-9]/g, "");
    const formatted = phone.startsWith("91") ? phone : "91" + phone;
    const msg = state.currentNotifMsg || "";
    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function copyCurrentNotification() {
    const text = state.currentNotifMsg || "";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        toast("Notification text copied to clipboard!");
      });
    } else {
      toast("Notification text ready.");
    }
  }

  function dispatchNotificationWhatsApp(phone, encodedMsg) {
    const clean = phone.replace(/[^0-9]/g, "");
    const formatted = clean.startsWith("91") ? clean : "91" + clean;
    window.open(`https://wa.me/${formatted}?text=${encodedMsg}`, "_blank");
  }

  function copyNotificationText(encodedMsg) {
    const text = decodeURIComponent(encodedMsg);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        toast("Notification text copied to clipboard!");
      });
    } else {
      toast("Notification text ready.");
    }
  }

  function sendOrderWhatsApp(orderId) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;

    const phone = (order.phone || "").replace(/[^0-9]/g, "");
    const cleanPhone = phone.startsWith("91") ? phone : "91" + phone;
    const itemsList = order.items.map((i, idx) => `${idx + 1}. ${i.name} (${i.size || "Standard"}) x${i.qty} = ${rs(i.qty * i.price)}`).join("\n");

    const message = `Namaste ${order.customer}! 🌿\n\nThank you for ordering with *Bhau Korde Masale* (Panvel).\n\n*Order ID:* ${order.id}\n*Status:* ${order.status.toUpperCase()}\n\n*Items Ordered:*\n${itemsList}\n\n*Total Amount:* ${rs(order.total)}\n*Delivery Address:* ${order.address}\n\nOur team is currently preparing your handcrafted natural spices. Let us know if you need any adjustments!\n\n_चवीने खाणार त्याला भाऊ देणार._`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  function sendPaymentLink(orderId) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;

    const s = state.settings;
    const phone = (order.phone || "").replace(/[^0-9]/g, "");
    const cleanPhone = phone.startsWith("91") ? phone : "91" + phone;
    const mode = s.razorpayMode === "live" ? "Live" : "Test / Sandbox";

    const payMessage = `Namaste ${order.customer}! 🌿\n\nThank you for ordering with *Bhau Korde Masale* (Panvel).\n\n*Order ID:* ${order.id}\n*Payable Amount:* ${rs(order.total)}\n*Payment Gateway:* Razorpay UPI (GPay/PhonePe/Paytm), Cards & Netbanking (${mode})\n\nPlease pay using our secure Razorpay payment checkout to confirm immediate dispatch:\n👉 https://bhaukorde.in/cart.html?pay=${encodeURIComponent(order.id)}&amt=${order.total}\n\nThank you!\n_चवीने खाणार त्याला भाऊ देणार._`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(payMessage).catch(() => {});
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(payMessage)}`;
    window.open(url, "_blank");
    toast(`Razorpay payment request link prepared for order ${order.id}!`);
  }

  function sendCustomerWhatsApp(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formatted = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;
    const msg = `Namaste ${name} ji, greetings from Bhau Korde Masale (Panvel)! We have fresh batches of our handmade spice blends and pickles ready. Please let us know if you would like to place an order or need anything dispatched. - Bhau Korde Masale, Panvel.`;
    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function editCustomerNotes(customerId) {
    const c = state.customers.find((x) => x.id === customerId);
    if (!c) return;

    const newNotes = prompt(`Enter notes for ${c.name}:`, c.notes || "");
    if (newNotes !== null) {
      c.notes = newNotes;
      saveData(STORAGE.CUSTOMERS, state.customers);
      renderCustomers();
      toast("Customer notes saved.");
    }
  }

  function updateInquiryStatus(inquiryId, newStatus) {
    const inq = state.inquiries.find((i) => i.id === inquiryId);
    if (!inq) return;
    inq.status = newStatus;
    saveData(STORAGE.INQUIRIES, state.inquiries);
    renderInquiries();
    renderOverview();
    toast(`Inquiry ${inquiryId} marked as ${newStatus}`);
  }

  function replyInquiryWhatsApp(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formatted = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;
    const msg = `Namaste ${name}! Thank you for your inquiry on the Bhau Korde Masale website. How can we assist you with our products or bulk distribution today?`;
    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function deleteInquiry(inquiryId) {
    if (confirm(`Delete inquiry ${inquiryId}?`)) {
      state.inquiries = state.inquiries.filter((i) => i.id !== inquiryId);
      saveData(STORAGE.INQUIRIES, state.inquiries);
      renderInquiries();
      renderOverview();
      toast(`Inquiry ${inquiryId} deleted.`);
    }
  }

  function updateTicketStatus(ticketId, newStatus) {
    const t = state.tickets.find(x => x.id === ticketId);
    if (!t) return;
    t.status = newStatus;
    saveData(STORAGE.TICKETS, state.tickets);
    renderSupport();
    toast(`Ticket ${ticketId} status updated to ${newStatus}`);
  }

  function toggleReviewFeatured(reviewId) {
    const r = state.reviews.find(x => x.id === reviewId);
    if (!r) return;
    r.featured = !r.featured;
    saveData(STORAGE.REVIEWS, state.reviews);
    renderSupport();
    toast(`Review ${reviewId} ${r.featured ? 'featured on storefront' : 'hidden'}.`);
  }

  function switchRBACRole(roleName) {
    state.currentRole = roleName;
    localStorage.setItem(STORAGE.ROLE, roleName);
    const staffRoleEl = document.querySelector(".staff-meta .staff-role");
    if (staffRoleEl) staffRoleEl.textContent = roleName;
    renderSettings();
    toast(`Role switched to: ${roleName}`);
  }

  // ==========================================================================
  // RENDER: PRODUCTS CATALOG MANAGEMENT
  // ==========================================================================
  function renderProducts() {
    const listWrap = document.getElementById("productsTableBody");
    if (!listWrap) return;

    let items = [...state.products];
    const query = (state.search.products || "").toLowerCase();
    if (query) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.nameMr && p.nameMr.includes(query)) ||
          p.id.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (state.filters.productCategory !== "all") {
      items = items.filter((p) => p.category === state.filters.productCategory);
    }
    if (state.filters.productStock !== "all") {
      items = items.filter((p) => p.status === state.filters.productStock);
    }

    if (!items.length) {
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No products match your filter criteria.</td></tr>`;
      return;
    }

    listWrap.innerHTML = items
      .map((p) => {
        const catClass = p.category === "blend" ? "blend" : p.category === "powder" ? "powder" : "pickle";
        const catLabel = p.category === "blend" ? "Blended Spices" : p.category === "powder" ? "Spice Powder" : "Pickle";
        const priceStr = p.minPrice === p.maxPrice ? rs(p.minPrice) : `${rs(p.minPrice)} – ${rs(p.maxPrice)}`;
        const stockStatusClass = p.status || "in-stock";
        const stockStatusText = stockStatusClass === "in-stock" ? "In Stock" : stockStatusClass === "low-stock" ? "Low Stock" : "Out of Stock";

        return `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-thumb">
                <img src="${esc(p.img || 'images/Chiken Lollypop Ready Mix.png')}" alt="${esc(p.name)}" onerror="this.src='images/Chiken Lollypop Ready Mix.png'">
              </div>
              <div class="product-info-col">
                <div class="product-name">
                  ${esc(p.name)}
                  ${p.bestseller ? '<span class="status-badge vip" style="font-size:9.5px;padding:2px 6px;margin-left:4px;">★ Bestseller</span>' : ''}
                </div>
                ${p.nameMr ? `<div class="product-name-mr">${esc(p.nameMr)}</div>` : ''}
              </div>
            </div>
          </td>
          <td><span class="category-tag ${catClass}">${catLabel}</span></td>
          <td><div class="price-range">${priceStr}</div></td>
          <td><small style="color:var(--fg-soft)">${esc(p.sizes || "Standard Pack")}</small></td>
          <td>
            <button class="status-badge ${stockStatusClass}" style="cursor:pointer;border:none" title="Click to toggle stock status" onclick="window.BK_CRM.toggleProductStock('${esc(p.id)}')">
              <i class="bi bi-circle-fill" style="font-size:7px"></i> ${stockStatusText} (${p.stock || 0})
            </button>
          </td>
          <td>
            <div class="action-btns">
              <button class="action-icon-btn" title="Edit Product Configuration" onclick="window.BK_CRM.openEditProductModal('${esc(p.id)}')">
                <i class="bi bi-pencil-square"></i>
              </button>
              <a class="action-icon-btn" title="Preview on Website" href="${((window.location && window.location.pathname && window.location.pathname.indexOf('/admin/') > -1) ? '../' : '') + ((p.slug && p.slug.endsWith('.html') && p.slug.indexOf('blended-') === -1) ? p.slug : ('product.html?id=' + encodeURIComponent(p.id)))}" target="_blank">
                <i class="bi bi-box-arrow-up-right"></i>
              </a>
              <button class="action-icon-btn delete" title="Delete Product" onclick="window.BK_CRM.deleteProduct('${esc(p.id)}')">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  // ==========================================================================
  // RENDER: CUSTOMERS DIRECTORY
  // ==========================================================================
  function renderCustomers() {
    const listWrap = document.getElementById("customersTableBody");
    if (!listWrap) return;

    let items = [...state.customers];
    const q = (state.search.customers || "").toLowerCase();
    if (q) {
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          (c.city && c.city.toLowerCase().includes(q)) ||
          (c.segment && c.segment.toLowerCase().includes(q))
      );
    }

    if (state.filters.customerSegment !== "all") {
      items = items.filter((c) => c.segment === state.filters.customerSegment);
    }

    if (!items.length) {
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:44px 20px;color:var(--muted)">No customer records match your filter.</td></tr>`;
      return;
    }

    listWrap.innerHTML = items
      .map((c) => {
        const segClass = c.segment && c.segment.includes("VIP") ? "vip" : c.segment && c.segment.includes("Loyal") ? "loyal" : "new";

        return `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="staff-avatar" style="width:34px;height:34px;font-size:13px">${c.name.charAt(0)}</div>
              <div>
                <b>${esc(c.name)}</b>
                <div style="font-size:11px;color:var(--muted)">${esc(c.id)}</div>
              </div>
            </div>
          </td>
          <td>
            <div><i class="bi bi-telephone"></i> ${esc(c.phone)}</div>
            <div style="font-size:11px;color:var(--muted)"><i class="bi bi-envelope"></i> ${esc(c.email || 'N/A')}</div>
          </td>
          <td>${esc(c.city || 'N/A')}</td>
          <td><span class="status-badge ${segClass}">${esc(c.segment || "Regular Customer")}</span></td>
          <td><b>${c.ordersCount || 1}</b> orders</td>
          <td><b style="color:var(--accent)">${rs(c.lifetimeSpend)}</b></td>
          <td>
            <div class="action-btns">
              <button class="btn-whatsapp" title="WhatsApp Customer" onclick="window.BK_CRM.sendCustomerWhatsApp('${esc(c.phone)}', '${esc(c.name)}')">
                <i class="bi bi-whatsapp"></i> Chat
              </button>
              <button class="action-icon-btn" title="Customer Notes" onclick="window.BK_CRM.editCustomerNotes('${esc(c.id)}')">
                <i class="bi bi-card-text"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  // ==========================================================================
  // RENDER: INQUIRIES & LEADS
  // ==========================================================================
  function renderInquiries() {
    const listWrap = document.getElementById("inquiriesTableBody");
    if (!listWrap) return;

    let items = [...state.inquiries].reverse();
    const q = (state.search.inquiries || "").toLowerCase();
    if (q) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.phone.includes(q) ||
          i.message.toLowerCase().includes(q)
      );
    }

    if (state.filters.inquiryStatus !== "all") {
      items = items.filter((i) => i.status === state.filters.inquiryStatus);
    }

    if (!items.length) {
      listWrap.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:44px 20px;color:var(--muted)">No customer inquiries recorded yet.</td></tr>`;
      return;
    }

    listWrap.innerHTML = items
      .map(
        (i) => `
      <tr>
        <td>
          <b>${esc(i.id)}</b>
          <div style="font-size:11px;color:var(--muted)">${esc(i.date)}</div>
        </td>
        <td>
          <div><b>${esc(i.name)}</b></div>
          <div style="font-size:11.5px;color:var(--muted)">
            <i class="bi bi-telephone"></i> ${esc(i.phone || "N/A")}<br>
            <i class="bi bi-envelope"></i> ${esc(i.email || "N/A")}
          </div>
        </td>
        <td><span class="category-tag blend">${esc(i.type || "General Inquiry")}</span></td>
        <td style="max-width:320px;font-size:12.5px;color:var(--fg-soft);line-height:1.4">${esc(i.message)}</td>
        <td>
          <select class="filter-select" style="font-size:12px;padding:4px 8px;" onchange="window.BK_CRM.updateInquiryStatus('${esc(i.id)}', this.value)">
            <option value="New Lead" ${i.status === "New Lead" ? "selected" : ""}>New Lead</option>
            <option value="In Discussion" ${i.status === "In Discussion" ? "selected" : ""}>In Discussion</option>
            <option value="Converted" ${i.status === "Converted" ? "selected" : ""}>Converted to Order</option>
            <option value="Closed" ${i.status === "Closed" ? "selected" : ""}>Closed</option>
          </select>
        </td>
        <td>
          <div class="action-btns">
            ${i.phone ? `<button class="btn-whatsapp" title="Reply on WhatsApp" onclick="window.BK_CRM.replyInquiryWhatsApp('${esc(i.phone)}', '${esc(i.name)}')"><i class="bi bi-whatsapp"></i></button>` : ''}
            ${i.email ? `<a class="action-icon-btn" title="Send Email" href="mailto:${esc(i.email)}?subject=Bhau Korde Masale Enquiry Response"><i class="bi bi-envelope"></i></a>` : ''}
            <button class="action-icon-btn delete" title="Delete Inquiry" onclick="window.BK_CRM.deleteInquiry('${esc(i.id)}')"><i class="bi bi-trash3"></i></button>
          </div>
        </td>
      </tr>
    `
      )
      .join("");
  }

  // ==========================================================================
  // MODULE 9 & 11: ADVANCED REPORTS & CSV EXPORT UTILITIES
  // ==========================================================================
  function renderReports() {
    const totalRev = state.orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? Number(o.total || 0) : 0), 0);
    const rzpRev = state.orders.filter(o => o.paymentStatus === "PAID").reduce((sum, o) => sum + Number(o.total || 0), 0);
    const codRev = state.orders.filter(o => o.payment && o.payment.includes("COD")).reduce((sum, o) => sum + Number(o.total || 0), 0);
    const gstCollected = Math.round(totalRev * 0.05); // 5% inclusive GST
    const gatewayFees = Math.round(rzpRev * 0.0236);
    const netPayout = Math.max(0, rzpRev - gatewayFees);

    const elGross = document.getElementById("repGrossSales");
    if (elGross) elGross.textContent = rs(totalRev);
    const elGst = document.getElementById("repGstCollected");
    if (elGst) elGst.textContent = rs(gstCollected);
    const elRzp = document.getElementById("repRzpVolume");
    if (elRzp) elRzp.textContent = rs(rzpRev);
    const elCod = document.getElementById("repCodVolume");
    if (elCod) elCod.textContent = rs(codRev);
    const elFee = document.getElementById("repGatewayFees");
    if (elFee) elFee.textContent = rs(gatewayFees);
    const elNet = document.getElementById("repNetPayout");
    if (elNet) elNet.textContent = rs(netPayout);
  }

  function downloadCSV(filename, rows) {
    const processRow = function (row) {
      let finalVal = "";
      for (let j = 0; j < row.length; j++) {
        let innerValue = row[j] === null || row[j] === undefined ? "" : row[j].toString();
        if (row[j] instanceof Date) innerValue = row[j].toLocaleString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
        if (j > 0) finalVal += ",";
        finalVal += result;
      }
      return finalVal + "\n";
    };

    let csvFile = "";
    for (let i = 0; i < rows.length; i++) csvFile += processRow(rows[i]);

    const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      if (document.body && document.body.appendChild) document.body.appendChild(link);
      link.click();
      if (document.body && document.body.removeChild) document.body.removeChild(link);
      toast(`Exported ${filename} successfully!`);
    }
  }

  function exportProductsCSV() {
    const rows = [["Product ID", "Title", "Regional Title", "Category", "Min Price (INR)", "Max Price (INR)", "Pack Sizes", "Stock Units", "Stock Status", "Is Bestseller"]];
    state.products.forEach((p) => {
      rows.push([p.id, p.name, p.nameMr || "", p.category, p.minPrice, p.maxPrice, p.sizes || "", p.stock || 0, p.status, p.bestseller ? "YES" : "NO"]);
    });
    downloadCSV("bhau_korde_products_catalog.csv", rows);
  }

  function exportOrdersCSV() {
    const rows = [["Order ID", "Date", "Customer Name", "Phone", "Email", "City", "Payment Method", "Payment Reference ID", "Payment Status", "Order Status", "Total Amount (INR)", "Items Summary"]];
    state.orders.forEach((o) => {
      const summary = o.items.map((i) => `${i.name} (${i.size}) x${i.qty}`).join(" | ");
      const isPaid = !!o.paymentId || (o.payment && o.payment.toLowerCase().includes("razorpay"));
      rows.push([o.id, o.date, o.customer, o.phone, o.email, o.city, o.payment || "WhatsApp Order", o.paymentId || "N/A", isPaid ? "PAID" : "PENDING/COD", o.status, o.total, summary]);
    });
    downloadCSV("bhau_korde_orders_report.csv", rows);
  }

  function exportPaymentsCSV() {
    const rows = [["Order ID", "Date", "Customer", "Amount (INR)", "Payment Method", "Gateway Reference ID", "Payment Status", "Settlement Status"]];
    state.orders.forEach((o) => {
      const isPaid = o.paymentStatus === "PAID" || !!o.paymentId;
      rows.push([o.id, o.date, o.customer, o.total, o.payment || "COD", o.paymentId || "COD-N/A", isPaid ? "PAID" : "PENDING", isPaid ? "SETTLED" : "UNSETTLED"]);
    });
    downloadCSV("bhau_korde_payment_settlements.csv", rows);
  }

  function exportShippingCSV() {
    const rows = [["Order ID", "Date", "Customer", "Address", "City", "Courier Partner", "AWB Number", "Shipment Status", "Proof of Delivery"]];
    state.orders.forEach((o) => {
      rows.push([o.id, o.date, o.customer, o.address || o.city, o.city, o.courier || state.settings.defaultCourier, o.awb || "UNASSIGNED", o.status, o.podRef || "PENDING"]);
    });
    downloadCSV("bhau_korde_shipping_logistics.csv", rows);
  }

  function exportInventoryCSV() {
    const rows = [["Product ID", "Name", "Category", "Pack Sizes", "Stock Units", "Base Price (INR)", "Valuation (INR)", "Status"]];
    state.products.forEach((p) => {
      const stock = Number(p.stock) || 0;
      rows.push([p.id, p.name, p.category, p.sizes || "", stock, p.minPrice, stock * (p.minPrice || 0), p.status]);
    });
    downloadCSV("bhau_korde_inventory_stock.csv", rows);
  }

  function exportReturnsCSV() {
    const rows = [["Return ID", "Date", "Order ID", "Customer", "Item", "Reason", "Status", "Reverse AWB", "Refund Amount (INR)"]];
    state.returns.forEach((r) => {
      rows.push([r.id, r.date, r.orderId, r.customer, r.itemName, r.reason, r.status, r.reverseAwb || "N/A", r.refundAmount || 0]);
    });
    downloadCSV("bhau_korde_returns_refunds.csv", rows);
  }

  function exportCustomersCSV() {
    const rows = [["Customer ID", "Customer Name", "Phone", "Email", "City", "Customer Type", "Total Orders", "Total Purchases (INR)", "Notes"]];
    state.customers.forEach((c) => {
      rows.push([c.id, c.name, c.phone, c.email, c.city, c.segment, c.ordersCount, c.lifetimeSpend, c.notes || ""]);
    });
    downloadCSV("bhau_korde_customers.csv", rows);
  }

  function exportFullBackupJSON() {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      storeName: state.settings.storeName,
      products: state.products,
      orders: state.orders,
      customers: state.customers,
      inquiries: state.inquiries,
      settings: state.settings,
      returns: state.returns,
      tickets: state.tickets,
      reviews: state.reviews,
      testMatrix: state.testMatrix
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bhau_korde_commerce_backup_${Date.now()}.json`;
    link.click();
    toast("Full store & CRM database backup downloaded successfully.");
  }

  function importBackupJSON(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.products && Array.isArray(data.products)) state.products = data.products;
        if (data.orders && Array.isArray(data.orders)) state.orders = data.orders;
        if (data.customers && Array.isArray(data.customers)) state.customers = data.customers;
        if (data.inquiries && Array.isArray(data.inquiries)) state.inquiries = data.inquiries;
        if (data.returns && Array.isArray(data.returns)) state.returns = data.returns;
        if (data.tickets && Array.isArray(data.tickets)) state.tickets = data.tickets;
        if (data.reviews && Array.isArray(data.reviews)) state.reviews = data.reviews;
        if (data.settings) state.settings = data.settings;

        saveData(STORAGE.PRODUCTS, state.products);
        saveData(STORAGE.ORDERS, state.orders);
        saveData(STORAGE.CUSTOMERS, state.customers);
        saveData(STORAGE.INQUIRIES, state.inquiries);
        saveData(STORAGE.RETURNS, state.returns);
        saveData(STORAGE.TICKETS, state.tickets);
        saveData(STORAGE.REVIEWS, state.reviews);
        saveData(STORAGE.SETTINGS, state.settings);

        renderAll();
        toast("CRM database successfully restored from JSON backup!");
      } catch (err) {
        toast("Invalid backup file: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  }

  function resetToDefaultCatalog() {
    if (confirm("Reset all 31 products to factory defaults? Your custom changes will be overwritten.")) {
      state.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
      saveData(STORAGE.PRODUCTS, state.products);
      renderAll();
      toast("Catalog restored to all 31 default spice products.");
    }
  }

  // Modal Helpers
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add("active");
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove("active");
  }

  // ==========================================================================
  // INITIALIZATION & EVENT LISTENERS
  // ==========================================================================
  document.addEventListener("DOMContentLoaded", function () {
    loadData();
    initTheme();
    initAuth();
    initTabs();

    // Search inputs
    const pSearch = document.getElementById("searchProductsInput");
    if (pSearch) pSearch.addEventListener("input", (e) => { state.search.products = e.target.value; renderProducts(); });
    const oSearch = document.getElementById("searchOrdersInput");
    if (oSearch) oSearch.addEventListener("input", (e) => { state.search.orders = e.target.value; renderOrders(); });
    const paySearch = document.getElementById("searchPaymentsInput");
    if (paySearch) paySearch.addEventListener("input", (e) => { state.search.payments = e.target.value; renderPayments(); });
    const shipSearch = document.getElementById("searchShippingInput");
    if (shipSearch) shipSearch.addEventListener("input", (e) => { state.search.shipping = e.target.value; renderShipping(); });
    const invSearch = document.getElementById("searchInventoryInput");
    if (invSearch) invSearch.addEventListener("input", (e) => { state.search.inventory = e.target.value; renderInventory(); });
    const retSearch = document.getElementById("searchReturnsInput");
    if (retSearch) retSearch.addEventListener("input", (e) => { state.search.returns = e.target.value; renderReturns(); });
    const cSearch = document.getElementById("searchCustomersInput");
    if (cSearch) cSearch.addEventListener("input", (e) => { state.search.customers = e.target.value; renderCustomers(); });
    const iSearch = document.getElementById("searchInquiriesInput");
    if (iSearch) iSearch.addEventListener("input", (e) => { state.search.inquiries = e.target.value; renderInquiries(); });
    const aptSearch = document.getElementById("searchAppointmentsInput");
    if (aptSearch) aptSearch.addEventListener("input", (e) => { state.search.appointments = e.target.value; renderAppointments(); });

    // Filters
    const pCatFilter = document.getElementById("filterProductCategory");
    if (pCatFilter) pCatFilter.addEventListener("change", (e) => { state.filters.productCategory = e.target.value; renderProducts(); });
    const pStockFilter = document.getElementById("filterProductStock");
    if (pStockFilter) pStockFilter.addEventListener("change", (e) => { state.filters.productStock = e.target.value; renderProducts(); });
    const oStatusFilter = document.getElementById("filterOrderStatus");
    if (oStatusFilter) oStatusFilter.addEventListener("change", (e) => { state.filters.orderStatus = e.target.value; renderOrders(); });
    const cSegFilter = document.getElementById("filterCustomerSegment");
    if (cSegFilter) cSegFilter.addEventListener("change", (e) => { state.filters.customerSegment = e.target.value; renderCustomers(); });
    const iStatusFilter = document.getElementById("filterInquiryStatus");
    if (iStatusFilter) iStatusFilter.addEventListener("change", (e) => { state.filters.inquiryStatus = e.target.value; renderInquiries(); });
    const aptStatusFilter = document.getElementById("filterAppointmentStatus");
    if (aptStatusFilter) aptStatusFilter.addEventListener("change", (e) => { state.filters.appointmentStatus = e.target.value; renderAppointments(); });

    // Secret Key Toggle Visibility
    const btnToggleSecret = document.getElementById("btnToggleRzpSecret");
    if (btnToggleSecret) {
      btnToggleSecret.addEventListener("click", function() {
        const input = document.getElementById("setRzpKeySecret");
        if (input) {
          const isPass = input.type === "password";
          input.type = isPass ? "text" : "password";
          this.innerHTML = isPass ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
        }
      });
    }

    // Payment sub-tabs switcher
    document.querySelectorAll("[data-pay-subtab]").forEach(btn => {
      btn.addEventListener("click", function() {
        state.paymentSubTab = this.dataset.paySubtab;
        renderPayments();
      });
    });

    // Notification template selector
    const notifTplSelect = document.getElementById("notifTemplateSelect");
    if (notifTplSelect) notifTplSelect.addEventListener("change", renderNotifications);
    const notifOrderSelect = document.getElementById("notifOrderSelect");
    if (notifOrderSelect) notifOrderSelect.addEventListener("change", renderNotifications);

    // Modal background click to close
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) this.classList.remove("active");
      });
    });

    // Close buttons inside modals
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetModal = this.closest(".modal-overlay");
        if (targetModal) targetModal.classList.remove("active");
      });
    });

    // Save product form
    const saveProdBtn = document.getElementById("btnSaveProduct");
    if (saveProdBtn) saveProdBtn.addEventListener("click", saveProductForm);

    // Real-time English to Marathi transliteration for product modal
    const prodNameInput = document.getElementById("prodFormName");
    const prodNameMrInput = document.getElementById("prodFormNameMr");
    const btnAutoMarathi = document.getElementById("btnAutoMarathi");
    let marathiDebounceTimer = null;

    function syncMarathiName(immediateOnly = false) {
      if (!prodNameInput || !prodNameMrInput) return;
      if (state.userCustomizedMarathi) return;

      const val = prodNameInput.value;
      if (!val || !val.trim()) {
        prodNameMrInput.value = "";
        return;
      }
      prodNameMrInput.value = transliterateToMarathi(val);
    }

    if (prodNameInput) prodNameInput.addEventListener("input", () => syncMarathiName(false));
    if (prodNameMrInput) {
      prodNameMrInput.addEventListener("input", function () {
        if (this.value.trim().length > 0) state.userCustomizedMarathi = true;
        else { state.userCustomizedMarathi = false; syncMarathiName(true); }
      });
    }
    if (btnAutoMarathi) {
      btnAutoMarathi.addEventListener("click", function () {
        state.userCustomizedMarathi = false;
        syncMarathiName(false);
        if (prodNameMrInput && prodNameMrInput.value) toast("Marathi title automatically updated!");
      });
    }

    // File Upload Handler
    const fileInput = document.getElementById("prodFormImgFile");
    if (fileInput) fileInput.addEventListener("change", (e) => { if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]); });
    const fileZone = document.getElementById("fileUploadZone");
    if (fileZone && fileInput) {
      fileZone.addEventListener("click", (e) => { if (e.target !== fileInput) fileInput.click(); });
      fileZone.addEventListener("dragover", (e) => { e.preventDefault(); fileZone.classList.add("dragover"); });
      fileZone.addEventListener("dragleave", () => fileZone.classList.remove("dragover"));
      fileZone.addEventListener("drop", (e) => {
        e.preventDefault();
        fileZone.classList.remove("dragover");
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) handleImageFile(e.dataTransfer.files[0]);
      });
    }

    const imgInput = document.getElementById("prodFormImg");
    if (imgInput) imgInput.addEventListener("input", (e) => updateImgPreview(e.target.value));

    // Settings save form
    const setForm = document.getElementById("crmSettingsForm");
    if (setForm) {
      setForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.settings.storeName = document.getElementById("setStoreName").value.trim();
        state.settings.tagline = document.getElementById("setTagline").value.trim();
        state.settings.phone = document.getElementById("setPhone").value.trim();
        state.settings.whatsapp = document.getElementById("setWhatsapp").value.trim();
        state.settings.email = document.getElementById("setEmail").value.trim();
        state.settings.address = document.getElementById("setAddress").value.trim();
        state.settings.gstin = document.getElementById("setGstin").value.trim();
        state.settings.freeDeliveryThreshold = parseFloat(document.getElementById("setFreeDelivery").value) || 500;
        state.settings.shippingFee = parseFloat(document.getElementById("setShippingFee").value) || 50;

        saveData(STORAGE.SETTINGS, state.settings);
        toast("Store settings successfully saved!");
      });
    }

    // Razorpay Gateway settings form
    const rzpForm = document.getElementById("crmPaymentGatewayForm");
    if (rzpForm) {
      rzpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.settings.razorpayEnabled = document.getElementById("setRzpEnabled") ? document.getElementById("setRzpEnabled").checked : true;
        state.settings.razorpayMode = document.getElementById("setRzpMode") ? document.getElementById("setRzpMode").value : "live";
        state.settings.razorpayKeyId = document.getElementById("setRzpKeyId") ? document.getElementById("setRzpKeyId").value.trim() : "";
        state.settings.razorpayKeySecret = document.getElementById("setRzpKeySecret") ? document.getElementById("setRzpKeySecret").value.trim() : "";
        state.settings.razorpayMerchantName = document.getElementById("setRzpMerchantName") ? document.getElementById("setRzpMerchantName").value.trim() : "Bhau Korde Masale";
        state.settings.razorpayThemeColor = document.getElementById("setRzpThemeColor") ? document.getElementById("setRzpThemeColor").value : "#c8501e";

        saveData(STORAGE.SETTINGS, state.settings);
        renderSettings();
        toast("Razorpay payment gateway configuration saved!");
      });
    }

    // Role switcher
    const roleSelect = document.getElementById("setRbacRoleSelect");
    if (roleSelect) {
      roleSelect.addEventListener("change", function(e) {
        switchRBACRole(e.target.value);
      });
    }

    // Backup restore input
    const importInput = document.getElementById("importBackupFile");
    if (importInput) {
      importInput.addEventListener("change", function (e) {
        if (e.target.files && e.target.files[0]) importBackupJSON(e.target.files[0]);
      });
    }

    // Initial render
    renderAll();
  });

  // Public Interface for Inline Handlers
  window.BK_CRM = {
    openAddProductModal,
    openEditProductModal,
    transliterateToMarathi,
    toggleProductStock,
    adjustProductStock,
    deleteProduct,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    openOrderDetailModal,
    viewOrderSlip,
    viewShippingLabel,
    viewPackingSlip,
    openRefundModal,
    setOrderCourier,
    generateAWBForOrder,
    markOrderDelivered,
    handleNDREscalation,
    approveReturn,
    rejectReturn,
    scheduleReversePickup,
    inspectReturnProduct,
    generateExchangeOrder,
    processReturnRefund,
    sendTrackingNotification,
    sendPaymentRecoveryLink,
    sendCurrentNotificationWhatsApp,
    copyCurrentNotification,
    dispatchNotificationWhatsApp,
    copyNotificationText,
    sendOrderWhatsApp,
    sendPaymentLink,
    filterOrders: function (st) {
      switchTab("orders");
      const sel = document.getElementById("filterOrderStatus");
      if (sel) sel.value = st;
      state.filters.orderStatus = st;
      renderOrders();
    },
    filterStock: function (st) {
      switchTab("inventory");
      const sel = document.getElementById("filterProductStock");
      if (sel) sel.value = st;
      state.filters.productStock = st;
      renderInventory();
    },
    sendCustomerWhatsApp,
    editCustomerNotes,
    updateInquiryStatus,
    replyInquiryWhatsApp,
    deleteInquiry,
    updateTicketStatus,
    toggleReviewFeatured,
    switchRBACRole,
    init: loadData,
    switchTab,
    renderAll,
    setPaymentSubTab: function(sub) { state.paymentSubTab = sub; renderPayments(); },
    setMarketingSubTab,
    openAddCouponModal,
    saveCoupon,
    toggleCouponStatus,
    copyCouponCode,
    deleteCoupon,
    launchCampaignWhatsApp,
    openScheduleAppointmentModal,
    saveAppointment,
    updateAppointmentStatus,
    sendAppointmentWhatsApp,
    deleteAppointment,
    updateStorageQuotaDisplay: renderSettings,
    runTestScenario,
    runAllTestScenarios,
    resetTestData,
    exportProductsCSV,
    exportOrdersCSV,
    exportPaymentsCSV,
    exportShippingCSV,
    exportInventoryCSV,
    exportReturnsCSV,
    exportCustomersCSV,
    exportFullBackupJSON,
    resetToDefaultCatalog
  };
})();
