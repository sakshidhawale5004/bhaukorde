/* ==========================================================================
   BHAU KORDE MASALE · STAFF CRM & COMMERCE ADMIN HUB
   Complete Reactive CRM Logic & Data Store
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
    THEME: "bk_crm_theme"
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
    currencySymbol: "₹"
  };

  // Default 31 Products (Configurable Catalog)
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

  // Orders, Customers, Inquiries start fresh without mock default info
  const DEFAULT_ORDERS = [];
  const DEFAULT_CUSTOMERS = [];
  const DEFAULT_INQUIRIES = [];

  // Central State
  const state = {
    products: [],
    orders: [],
    customers: [],
    inquiries: [],
    settings: {},
    activeTab: "overview",
    search: {
      products: "",
      orders: "",
      customers: "",
      inquiries: ""
    },
    filters: {
      productCategory: "all",
      productStock: "all",
      orderStatus: "all",
      customerSegment: "all",
      inquiryStatus: "all"
    },
    activeModal: null,
    editingProduct: null,
    userCustomizedMarathi: false,
    viewingOrder: null
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

  function toast(msg, type = "success") {
    let t = document.getElementById("crmToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "crmToast";
      t.className = "crm-toast";
      document.body.appendChild(t);
    }
    const icon = type === "success" ? "bi-check-circle-fill" : type === "error" ? "bi-exclamation-triangle-fill" : "bi-info-circle-fill";
    t.className = `crm-toast active ${type}`;
    t.innerHTML = `<i class="bi ${icon}"></i> <span>${esc(msg)}</span>`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      t.classList.remove("active");
    }, 3200);
  }

  // Load / Save State
  function loadData() {
    try {
      state.products = JSON.parse(localStorage.getItem(STORAGE.PRODUCTS)) || DEFAULT_PRODUCTS;
    } catch (e) {
      state.products = DEFAULT_PRODUCTS;
    }

    try {
      state.orders = JSON.parse(localStorage.getItem(STORAGE.ORDERS)) || DEFAULT_ORDERS;
    } catch (e) {
      state.orders = DEFAULT_ORDERS;
    }

    try {
      state.customers = JSON.parse(localStorage.getItem(STORAGE.CUSTOMERS)) || DEFAULT_CUSTOMERS;
    } catch (e) {
      state.customers = DEFAULT_CUSTOMERS;
    }

    try {
      state.inquiries = JSON.parse(localStorage.getItem(STORAGE.INQUIRIES)) || DEFAULT_INQUIRIES;
    } catch (e) {
      state.inquiries = DEFAULT_INQUIRIES;
    }

    try {
      state.settings = JSON.parse(localStorage.getItem(STORAGE.SETTINGS)) || DEFAULT_SETTINGS;
    } catch (e) {
      state.settings = DEFAULT_SETTINGS;
    }

    // Purge any legacy mock seed records from localStorage so the CRM starts completely clean
    const mockOrderIds = new Set(["BK-2026-94812", "BK-2026-88341", "BK-2026-72109", "BK-2026-61902", "BK-2026-50821"]);
    const mockCustomerIds = new Set(["PAT-1001", "PAT-1002", "PAT-1003", "PAT-1004", "PAT-1005", "PAT-1006"]);
    const mockInquiryIds = new Set(["INQ-301", "INQ-302", "INQ-303", "INQ-304"]);

    if (Array.isArray(state.orders)) {
      state.orders = state.orders.filter(o => o && !mockOrderIds.has(o.id));
      saveData(STORAGE.ORDERS, state.orders);
    }
    if (Array.isArray(state.customers)) {
      state.customers = state.customers.filter(c => c && !mockCustomerIds.has(c.id));
      saveData(STORAGE.CUSTOMERS, state.customers);
    }
    if (Array.isArray(state.inquiries)) {
      state.inquiries = state.inquiries.filter(i => i && !mockInquiryIds.has(i.id));
      saveData(STORAGE.INQUIRIES, state.inquiries);
    }

    // Ensure default malvani-masala is present if not already added
    if (Array.isArray(state.products) && !state.products.some(p => p && (p.id === "malvani-masala" || (p.name && p.name.toLowerCase() === "malvani masala")))) {
      state.products.unshift(DEFAULT_PRODUCTS[0]);
      saveData(STORAGE.PRODUCTS, state.products);
    }

    // Save initial defaults if missing
    if (!localStorage.getItem(STORAGE.PRODUCTS)) saveData(STORAGE.PRODUCTS, state.products);
    if (!localStorage.getItem(STORAGE.SETTINGS)) saveData(STORAGE.SETTINGS, state.settings);
  }

  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  // Sync products back to storefront `CAT` structure so cart, storefront pages and shop modals see the latest configured catalog
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

    // Toggle password visibility (hidden by default)
    const togglePassBtn = document.getElementById("togglePasswordBtn");
    if (togglePassBtn) {
      togglePassBtn.addEventListener("click", function () {
        const passInput = document.getElementById("authPass");
        const icon = togglePassBtn.querySelector("i");
        if (passInput.type === "password") {
          passInput.type = "text";
          icon.className = "bi bi-eye-fill";
          togglePassBtn.setAttribute("title", "Hide Password");
        } else {
          passInput.type = "password";
          icon.className = "bi bi-eye-slash-fill";
          togglePassBtn.setAttribute("title", "Show Password");
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

  // Navigation Tabs
  function initTabs() {
    const tabBtns = document.querySelectorAll("[data-crm-tab]");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tab = this.dataset.crmTab;
        switchTab(tab);
      });
    });
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll("[data-crm-tab]").forEach((b) => {
      b.classList.toggle("active", b.dataset.crmTab === tabName);
    });
    document.querySelectorAll(".crm-view").forEach((view) => {
      view.classList.toggle("active", view.id === `view-${tabName}`);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update Dynamic Counts on Nav Pills
  function updateNavBadges() {
    const pCount = document.getElementById("navCountProducts");
    if (pCount) pCount.textContent = state.products.length;

    const oCount = document.getElementById("navCountOrders");
    if (oCount) oCount.textContent = state.orders.length;

    const cCount = document.getElementById("navCountCustomers");
    if (cCount) cCount.textContent = state.customers.length;

    const iCount = document.getElementById("navCountInquiries");
    if (iCount) iCount.textContent = state.inquiries.length;
  }

  // ==========================================================================
  // RENDER: OVERVIEW / DASHBOARD
  // ==========================================================================
  function renderOverview() {
    const totalRev = state.orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? Number(o.total || 0) : 0), 0);
    const activeOrders = state.orders.filter((o) => o.status === "pending" || o.status === "processing" || o.status === "shipped").length;
    const pendingOrders = state.orders.filter((o) => o.status === "pending").length;
    const vipCount = state.customers.filter((c) => c.segment && c.segment.includes("VIP")).length;
    const newInquiries = state.inquiries.filter((i) => i.status === "New Lead").length;

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

    // Pipeline Pills
    const counts = {
      pending: state.orders.filter((o) => o.status === "pending").length,
      processing: state.orders.filter((o) => o.status === "processing").length,
      shipped: state.orders.filter((o) => o.status === "shipped").length,
      delivered: state.orders.filter((o) => o.status === "delivered").length
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
      `;
    }

    // Recent 5 Orders
    const recentTable = document.getElementById("overviewRecentOrdersTable");
    if (recentTable) {
      const recent = [...state.orders].reverse().slice(0, 5);
      if (!recent.length) {
        recentTable.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:36px 20px;color:var(--muted)"><i class="bi bi-inbox" style="font-size:24px;display:block;margin-bottom:8px;opacity:0.6"></i>No orders received yet.<br><small style="font-size:12px;opacity:0.8">New orders from your website storefront or WhatsApp checkout will appear here.</small></td></tr>`;
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
                <button class="action-icon-btn" title="View Order Slip" onclick="window.BK_CRM.viewOrderSlip('${esc(o.id)}')"><i class="bi bi-receipt"></i></button>
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
  // RENDER: PRODUCTS (CATALOG MANAGEMENT)
  // "all the products must be config"
  // ==========================================================================
  function renderProducts() {
    const listWrap = document.getElementById("productsTableBody");
    if (!listWrap) return;

    let items = [...state.products];

    // Search filter
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

    // Category filter
    if (state.filters.productCategory !== "all") {
      items = items.filter((p) => p.category === state.filters.productCategory);
    }

    // Stock filter
    if (state.filters.productStock !== "all") {
      items = items.filter((p) => p.status === state.filters.productStock);
    }

    if (!items.length) {
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No products match your filter criteria.</td></tr>`;
      return;
    }

    listWrap.innerHTML = items
      .map((p, index) => {
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
              <a class="action-icon-btn" title="Preview on Website" href="${(window.location.pathname.indexOf('/admin/') > -1 ? '../' : '') + ((p.slug && p.slug.endsWith('.html') && p.slug.indexOf('blended-') === -1) ? p.slug : ('product.html?id=' + encodeURIComponent(p.id)))}" target="_blank">
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
  // RENDER: ORDERS MANAGEMENT
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
          o.phone.includes(q) ||
          o.city.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (state.filters.orderStatus !== "all") {
      items = items.filter((o) => o.status === state.filters.orderStatus);
    }

    if (!items.length) {
      const msg = state.orders.length === 0
        ? `<i class="bi bi-inbox" style="font-size:32px;display:block;margin-bottom:10px;opacity:0.6"></i>No orders received yet.<br><small style="font-size:12px;opacity:0.8">Orders placed by customers on your website or WhatsApp cart will appear here automatically.</small>`
        : `No orders match your filter criteria.`;
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:44px 20px;color:var(--muted)">${msg}</td></tr>`;
      return;
    }

    listWrap.innerHTML = items
      .map((o) => {
        const itemSummary = o.items.map((i) => `${i.name}${i.size ? " (" + i.size + ")" : ""} x ${i.qty}`).join("<br>");

        return `
        <tr>
          <td>
            <b>${esc(o.id)}</b>
            <div style="font-size:11px;color:var(--muted)">${esc(o.date)}</div>
          </td>
          <td>
            <div><b>${esc(o.customer)}</b></div>
            <div style="font-size:11.5px;color:var(--muted)">
              <i class="bi bi-telephone"></i> ${esc(o.phone)}<br>
              <i class="bi bi-geo-alt"></i> ${esc(o.city)}
            </div>
          </td>
          <td style="font-size:12px;line-height:1.4">${itemSummary}</td>
          <td><b>${rs(o.total)}</b><div style="font-size:10.5px;color:var(--muted)">${esc(o.payment)}</div></td>
          <td>
            <select class="filter-select" style="font-size:12px;padding:4px 8px;" onchange="window.BK_CRM.updateOrderStatus('${esc(o.id)}', this.value)">
              <option value="pending" ${o.status === "pending" ? "selected" : ""}>New Order</option>
              <option value="processing" ${o.status === "processing" ? "selected" : ""}>In Packing</option>
              <option value="shipped" ${o.status === "shipped" ? "selected" : ""}>Dispatched</option>
              <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
              <option value="cancelled" ${o.status === "cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
          </td>
          <td>
            <div class="action-btns">
              <button class="btn-whatsapp" title="Send WhatsApp Update" onclick="window.BK_CRM.sendOrderWhatsApp('${esc(o.id)}')">
                <i class="bi bi-whatsapp"></i> Chat
              </button>
              <button class="action-icon-btn" title="View Print Slip" onclick="window.BK_CRM.viewOrderSlip('${esc(o.id)}')">
                <i class="bi bi-receipt"></i>
              </button>
              <button class="action-icon-btn delete" title="Cancel Order" onclick="window.BK_CRM.deleteOrder('${esc(o.id)}')">
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
          c.city.toLowerCase().includes(q) ||
          (c.segment && c.segment.toLowerCase().includes(q))
      );
    }

    if (state.filters.customerSegment !== "all") {
      items = items.filter((c) => c.segment === state.filters.customerSegment);
    }

    if (!items.length) {
      const msg = state.customers.length === 0
        ? `<i class="bi bi-people" style="font-size:32px;display:block;margin-bottom:10px;opacity:0.6"></i>No customer records yet.<br><small style="font-size:12px;opacity:0.8">Customer details and order histories will automatically appear here as purchases are made.</small>`
        : `No customers match your search query.`;
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:44px 20px;color:var(--muted)">${msg}</td></tr>`;
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
            <div style="font-size:11px;color:var(--muted)"><i class="bi bi-envelope"></i> ${esc(c.email)}</div>
          </td>
          <td>${esc(c.city)}</td>
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
          i.message.toLowerCase().includes(q) ||
          (i.type && i.type.toLowerCase().includes(q))
      );
    }

    if (state.filters.inquiryStatus !== "all") {
      items = items.filter((i) => i.status === state.filters.inquiryStatus);
    }

    if (!items.length) {
      const msg = state.inquiries.length === 0
        ? `<i class="bi bi-chat-left-text" style="font-size:32px;display:block;margin-bottom:10px;opacity:0.6"></i>No customer inquiries recorded yet.<br><small style="font-size:12px;opacity:0.8">Inquiries submitted via the Contact form or WhatsApp inquiries will be logged here.</small>`
        : `No inquiries match your filter criteria.`;
      listWrap.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:44px 20px;color:var(--muted)">${msg}</td></tr>`;
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
  // RENDER: SETTINGS
  // ==========================================================================
  function renderSettings() {
    const s = state.settings;
    const form = document.getElementById("crmSettingsForm");
    if (!form) return;

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

  // Master Render
  function renderAll() {
    updateNavBadges();
    renderOverview();
    renderProducts();
    renderOrders();
    renderCustomers();
    renderInquiries();
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
      // Update
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
      // Create new
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
    toast(`Stock status for "${p.name}" changed to ${p.status.toUpperCase()}`);
  }

  function deleteProduct(productId) {
    const p = state.products.find((x) => x.id === productId);
    if (!p) return;

    if (confirm(`Are you sure you want to delete "${p.name}" from the store catalog?`)) {
      state.products = state.products.filter((x) => x.id !== productId);
      syncCatalogToStorefront();
      renderProducts();
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
  // ORDER ACTIONS
  // ==========================================================================
  function updateOrderStatus(orderId, newStatus) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    order.status = newStatus;
    saveData(STORAGE.ORDERS, state.orders);
    renderOrders();
    renderOverview();
    toast(`Order ${order.id} status updated to ${newStatus.toUpperCase()}`);
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
            <h2 style="font-family:var(--font-head);font-size:18px;margin-bottom:4px;color:#271f1a">TAX INVOICE / PACKING SLIP</h2>
            <div style="font-size:13px;font-weight:700;color:#c8501e">${esc(order.id)}</div>
            <div style="font-size:11.5px;color:#7a6e65">Date: ${esc(order.date)}</div>
            <div style="font-size:11.5px;color:#7a6e65">Payment: <b>${esc(order.payment)}</b></div>
          </div>
        </div>

        <div class="inv-meta-grid">
          <div>
            <h4 style="font-size:11px;text-transform:uppercase;color:#7a6e65;margin-bottom:4px">Billed & Shipped To:</h4>
            <b style="font-size:14px">${esc(order.customer)}</b>
            <div>${esc(order.address)}</div>
            <div>Phone: ${esc(order.phone)}</div>
            <div>Email: ${esc(order.email)}</div>
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
          <div>GST (Inclusive): <b>Included</b></div>
          <div>Shipping & Delivery: <b style="color:#15803d">FREE</b></div>
          <div style="font-size:16px;border-top:1px solid #271f1a;padding-top:6px;margin-top:4px">Total Amount: <b style="color:#c8501e">${rs(order.total)}</b></div>
        </div>

        <div style="margin-top:24px;border-top:1px dashed #d3c4b7;padding-top:12px;font-size:11px;color:#7a6e65;text-align:center">
          Thank you for trusting Bhau Korde Masale! Handcrafted natural spices straight from Panvel.<br>
          For any questions, reach us on WhatsApp at (+91) 91678 34686.
        </div>
      </div>
    `;

    openModal("orderSlipModal");
  }

  function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to remove Order ${orderId}?`)) {
      state.orders = state.orders.filter((o) => o.id !== orderId);
      saveData(STORAGE.ORDERS, state.orders);
      renderOrders();
      renderOverview();
      toast(`Order ${orderId} removed.`);
    }
  }

  // ==========================================================================
  // CUSTOMER ACTIONS
  // ==========================================================================
  function sendCustomerWhatsApp(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formatted = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;
    const msg = `Namaste ${name} ji, greetings from Bhau Korde Masale (Panvel)! We have fresh batches of our handmade spice blends and pickles ready. Please let us know if you would like to place an order or need anything dispatched. - Bhau Korde Masale, Panvel.`;

    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }
  const sendCustomerConciergeWhatsApp = sendCustomerWhatsApp;

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

  // ==========================================================================
  // INQUIRY ACTIONS
  // ==========================================================================
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

  // ==========================================================================
  // CSV EXPORT UTILITIES (Same as Vastu Adda)
  // ==========================================================================
  function downloadCSV(filename, rows) {
    const processRow = function (row) {
      let finalVal = "";
      for (let j = 0; j < row.length; j++) {
        let innerValue = row[j] === null || row[j] === undefined ? "" : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        }
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
        if (j > 0) finalVal += ",";
        finalVal += result;
      }
      return finalVal + "\n";
    };

    let csvFile = "";
    for (let i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
    }

    const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
    const rows = [["Order ID", "Date", "Customer Name", "Phone", "Email", "City", "Payment Method", "Status", "Total Amount (INR)", "Items Summary"]];
    state.orders.forEach((o) => {
      const summary = o.items.map((i) => `${i.name} (${i.size}) x${i.qty}`).join(" | ");
      rows.push([o.id, o.date, o.customer, o.phone, o.email, o.city, o.payment, o.status, o.total, summary]);
    });
    downloadCSV("bhau_korde_orders_report.csv", rows);
  }

  function exportCustomersCSV() {
    const rows = [["Customer ID", "Customer Name", "Phone", "Email", "City", "Customer Type", "Total Orders", "Total Purchases (INR)", "Notes"]];
    state.customers.forEach((c) => {
      rows.push([c.id, c.name, c.phone, c.email, c.city, c.segment, c.ordersCount, c.lifetimeSpend, c.notes || ""]);
    });
    downloadCSV("bhau_korde_customers.csv", rows);
  }

  function exportInquiriesCSV() {
    const rows = [["Inquiry ID", "Date", "Inquirer Name", "Phone", "Email", "Inquiry Type", "Status", "Message Query"]];
    state.inquiries.forEach((i) => {
      rows.push([i.id, i.date, i.name, i.phone, i.email, i.type, i.status, i.message]);
    });
    downloadCSV("bhau_korde_inquiries.csv", rows);
  }

  // ==========================================================================
  // BACKUP & RESTORE JSON
  // ==========================================================================
  function exportFullBackupJSON() {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      storeName: state.settings.storeName,
      products: state.products,
      orders: state.orders,
      customers: state.customers,
      inquiries: state.inquiries,
      settings: state.settings
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bhau_korde_backup_${Date.now()}.json`;
    link.click();
    toast("Store backup downloaded successfully.");
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
        if (data.settings) state.settings = data.settings;

        saveData(STORAGE.PRODUCTS, state.products);
        saveData(STORAGE.ORDERS, state.orders);
        saveData(STORAGE.CUSTOMERS, state.customers);
        saveData(STORAGE.INQUIRIES, state.inquiries);
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
    if (confirm("Reset all 30 products to factory defaults? Your custom changes will be overwritten.")) {
      state.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
      saveData(STORAGE.PRODUCTS, state.products);
      renderAll();
      toast("Catalog restored to all 30 default spice products.");
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
    if (pSearch) {
      pSearch.addEventListener("input", (e) => {
        state.search.products = e.target.value;
        renderProducts();
      });
    }

    const oSearch = document.getElementById("searchOrdersInput");
    if (oSearch) {
      oSearch.addEventListener("input", (e) => {
        state.search.orders = e.target.value;
        renderOrders();
      });
    }

    const cSearch = document.getElementById("searchCustomersInput");
    if (cSearch) {
      cSearch.addEventListener("input", (e) => {
        state.search.customers = e.target.value;
        renderCustomers();
      });
    }

    const iSearch = document.getElementById("searchInquiriesInput");
    if (iSearch) {
      iSearch.addEventListener("input", (e) => {
        state.search.inquiries = e.target.value;
        renderInquiries();
      });
    }

    // Filters
    const pCatFilter = document.getElementById("filterProductCategory");
    if (pCatFilter) {
      pCatFilter.addEventListener("change", (e) => {
        state.filters.productCategory = e.target.value;
        renderProducts();
      });
    }

    const pStockFilter = document.getElementById("filterProductStock");
    if (pStockFilter) {
      pStockFilter.addEventListener("change", (e) => {
        state.filters.productStock = e.target.value;
        renderProducts();
      });
    }

    const oStatusFilter = document.getElementById("filterOrderStatus");
    if (oStatusFilter) {
      oStatusFilter.addEventListener("change", (e) => {
        state.filters.orderStatus = e.target.value;
        renderOrders();
      });
    }

    const cSegFilter = document.getElementById("filterCustomerSegment");
    if (cSegFilter) {
      cSegFilter.addEventListener("change", (e) => {
        state.filters.customerSegment = e.target.value;
        renderCustomers();
      });
    }

    const iStatusFilter = document.getElementById("filterInquiryStatus");
    if (iStatusFilter) {
      iStatusFilter.addEventListener("change", (e) => {
        state.filters.inquiryStatus = e.target.value;
        renderInquiries();
      });
    }

    // Modal background click to close
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active");
        }
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
    if (saveProdBtn) {
      saveProdBtn.addEventListener("click", saveProductForm);
    }

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

      // 1. Instant offline transliteration (0ms latency)
      prodNameMrInput.value = transliterateToMarathi(val);

      // 2. Debounced online enhancement (if browser is connected)
      if (!immediateOnly && typeof fetch === "function") {
        clearTimeout(marathiDebounceTimer);
        marathiDebounceTimer = setTimeout(async () => {
          if (state.userCustomizedMarathi) return;
          const currentEng = prodNameInput.value.trim();
          if (!currentEng) return;
          try {
            const url = `https://inputtools.google.com/request?text=${encodeURIComponent(currentEng)}&itc=mr-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
            const res = await fetch(url);
            if (!res.ok) return;
            const data = await res.json();
            if (data && data[0] === "SUCCESS" && data[1] && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
              const suggested = data[1][0][1][0];
              if (!state.userCustomizedMarathi && prodNameInput.value.trim() === currentEng) {
                prodNameMrInput.value = suggested;
              }
            }
          } catch (e) {
            // Keep local transliteration
          }
        }, 300);
      }
    }

    if (prodNameInput) {
      prodNameInput.addEventListener("input", function () {
        syncMarathiName(false);
      });
    }

    if (prodNameMrInput) {
      prodNameMrInput.addEventListener("input", function () {
        if (this.value.trim().length > 0) {
          state.userCustomizedMarathi = true;
        } else {
          // If cleared, re-enable auto-sync
          state.userCustomizedMarathi = false;
          syncMarathiName(true);
        }
      });
    }

    if (btnAutoMarathi) {
      btnAutoMarathi.addEventListener("click", function () {
        state.userCustomizedMarathi = false;
        syncMarathiName(false);
        if (prodNameMrInput && prodNameMrInput.value) {
          toast("Marathi title automatically updated!");
        }
      });
    }

    // File Upload Handler (Option to upload image from device)
    const fileInput = document.getElementById("prodFormImgFile");
    if (fileInput) {
      fileInput.addEventListener("change", function (e) {
        if (e.target.files && e.target.files[0]) {
          handleImageFile(e.target.files[0]);
        }
      });
    }

    const fileZone = document.getElementById("fileUploadZone");
    const btnSelectImg = document.getElementById("btnSelectImage");
    if (fileZone && fileInput) {
      fileZone.addEventListener("click", function (e) {
        if (e.target !== fileInput) {
          fileInput.click();
        }
      });
      fileZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        fileZone.classList.add("dragover");
      });
      fileZone.addEventListener("dragleave", function (e) {
        fileZone.classList.remove("dragover");
      });
      fileZone.addEventListener("drop", function (e) {
        e.preventDefault();
        fileZone.classList.remove("dragover");
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleImageFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Live image preview input
    const imgInput = document.getElementById("prodFormImg");
    if (imgInput) {
      imgInput.addEventListener("input", (e) => {
        updateImgPreview(e.target.value);
      });
    }

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

    // Backup restore input
    const importInput = document.getElementById("importBackupFile");
    if (importInput) {
      importInput.addEventListener("change", function (e) {
        if (e.target.files && e.target.files[0]) {
          importBackupJSON(e.target.files[0]);
        }
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
    deleteProduct,
    updateOrderStatus,
    sendOrderWhatsApp,
    viewOrderSlip,
    deleteOrder,
    filterOrders: function (st) {
      switchTab("orders");
      const sel = document.getElementById("filterOrderStatus");
      if (sel) sel.value = st;
      state.filters.orderStatus = st;
      renderOrders();
    },
    sendCustomerWhatsApp,
    sendCustomerConciergeWhatsApp,
    editCustomerNotes,
    updateInquiryStatus,
    replyInquiryWhatsApp,
    deleteInquiry,
    exportProductsCSV,
    exportOrdersCSV,
    exportCustomersCSV,
    exportInquiriesCSV,
    exportFullBackupJSON,
    resetToDefaultCatalog
  };
})();
