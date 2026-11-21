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

  // Default 30 Products (Configurable Catalog)
  const DEFAULT_PRODUCTS = [
    // 19 Blended Spices
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

  // Seed Orders
  const DEFAULT_ORDERS = [
    {
      id: "BK-2026-94812",
      date: "2026-11-20 14:22",
      customer: "Ganesh Patil",
      phone: "9820145890",
      email: "ganesh.patil@gmail.com",
      city: "Panvel",
      address: "B-204, Shreeram Residency, Old Panvel, Navi Mumbai 410206",
      payment: "Prepaid UPI",
      status: "delivered",
      total: 1115,
      items: [
        { id: "special-malvani-masala", name: "Special Malvani Masala", size: "500 g", qty: 1, price: 475 },
        { id: "special-bramhni-kala-god-masala", name: "Special Bramhni Kala Goda Masala", size: "200 g", qty: 2, price: 200 },
        { id: "aamba-lonche", name: "Aamba Lonche", size: "500 g", qty: 1, price: 240 }
      ]
    },
    {
      id: "BK-2026-88341",
      date: "2026-11-20 18:45",
      customer: "Sunita Deshmukh",
      phone: "9819234567",
      email: "sunita.d@rediffmail.com",
      city: "Kamothe",
      address: "Flat 401, Nilkanth Heights, Sector 7, Kamothe 410209",
      payment: "WhatsApp Order",
      status: "shipped",
      total: 690,
      items: [
        { id: "super-sunday-bhajlela-mix-masala", name: "Super Sunday Bhajlela Mix Masala", size: "500 g", qty: 1, price: 450 },
        { id: "special-kashmiri-chili-powder", name: "Special Kashmiri Chili Powder", size: "200 g", qty: 1, price: 240 }
      ]
    },
    {
      id: "BK-2026-72109",
      date: "2026-11-21 09:15",
      customer: "Rohit Chavan",
      phone: "9768541230",
      email: "rohit.chavan@yahoo.com",
      city: "Thane",
      address: "12, Vartak Nagar, Pokhran Road No 1, Thane West 400606",
      payment: "Cash on Delivery",
      status: "processing",
      total: 840,
      items: [
        { id: "darbari-sunday-mix-masala", name: "Darbari Sunday Mix Masala", size: "200 g", qty: 1, price: 190 },
        { id: "sagar-ratn-fish-masala", name: "Sagar Ratna Fish Masala", size: "200 g", qty: 2, price: 160 },
        { id: "suvrna-shudha-halad-powder", name: "Suvrna Shudha Halad Powder", size: "200 g", qty: 1, price: 200 },
        { id: "limbi-god-lonche", name: "Limbu Goad Lonche", size: "200 g", qty: 1, price: 130 }
      ]
    },
    {
      id: "BK-2026-61902",
      date: "2026-11-21 11:30",
      customer: "Anjali Joshi",
      phone: "9890123456",
      email: "anjali.joshi@gmail.com",
      city: "Pune",
      address: "Flat 14, Mayur Vihar, Kothrud, Pune 411038",
      payment: "Prepaid UPI",
      status: "pending",
      total: 450,
      items: [
        { id: "special-rajdrbari-garam-masala-2", name: "Special Rajdarbari Garam Masala", size: "500 g", qty: 1, price: 450 }
      ]
    },
    {
      id: "BK-2026-50821",
      date: "2026-11-21 13:05",
      customer: "Amit Sawant",
      phone: "9820556677",
      email: "amit.sawant@live.com",
      city: "Dombivli",
      address: "Shop 4, Tilak Chowk, Dombivli East 421201",
      payment: "Prepaid UPI",
      status: "pending",
      total: 920,
      items: [
        { id: "special-koli-aagri-masala", name: "Special Koli Aagri Masala", size: "500 g", qty: 1, price: 500 },
        { id: "misal-pav-masala", name: "Misal Pav Masala", size: "50 g", qty: 4, price: 180 },
        { id: "mix-lonche", name: "Mix Lonche", size: "500 g", qty: 1, price: 240 }
      ]
    }
  ];

  // Seed Customers / Patrons
  const DEFAULT_CUSTOMERS = [
    {
      id: "PAT-1001",
      name: "Rajeshwar Patil",
      phone: "9820145890",
      email: "rajeshwar.patil@gmail.com",
      city: "Panvel",
      segment: "VIP Patron",
      ordersCount: 8,
      lifetimeSpend: 6850,
      lastOrder: "2026-11-20",
      notes: "Prefers extra spicy Malvani & Kolhapuri mix. Owns family farm in Raigad."
    },
    {
      id: "PAT-1002",
      name: "Dr. Snehal Kulkarni",
      phone: "9819234567",
      email: "dr.snehal@vashihospital.org",
      city: "Vashi, Navi Mumbai",
      segment: "VIP Patron",
      ordersCount: 6,
      lifetimeSpend: 5400,
      lastOrder: "2026-11-18",
      notes: "Regular monthly buyer of Bramhni Kala Goda Masala and pure halad."
    },
    {
      id: "PAT-1003",
      name: "Meera Shinde",
      phone: "9768541230",
      email: "meera.shinde@rediffmail.com",
      city: "Thane",
      segment: "Loyal Buyer",
      ordersCount: 4,
      lifetimeSpend: 3240,
      lastOrder: "2026-11-15",
      notes: "Orders Aamba God Lonche in 1kg bulk buckets during festivals."
    },
    {
      id: "PAT-1004",
      name: "Amit Sawant",
      phone: "9820556677",
      email: "amit.sawant@live.com",
      city: "Dombivli",
      segment: "Loyal Buyer",
      ordersCount: 3,
      lifetimeSpend: 2150,
      lastOrder: "2026-11-21",
      notes: "Authentic Koli-Agri culinary fan. Orders for weekend family parties."
    },
    {
      id: "PAT-1005",
      name: "Kavita Parab",
      phone: "9920334411",
      email: "kavita.parab@gmail.com",
      city: "Alibaug",
      segment: "New Customer",
      ordersCount: 1,
      lifetimeSpend: 950,
      lastOrder: "2026-11-19",
      notes: "First order of Fish and Malvani masala. Praised the authentic aroma."
    },
    {
      id: "PAT-1006",
      name: "Sagar Gokhale",
      phone: "9890123456",
      email: "sagar.gokhale@gmail.com",
      city: "Pune",
      segment: "New Customer",
      ordersCount: 1,
      lifetimeSpend: 720,
      lastOrder: "2026-11-21",
      notes: "Placed order via WhatsApp online cart."
    }
  ];

  // Seed Inquiries
  const DEFAULT_INQUIRIES = [
    {
      id: "INQ-301",
      date: "2026-11-21 10:14",
      name: "Mahendra Traders (Pune)",
      phone: "9822012345",
      email: "mahendratraders.pune@gmail.com",
      type: "Distributorship",
      message: "We run a spice distribution network across Pune and PCMC with 150 retail touchpoints. Interested in carrying Bhau Korde blended spices catalog.",
      status: "In Discussion"
    },
    {
      id: "INQ-302",
      date: "2026-11-20 16:30",
      name: "Sai Catering Services",
      phone: "9867098765",
      email: "saicaterers.kalyan@yahoo.in",
      type: "Bulk Catering",
      message: "Need 25kg bulk packing of Special Malvani Masala & Super Sunday mix for 3 wedding functions in December.",
      status: "New Lead"
    },
    {
      id: "INQ-303",
      date: "2026-11-19 12:40",
      name: "Priya Varma",
      phone: "9988776655",
      email: "priya.varma@gmail.com",
      type: "Courier Order",
      message: "Do you courier pickles to Bangalore? Wanted 5 jars of Aamba Goad and Limbu Lonche for family.",
      status: "Converted"
    },
    {
      id: "INQ-304",
      date: "2026-11-18 11:20",
      name: "Hotel Swad Kolhapur",
      phone: "9766554433",
      email: "swadkolhapur@gmail.com",
      type: "Commercial B2B",
      message: "Commercial sample tasting and wholesale rate quotation required for Chicken Kolhapuri and Mutton mix masale.",
      status: "New Lead"
    }
  ];

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

    // Save initial defaults if missing
    if (!localStorage.getItem(STORAGE.PRODUCTS)) saveData(STORAGE.PRODUCTS, state.products);
    if (!localStorage.getItem(STORAGE.ORDERS)) saveData(STORAGE.ORDERS, state.orders);
    if (!localStorage.getItem(STORAGE.CUSTOMERS)) saveData(STORAGE.CUSTOMERS, state.customers);
    if (!localStorage.getItem(STORAGE.INQUIRIES)) saveData(STORAGE.INQUIRIES, state.inquiries);
    if (!localStorage.getItem(STORAGE.SETTINGS)) saveData(STORAGE.SETTINGS, state.settings);
  }

  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  // Sync products back to storefront `CAT` structure so cart and shop modals see the latest configured catalog
  function syncCatalogToStorefront() {
    saveData(STORAGE.PRODUCTS, state.products);
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
          toast(`Welcome back, ${user}! Staff CRM unlocked.`);
          renderAll();
        } else {
          toast("Invalid credentials. Try admin / bhau2026", "error");
        }
      });
    }

    const demoBtn = document.getElementById("quickDemoLogin");
    if (demoBtn) {
      demoBtn.addEventListener("click", function () {
        document.getElementById("authUser").value = "admin";
        document.getElementById("authPass").value = "bhau2026";
        document.getElementById("authForm").dispatchEvent(new Event("submit"));
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
          <i class="bi bi-hourglass-split"></i> Pending Consecration (${counts.pending})
        </div>
        <div class="pipeline-pill processing" onclick="window.BK_CRM.filterOrders('processing')">
          <i class="bi bi-box-seam"></i> Packed / Processing (${counts.processing})
        </div>
        <div class="pipeline-pill shipped" onclick="window.BK_CRM.filterOrders('shipped')">
          <i class="bi bi-truck"></i> In Transit (${counts.shipped})
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
        recentTable.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">No orders placed yet.</td></tr>`;
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
              <a class="action-icon-btn" title="Preview on Website" href="${esc(p.slug || 'product-darbari-sunday-mix-masala.html')}" target="_blank">
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
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No orders match your filter criteria.</td></tr>`;
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
              <option value="pending" ${o.status === "pending" ? "selected" : ""}>Pending Consecration</option>
              <option value="processing" ${o.status === "processing" ? "selected" : ""}>Packed / Processing</option>
              <option value="shipped" ${o.status === "shipped" ? "selected" : ""}>Shipped / In Transit</option>
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
  // RENDER: PATRON CRM (CUSTOMERS)
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
      listWrap.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--muted)">No patrons match your search query.</td></tr>`;
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
          <td><span class="status-badge ${segClass}">${esc(c.segment || "Patron")}</span></td>
          <td><b>${c.ordersCount || 1}</b> orders</td>
          <td><b style="color:var(--accent)">${rs(c.lifetimeSpend)}</b></td>
          <td>
            <div class="action-btns">
              <button class="btn-whatsapp" title="VIP Concierge WhatsApp" onclick="window.BK_CRM.sendCustomerConciergeWhatsApp('${esc(c.phone)}', '${esc(c.name)}')">
                <i class="bi bi-whatsapp"></i> Concierge
              </button>
              <button class="action-icon-btn" title="Edit Patron Notes" onclick="window.BK_CRM.editCustomerNotes('${esc(c.id)}')">
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
      listWrap.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:36px;color:var(--muted)">No inquiries recorded yet.</td></tr>`;
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
  // PRODUCT ACTIONS (CRUD & CONFIG)
  // ==========================================================================
  function openAddProductModal() {
    state.editingProduct = null;
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

    updateImgPreview("images/Chiken Lollypop Ready Mix.png");
    openModal("productModal");
  }

  function openEditProductModal(productId) {
    const p = state.products.find((x) => x.id === productId);
    if (!p) return;

    state.editingProduct = p;
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
        slug: "blended-spices.html",
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
  // PATRON CRM ACTIONS
  // ==========================================================================
  function sendCustomerConciergeWhatsApp(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formatted = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;
    const msg = `Namaste ${name}! 🌿\n\nGreetings from *Bhau Korde Masale* (Panvel).\n\nAs one of our cherished patrons, we wanted to share our fresh seasonal batches of Malvani, Kolhapuri, and homemade Aamba & Limbu Lonche.\n\nLet us know if you would like your favorite spice blends prepared and dispatched directly to your doorstep!\n\n_चवीने खाणार त्याला भाऊ देणार._`;

    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function editCustomerNotes(customerId) {
    const c = state.customers.find((x) => x.id === customerId);
    if (!c) return;

    const newNotes = prompt(`Enter CRM Staff Notes for ${c.name}:`, c.notes || "");
    if (newNotes !== null) {
      c.notes = newNotes;
      saveData(STORAGE.CUSTOMERS, state.customers);
      renderCustomers();
      toast("Patron CRM notes saved.");
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
    const rows = [["Patron ID", "Full Name", "Phone", "Email", "City", "CRM Segment", "Total Orders", "Lifetime Spend (INR)", "Notes"]];
    state.customers.forEach((c) => {
      rows.push([c.id, c.name, c.phone, c.email, c.city, c.segment, c.ordersCount, c.lifetimeSpend, c.notes || ""]);
    });
    downloadCSV("bhau_korde_patrons_crm.csv", rows);
  }

  function exportInquiriesCSV() {
    const rows = [["Inquiry ID", "Date", "Inquirer Name", "Phone", "Email", "Inquiry Type", "Status", "Message Query"]];
    state.inquiries.forEach((i) => {
      rows.push([i.id, i.date, i.name, i.phone, i.email, i.type, i.status, i.message]);
    });
    downloadCSV("bhau_korde_inquiries_leads.csv", rows);
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
    link.download = `bhau_korde_crm_backup_${Date.now()}.json`;
    link.click();
    toast("Full CRM database backup downloaded!");
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
