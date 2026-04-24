export type Lang = 'en' | 'te' | 'hi' | 'ta' | 'kn';

export interface Translations {
  // Nav
  nav_home: string;
  nav_collections: string;
  nav_about: string;
  nav_contact: string;
  nav_admin: string;
  nav_search_placeholder: string;

  // Hero
  hero_eyebrow: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_cart_btn: string;

  // Categories section
  cat_section_eyebrow: string;
  cat_section_title: string;
  cat_section_sub: string;
  cat_pieces: string;
  cat_rings: string;
  cat_bracelets: string;
  cat_chains: string;
  cat_dollars: string;
  cat_necklaces: string;
  cat_bangles: string;
  cat_earrings: string;
  cat_pendants: string;
  cat_mallas: string;
  cat_desc_rings: string;
  cat_desc_bracelets: string;
  cat_desc_chains: string;
  cat_desc_dollars: string;
  cat_desc_necklaces: string;
  cat_desc_bangles: string;
  cat_desc_earrings: string;
  cat_desc_pendants: string;
  cat_desc_mallas: string;

  // Products
  prod_section_eyebrow: string;
  prod_available: string;
  prod_all: string;
  prod_view_all: string;
  prod_no_results: string;
  prod_no_results_sub: string;
  prod_coming_soon: string;
  prod_coming_soon_sub: string;
  prod_add_cart: string;
  prod_add_more: string;
  prod_added: string;
  prod_details: string;
  prod_in_cart: string;
  prod_save: string;
  prod_premium_quality: string;
  prod_buy_whatsapp: string;
  prod_or_cart: string;
  prod_view_details: string;
  prod_off: string;
  prod_you_save: string;

  // Cart
  cart_title: string;
  cart_empty: string;
  cart_empty_sub: string;
  cart_browse: string;
  cart_items: string;
  cart_item: string;
  cart_subtotal: string;
  cart_savings: string;
  cart_total: string;
  cart_shipping: string;
  cart_confirm_order: string;
  cart_clear: string;

  // Checkout
  checkout_title: string;
  checkout_sub: string;
  checkout_order_summary: string;
  checkout_your_details: string;
  checkout_name: string;
  checkout_phone: string;
  checkout_email: string;
  checkout_address: string;
  checkout_city: string;
  checkout_pincode: string;
  checkout_notes: string;
  checkout_name_ph: string;
  checkout_phone_ph: string;
  checkout_email_ph: string;
  checkout_address_ph: string;
  checkout_city_ph: string;
  checkout_pincode_ph: string;
  checkout_notes_ph: string;
  checkout_whatsapp_note: string;
  checkout_cancel: string;
  checkout_confirm_btn: string;
  checkout_err_name: string;
  checkout_err_phone: string;
  checkout_err_address: string;
  checkout_err_city: string;
  checkout_err_pincode: string;

  // Order confirmed
  order_confirmed_title: string;
  order_confirmed_msg: string;
  order_confirmed_sub: string;
  order_confirmed_wa: string;
  order_continue: string;

  // About
  about_since: string;
  about_title_label: string;

  // Home page
  home_eyebrow: string;
  home_tagline: string;
  home_sub: string;
  home_shop: string;
  home_shop_desc: string;
  home_shop_cta: string;
  home_admin: string;
  home_admin_desc: string;
  home_admin_cta: string;
  home_footer: string;

  // Login
  login_title: string;
  login_sub: string;
  login_portal: string;
  login_username: string;
  login_password: string;
  login_email: string;
  login_token: string;
  login_demo: string;
  login_btn: string;
  login_loading: string;
  login_error: string;
  login_back: string;

  // Admin
  admin_products: string;
  admin_about: string;
  admin_logout: string;
  admin_add_product: string;
  admin_total: string;
  admin_live: string;
  admin_discounted: string;
  admin_catalogue: string;
  admin_shown: string;
  admin_no_products: string;
  admin_no_products_sub: string;
  admin_edit: string;
  admin_save: string;
  admin_cancel: string;
  admin_product_title: string;
  admin_category: string;
  admin_pricing: string;
  admin_orig_price: string;
  admin_discount_pct: string;
  admin_final_price: string;
  admin_auto_calc: string;
  admin_saving_msg: string;
  admin_description: string;
  admin_media: string;
  admin_media_sub: string;
  admin_media_formats: string;
  admin_visibility: string;
  admin_visible: string;
  admin_hidden: string;
  admin_add_btn: string;
  admin_save_btn: string;
  admin_about_title: string;
  admin_about_sub: string;
  admin_brand_title: string;
  admin_founded: string;
  admin_story: string;
  admin_mission: string;
  admin_cover_img: string;
  admin_save_about: string;
  admin_saved_about: string;

  // Footer
  footer_tagline: string;
  footer_whatsapp: string;
  footer_rights: string;

  // Theme / Language
  lang_label: string;
  theme_light: string;
  theme_dark: string;

  // Index signature to allow dynamic hyphenated keys like 'cat_pooja-items'
  [key: string]: string;
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav_home: 'Home', nav_collections: 'Collections', nav_about: 'About', nav_contact: 'Contact', nav_admin: 'Admin',
    nav_search_placeholder: 'Search jewellery...',
    hero_eyebrow: 'Exclusively Crafted', hero_title_line1: 'Elegance in', hero_title_line2: 'Every Element',
    hero_subtitle: 'Where beauty begins with a smile, shines through every detail, and lives on in every precious moment.',
    hero_cta: 'Explore Collection', hero_cart_btn: 'Cart',
    cat_section_eyebrow: 'Browse by Category', cat_section_title: 'Our Collections',
    cat_section_sub: 'Explore a range of jewellery across categories', cat_pieces: 'pieces',
    cat_rings: 'Rings', cat_bracelets: 'Bracelets', cat_chains: 'Chains', cat_dollars: 'Dollars',
    cat_necklaces: 'Necklaces', cat_bangles: 'Bangles', cat_earrings: 'Earrings', cat_pendants: 'Pendants',
    cat_mallas: 'Mallas',
    'cat_pooja-items': 'Pooja Items',
    'cat_gem-stones': 'Gem Stones',
    cat_desc_rings: 'Symbol of love', cat_desc_bracelets: 'Wrist candy', cat_desc_chains: 'Classic chains',
    cat_desc_dollars: 'Bold pendants', cat_desc_necklaces: 'Exquisite neckwear', cat_desc_bangles: 'Timeless elegance',
    cat_desc_earrings: 'Frame your face', cat_desc_pendants: 'Statement pieces',
    cat_desc_mallas: 'Sacred floral garlands',
    'cat_desc_pooja-items': 'Divine worship essentials',
    'cat_desc_gem-stones': 'Precious & healing stones',
    prod_section_eyebrow: 'Full Collection', prod_available: 'available',
    prod_all: 'All Jewellery', prod_view_all: 'View All',
    prod_no_results: 'No results found', prod_no_results_sub: 'Try a different search term',
    prod_coming_soon: 'Coming soon...', prod_coming_soon_sub: 'New pieces being added',
    prod_add_cart: 'Add to Cart', prod_add_more: 'Add More', prod_added: 'Added!',
    prod_details: 'Details', prod_in_cart: 'In Cart', prod_save: 'Save',
    prod_premium_quality: 'Premium Quality', prod_buy_whatsapp: 'Buy Now via WhatsApp',
    prod_or_cart: 'Or add to cart to order multiple pieces together',
    prod_view_details: 'View Details', prod_off: '% OFF', prod_you_save: 'You save',
    cart_title: 'My Cart', cart_empty: 'Cart is empty', cart_empty_sub: 'Discover our exquisite collection',
    cart_browse: 'Browse Collection', cart_items: 'items', cart_item: 'item',
    cart_subtotal: 'Subtotal', cart_savings: 'Total Savings', cart_total: 'Total',
    cart_shipping: 'To be confirmed', cart_confirm_order: 'Confirm Order', cart_clear: 'Clear Cart',
    checkout_title: 'Confirm Your Order', checkout_sub: 'Fill in your details to complete the order',
    checkout_order_summary: 'Order Summary', checkout_your_details: 'Your Details',
    checkout_name: 'Full Name *', checkout_phone: 'Phone Number *', checkout_email: 'Email (optional)',
    checkout_address: 'Full Address *', checkout_city: 'City *', checkout_pincode: 'Pincode *', checkout_notes: 'Special Notes (optional)',
    checkout_name_ph: 'e.g. Priya Sharma', checkout_phone_ph: '10-digit mobile',
    checkout_email_ph: 'you@email.com', checkout_address_ph: 'House No., Street, Area...',
    checkout_city_ph: 'e.g. Hyderabad', checkout_pincode_ph: '6-digit pincode', checkout_notes_ph: 'Any special requests...',
    checkout_whatsapp_note: 'Your order details will be sent to us via WhatsApp for confirmation.',
    checkout_cancel: 'Cancel', checkout_confirm_btn: 'Confirm Order via WhatsApp',
    checkout_err_name: 'Name is required', checkout_err_phone: 'Valid 10-digit phone required',
    checkout_err_address: 'Address is required', checkout_err_city: 'City is required', checkout_err_pincode: 'Valid 6-digit pincode required',
    order_confirmed_title: 'Order Confirmed!',
    order_confirmed_msg: 'Thank you for your order! Your details have been sent to us via WhatsApp.',
    order_confirmed_sub: 'Our team will contact you shortly to confirm your order and arrange delivery.',
    order_confirmed_wa: 'WhatsApp message sent to', order_continue: 'Continue Shopping',
    about_since: 'Since', about_title_label: 'Our Story',
    home_eyebrow: 'Est. 2004 · Fine Jewellery', home_tagline: 'Elegance in Every Element',
    home_sub: 'Where beauty begins with a smile, shines through every detail, and lives on in every precious moment.',
    home_shop: 'Shop', home_shop_desc: 'Discover our collection', home_shop_cta: 'Enter Store →',
    home_admin: 'Admin', home_admin_desc: 'Manage catalogue', home_admin_cta: 'Dashboard →',
    home_footer: 'FINE JEWELLERY · HANDCRAFTED WITH DEVOTION',
    login_title: 'KUBERA RATNA', login_sub: 'Fine Jewellery', login_portal: 'Admin Portal',
    login_username: 'Username', login_password: 'Password', login_demo: 'Demo:', login_email: 'Email', login_token: 'Token',
    login_btn: 'Enter Dashboard', login_loading: 'Authenticating...', login_error: 'Invalid credentials. Please try again.',
    login_back: '← Back to Home',
    admin_products: 'Products', admin_about: 'About Us', admin_logout: 'Logout',
    admin_add_product: 'Add Product', admin_total: 'Total', admin_live: 'Live', admin_discounted: 'Discounted',
    admin_catalogue: 'Product Catalogue', admin_shown: 'products shown',
    admin_no_products: 'No products yet', admin_no_products_sub: 'Add your first product above',
    admin_edit: 'Edit', admin_save: 'Save', admin_cancel: 'Cancel',
    admin_product_title: 'Product Title *', admin_category: 'Category *',
    admin_pricing: 'Pricing & Discount', admin_orig_price: 'Original Price (₹) *',
    admin_discount_pct: 'Discount % (optional)', admin_final_price: 'Final Price (₹) *',
    admin_auto_calc: '← auto-calculated from discount',
    admin_saving_msg: 'Saving', admin_description: 'Description', admin_media: 'Media (Images & Videos)',
    admin_media_sub: 'Click to upload images or videos', admin_media_formats: 'JPG, PNG, WebP, MP4 supported',
    admin_visibility: 'Visible to customers', admin_visible: 'Product appears in store', admin_hidden: 'Hidden from store',
    admin_add_btn: 'Add Product', admin_save_btn: 'Save Changes',
    admin_about_title: 'About Us', admin_about_sub: 'This information will be visible to customers in the store',
    admin_brand_title: 'Brand Title', admin_founded: 'Founded Year', admin_story: 'Brand Story / Description',
    admin_mission: 'Our Mission', admin_cover_img: 'Cover Image URL', admin_save_about: 'Save About Us', admin_saved_about: 'Saved Successfully! ✓',
    footer_tagline: 'Fine Jewellery · Handcrafted with Love', footer_whatsapp: 'WhatsApp:', footer_rights: '© 2024 KUBERA RATNA Fine Jewellery. All rights reserved.',
    lang_label: 'Language', theme_light: 'Light', theme_dark: 'Dark',
  },

  te: {
    nav_home: 'హోమ్', nav_collections: 'సంగ్రహాలు', nav_about: 'మా గురించి', nav_contact: 'సంప్రదించండి', nav_admin: 'అడ్మిన్',
    nav_search_placeholder: 'ఆభరణాలు వెతకండి...',
    hero_eyebrow: 'ప్రత్యేకంగా తయారైనది', hero_title_line1: 'ప్రతి అంశంలో', hero_title_line2: 'సొగసు',
    hero_subtitle: 'అందం చిరునవ్వుతో మొదలై, ప్రతి వివరంలో మెరిసి, ప్రతి అమూల్య క్షణంలో జీవిస్తుంది.',
    hero_cta: 'సంగ్రహం చూడండి', hero_cart_btn: 'కార్ట్',
    cat_section_eyebrow: 'వర్గం ద్వారా వెతకండి', cat_section_title: 'మా సంగ్రహాలు',
    cat_section_sub: 'వివిధ వర్గాలలో ఆభరణాల పరిధిని అన్వేషించండి', cat_pieces: 'ముక్కలు',
    cat_rings: 'ఉంగరాలు', cat_bracelets: 'మణికట్టు దండలు', cat_chains: 'గొలుసులు', cat_dollars: 'పెండెంట్లు',
    cat_necklaces: 'హారాలు', cat_bangles: 'గాజులు', cat_earrings: 'చెవి దిద్దులు', cat_pendants: 'లాకెట్లు',
    cat_mallas: 'మాలలు',
    'cat_pooja-items': 'పూజా సామగ్రి',
    'cat_gem-stones': 'రత్నాలు',
    cat_desc_rings: 'ప్రేమ చిహ్నం', cat_desc_bracelets: 'మణికట్టు అలంకారం', cat_desc_chains: 'క్లాసిక్ గొలుసులు',
    cat_desc_dollars: 'సాహసంగా', cat_desc_necklaces: 'అద్భుతమైన హారాలు', cat_desc_bangles: 'శాశ్వతమైన సొగసు',
    cat_desc_earrings: 'ముఖ అలంకారం', cat_desc_pendants: 'ప్రత్యేక ముక్కలు',
    cat_desc_mallas: 'పవిత్రమైన పుష్పమాలలు',
    'cat_desc_pooja-items': 'దైవ పూజా అవసరాలు',
    'cat_desc_gem-stones': 'విలువైన & నయం చేసే రాళ్ళు',
    prod_section_eyebrow: 'పూర్తి సంగ్రహం', prod_available: 'అందుబాటులో',
    prod_all: 'అన్ని ఆభరణాలు', prod_view_all: 'అన్నీ చూడండి',
    prod_no_results: 'ఫలితాలు లేవు', prod_no_results_sub: 'వేరే పదం వెతకండి',
    prod_coming_soon: 'త్వరలో వస్తుంది...', prod_coming_soon_sub: 'కొత్త ముక్కలు జోడించబడుతున్నాయి',
    prod_add_cart: 'కార్ట్‌కు జోడించండి', prod_add_more: 'మరిన్ని జోడించండి', prod_added: 'జోడించబడింది!',
    prod_details: 'వివరాలు', prod_in_cart: 'కార్ట్‌లో ఉంది', prod_save: 'ఆదా',
    prod_premium_quality: 'ప్రీమియం నాణ్యత', prod_buy_whatsapp: 'వాట్సాప్ ద్వారా కొనండి',
    prod_or_cart: 'లేదా కార్ట్‌కు జోడించి అనేక ముక్కలు ఒకేసారి ఆర్డర్ చేయండి',
    prod_view_details: 'వివరాలు చూడండి', prod_off: '% తగ్గింపు', prod_you_save: 'మీరు ఆదా చేస్తారు',
    cart_title: 'నా కార్ట్', cart_empty: 'కార్ట్ ఖాళీగా ఉంది', cart_empty_sub: 'మా అద్భుతమైన సంగ్రహాన్ని కనుగొనండి',
    cart_browse: 'సంగ్రహం చూడండి', cart_items: 'వస్తువులు', cart_item: 'వస్తువు',
    cart_subtotal: 'సబ్‌టోటల్', cart_savings: 'మొత్తం ఆదా', cart_total: 'మొత్తం',
    cart_shipping: 'నిర్ధారించబడుతుంది', cart_confirm_order: 'ఆర్డర్ నిర్ధారించండి', cart_clear: 'కార్ట్ క్లియర్ చేయండి',
    checkout_title: 'మీ ఆర్డర్ నిర్ధారించండి', checkout_sub: 'ఆర్డర్ పూర్తి చేయడానికి మీ వివరాలు నమోదు చేయండి',
    checkout_order_summary: 'ఆర్డర్ సారాంశం', checkout_your_details: 'మీ వివరాలు',
    checkout_name: 'పూర్తి పేరు *', checkout_phone: 'ఫోన్ నంబర్ *', checkout_email: 'ఇమెయిల్ (ఐచ్ఛికం)',
    checkout_address: 'పూర్తి చిరునామా *', checkout_city: 'నగరం *', checkout_pincode: 'పిన్‌కోడ్ *', checkout_notes: 'ప్రత్యేక గమనికలు (ఐచ్ఛికం)',
    checkout_name_ph: 'ఉదా. ప్రియ శర్మ', checkout_phone_ph: '10 అంకెల మొబైల్',
    checkout_email_ph: 'you@email.com', checkout_address_ph: 'ఇంటి నంబర్, వీధి, ప్రాంతం...',
    checkout_city_ph: 'ఉదా. హైదరాబాద్', checkout_pincode_ph: '6 అంకెల పిన్‌కోడ్', checkout_notes_ph: 'ఏదైనా ప్రత్యేక అభ్యర్థనలు...',
    checkout_whatsapp_note: 'మీ ఆర్డర్ వివరాలు నిర్ధారణ కోసం వాట్సాప్ ద్వారా మాకు పంపబడతాయి.',
    checkout_cancel: 'రద్దు చేయండి', checkout_confirm_btn: 'వాట్సాప్ ద్వారా ఆర్డర్ నిర్ధారించండి',
    checkout_err_name: 'పేరు అవసరం', checkout_err_phone: 'చెల్లుబాటు అయ్యే 10 అంకెల ఫోన్ అవసరం',
    checkout_err_address: 'చిరునామా అవసరం', checkout_err_city: 'నగరం అవసరం', checkout_err_pincode: 'చెల్లుబాటు అయ్యే 6 అంకెల పిన్‌కోడ్ అవసరం',
    order_confirmed_title: 'ఆర్డర్ నిర్ధారించబడింది!',
    order_confirmed_msg: 'మీ ఆర్డర్‌కు ధన్యవాదాలు! మీ వివరాలు వాట్సాప్ ద్వారా మాకు పంపబడ్డాయి.',
    order_confirmed_sub: 'మీ ఆర్డర్ నిర్ధారించడానికి మా బృందం త్వరలో మిమ్మల్ని సంప్రదిస్తుంది.',
    order_confirmed_wa: 'వాట్సాప్ సందేశం పంపబడింది', order_continue: 'షాపింగ్ కొనసాగించండి',
    about_since: 'నుండి', about_title_label: 'మా కథ',
    home_eyebrow: 'స్థాపించబడింది 2004 · ఉన్నత ఆభరణాలు', home_tagline: 'ప్రతి అంశంలో సొగసు',
    home_sub: 'అందం చిరునవ్వుతో మొదలై, ప్రతి వివరంలో మెరిసి, ప్రతి అమూల్య క్షణంలో జీవిస్తుంది.',
    home_shop: 'షాప్', home_shop_desc: 'మా సంగ్రహాన్ని కనుగొనండి', home_shop_cta: 'స్టోర్‌లోకి →',
    home_admin: 'అడ్మిన్', home_admin_desc: 'కేటలాగ్ నిర్వహించండి', home_admin_cta: 'డాష్‌బోర్డ్ →',
    home_footer: 'ఉన్నత ఆభరణాలు · భక్తితో చేతితో తయారు చేయబడింది',
    login_title: 'KUBERA RATNA', login_sub: 'ఉన్నత ఆభరణాలు', login_portal: 'అడ్మిన్ పోర్టల్',
    login_username: 'వినియోగదారు పేరు', login_password: 'పాస్‌వర్డ్', login_demo: 'డెమో:', login_email: 'ఇమెయిల్', login_token: 'టోకెన్',
    login_btn: 'డాష్‌బోర్డ్‌లోకి', login_loading: 'ప్రమాణీకరిస్తోంది...', login_error: 'తప్పు ప్రమాణాలు. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    login_back: '← హోమ్‌కు తిరిగి వెళ్ళండి',
    admin_products: 'ఉత్పత్తులు', admin_about: 'మా గురించి', admin_logout: 'లాగ్ అవుట్',
    admin_add_product: 'ఉత్పత్తి జోడించండి', admin_total: 'మొత్తం', admin_live: 'లైవ్', admin_discounted: 'తగ్గింపు',
    admin_catalogue: 'ఉత్పత్తి కేటలాగ్', admin_shown: 'ఉత్పత్తులు చూపబడుతున్నాయి',
    admin_no_products: 'ఇంకా ఉత్పత్తులు లేవు', admin_no_products_sub: 'పైన మీ మొదటి ఉత్పత్తి జోడించండి',
    admin_edit: 'సవరించు', admin_save: 'సేవ్ చేయి', admin_cancel: 'రద్దు',
    admin_product_title: 'ఉత్పత్తి శీర్షిక *', admin_category: 'వర్గం *',
    admin_pricing: 'ధర & తగ్గింపు', admin_orig_price: 'అసలు ధర (₹) *',
    admin_discount_pct: 'తగ్గింపు % (ఐచ్ఛికం)', admin_final_price: 'చివరి ధర (₹) *',
    admin_auto_calc: '← తగ్గింపు నుండి స్వయంచాలకంగా లెక్కించబడింది',
    admin_saving_msg: 'ఆదా', admin_description: 'వివరణ', admin_media: 'మీడియా (చిత్రాలు & వీడియోలు)',
    admin_media_sub: 'చిత్రాలు లేదా వీడియోలు అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి', admin_media_formats: 'JPG, PNG, WebP, MP4 మద్దతు ఉంది',
    admin_visibility: 'కస్టమర్లకు కనిపిస్తుంది', admin_visible: 'ఉత్పత్తి స్టోర్‌లో కనిపిస్తుంది', admin_hidden: 'స్టోర్ నుండి దాచబడింది',
    admin_add_btn: 'ఉత్పత్తి జోడించండి', admin_save_btn: 'మార్పులు సేవ్ చేయండి',
    admin_about_title: 'మా గురించి', admin_about_sub: 'ఈ సమాచారం స్టోర్‌లో కస్టమర్లకు కనిపిస్తుంది',
    admin_brand_title: 'బ్రాండ్ శీర్షిక', admin_founded: 'స్థాపన సంవత్సరం', admin_story: 'బ్రాండ్ కథ / వివరణ',
    admin_mission: 'మా లక్ష్యం', admin_cover_img: 'కవర్ చిత్రం URL', admin_save_about: 'మా గురించి సేవ్ చేయండి', admin_saved_about: 'విజయవంతంగా సేవ్ చేయబడింది! ✓',
    footer_tagline: 'ఉన్నత ఆభరణాలు · ప్రేమతో చేతితో తయారు చేయబడింది', footer_whatsapp: 'వాట్సాప్:', footer_rights: '© 2024 KUBERA RATNA ఉన్నత ఆభరణాలు. అన్ని హక్కులు రక్షించబడ్డాయి.',
    lang_label: 'భాష', theme_light: 'లైట్', theme_dark: 'డార్క్',
  },

  hi: {
    nav_home: 'होम', nav_collections: 'संग्रह', nav_about: 'हमारे बारे में', nav_contact: 'संपर्क', nav_admin: 'एडमिन',
    nav_search_placeholder: 'आभूषण खोजें...',
    hero_eyebrow: 'विशेष रूप से निर्मित', hero_title_line1: 'हर तत्व में', hero_title_line2: 'सौंदर्य',
    hero_subtitle: 'जहाँ सुंदरता मुस्कान से शुरू होती है, हर विवरण में चमकती है, और हर अनमोल पल में जीती है।',
    hero_cta: 'संग्रह देखें', hero_cart_btn: 'कार्ट',
    cat_section_eyebrow: 'श्रेणी के अनुसार खोजें', cat_section_title: 'हमारे संग्रह',
    cat_section_sub: 'विभिन्न श्रेणियों में आभूषणों की श्रृंखला खोजें', cat_pieces: 'टुकड़े',
    cat_rings: 'अंगूठियाँ', cat_bracelets: 'कंगन', cat_chains: 'चेन', cat_dollars: 'पेंडेंट',
    cat_necklaces: 'हार', cat_bangles: 'चूड़ियाँ', cat_earrings: 'झुमके', cat_pendants: 'लॉकेट',
    cat_mallas: 'मालाएँ',
    'cat_pooja-items': 'पूजा सामग्री',
    'cat_gem-stones': 'रत्न पत्थर',
    cat_desc_rings: 'प्रेम का प्रतीक', cat_desc_bracelets: 'कलाई की शोभा', cat_desc_chains: 'क्लासिक चेन',
    cat_desc_dollars: 'साहसी अंदाज', cat_desc_necklaces: 'सुंदर हार', cat_desc_bangles: 'शाश्वत सौंदर्य',
    cat_desc_earrings: 'चेहरे की रौनक', cat_desc_pendants: 'खास टुकड़े',
    cat_desc_mallas: 'पवित्र पुष्पमालाएँ',
    'cat_desc_pooja-items': 'दैवीय पूजा आवश्यकताएँ',
    'cat_desc_gem-stones': 'कीमती और उपचारकारी पत्थर',
    prod_section_eyebrow: 'पूर्ण संग्रह', prod_available: 'उपलब्ध',
    prod_all: 'सभी आभूषण', prod_view_all: 'सभी देखें',
    prod_no_results: 'कोई परिणाम नहीं', prod_no_results_sub: 'दूसरा शब्द आज़माएँ',
    prod_coming_soon: 'जल्द आ रहा है...', prod_coming_soon_sub: 'नए टुकड़े जोड़े जा रहे हैं',
    prod_add_cart: 'कार्ट में जोड़ें', prod_add_more: 'और जोड़ें', prod_added: 'जोड़ा गया!',
    prod_details: 'विवरण', prod_in_cart: 'कार्ट में है', prod_save: 'बचत',
    prod_premium_quality: 'प्रीमियम गुणवत्ता', prod_buy_whatsapp: 'व्हाट्सएप पर खरीदें',
    prod_or_cart: 'या कई टुकड़े एक साथ ऑर्डर करने के लिए कार्ट में जोड़ें',
    prod_view_details: 'विवरण देखें', prod_off: '% छूट', prod_you_save: 'आप बचाते हैं',
    cart_title: 'मेरा कार्ट', cart_empty: 'कार्ट खाली है', cart_empty_sub: 'हमारे अनमोल संग्रह को खोजें',
    cart_browse: 'संग्रह देखें', cart_items: 'वस्तुएं', cart_item: 'वस्तु',
    cart_subtotal: 'उप-योग', cart_savings: 'कुल बचत', cart_total: 'कुल',
    cart_shipping: 'पुष्टि होगी', cart_confirm_order: 'ऑर्डर पुष्टि करें', cart_clear: 'कार्ट साफ़ करें',
    checkout_title: 'अपना ऑर्डर पुष्टि करें', checkout_sub: 'ऑर्डर पूरा करने के लिए अपना विवरण भरें',
    checkout_order_summary: 'ऑर्डर सारांश', checkout_your_details: 'आपका विवरण',
    checkout_name: 'पूरा नाम *', checkout_phone: 'फ़ोन नंबर *', checkout_email: 'ईमेल (वैकल्पिक)',
    checkout_address: 'पूरा पता *', checkout_city: 'शहर *', checkout_pincode: 'पिनकोड *', checkout_notes: 'विशेष नोट (वैकल्पिक)',
    checkout_name_ph: 'जैसे. प्रिया शर्मा', checkout_phone_ph: '10 अंकों का मोबाइल',
    checkout_email_ph: 'you@email.com', checkout_address_ph: 'घर नंबर, सड़क, क्षेत्र...',
    checkout_city_ph: 'जैसे. हैदराबाद', checkout_pincode_ph: '6 अंकों का पिनकोड', checkout_notes_ph: 'कोई विशेष अनुरोध...',
    checkout_whatsapp_note: 'आपके ऑर्डर की जानकारी व्हाट्सएप के माध्यम से हमें भेजी जाएगी।',
    checkout_cancel: 'रद्द करें', checkout_confirm_btn: 'व्हाट्सएप पर ऑर्डर पुष्टि करें',
    checkout_err_name: 'नाम आवश्यक है', checkout_err_phone: 'वैध 10 अंकों का फ़ोन आवश्यक है',
    checkout_err_address: 'पता आवश्यक है', checkout_err_city: 'शहर आवश्यक है', checkout_err_pincode: 'वैध 6 अंकों का पिनकोड आवश्यक है',
    order_confirmed_title: 'ऑर्डर पुष्टि हो गया!',
    order_confirmed_msg: 'आपके ऑर्डर के लिए धन्यवाद! आपका विवरण व्हाट्सएप के माध्यम से हमें भेज दिया गया है।',
    order_confirmed_sub: 'हमारी टीम जल्द ही आपसे संपर्क करेगी।',
    order_confirmed_wa: 'व्हाट्सएप संदेश भेजा गया', order_continue: 'खरीदारी जारी रखें',
    about_since: 'से', about_title_label: 'हमारी कहानी',
    home_eyebrow: 'स्थापित 2004 · उत्कृष्ट आभूषण', home_tagline: 'हर तत्व में सौंदर्य',
    home_sub: 'जहाँ सुंदरता मुस्कान से शुरू होती है, हर विवरण में चमकती है।',
    home_shop: 'शॉप', home_shop_desc: 'हमारा संग्रह देखें', home_shop_cta: 'स्टोर में जाएँ →',
    home_admin: 'एडमिन', home_admin_desc: 'कैटलॉग प्रबंधित करें', home_admin_cta: 'डैशबोर्ड →',
    home_footer: 'उत्कृष्ट आभूषण · श्रद्धा से हस्तनिर्मित',
    login_title: 'KUBERA RATNA', login_sub: 'उत्कृष्ट आभूषण', login_portal: 'एडमिन पोर्टल',
    login_username: 'उपयोगकर्ता नाम', login_password: 'पासवर्ड', login_demo: 'डेमो:', login_email: 'ईमेल', login_token: 'टोकन',
    login_btn: 'डैशबोर्ड में जाएँ', login_loading: 'प्रमाणित हो रहा है...', login_error: 'गलत क्रेडेंशियल। कृपया पुनः प्रयास करें।',
    login_back: '← होम पर वापस जाएँ',
    admin_products: 'उत्पाद', admin_about: 'हमारे बारे में', admin_logout: 'लॉग आउट',
    admin_add_product: 'उत्पाद जोड़ें', admin_total: 'कुल', admin_live: 'लाइव', admin_discounted: 'छूट वाले',
    admin_catalogue: 'उत्पाद सूची', admin_shown: 'उत्पाद दिखाए जा रहे हैं',
    admin_no_products: 'अभी तक कोई उत्पाद नहीं', admin_no_products_sub: 'ऊपर अपना पहला उत्पाद जोड़ें',
    admin_edit: 'संपादित करें', admin_save: 'सहेजें', admin_cancel: 'रद्द करें',
    admin_product_title: 'उत्पाद शीर्षक *', admin_category: 'श्रेणी *',
    admin_pricing: 'मूल्य निर्धारण और छूट', admin_orig_price: 'मूल मूल्य (₹) *',
    admin_discount_pct: 'छूट % (वैकल्पिक)', admin_final_price: 'अंतिम मूल्य (₹) *',
    admin_auto_calc: '← छूट से स्वतः गणना',
    admin_saving_msg: 'बचत', admin_description: 'विवरण', admin_media: 'मीडिया (चित्र और वीडियो)',
    admin_media_sub: 'चित्र या वीडियो अपलोड करने के लिए क्लिक करें', admin_media_formats: 'JPG, PNG, WebP, MP4 समर्थित',
    admin_visibility: 'ग्राहकों को दिखाई देता है', admin_visible: 'उत्पाद स्टोर में दिखाई देता है', admin_hidden: 'स्टोर से छुपा हुआ',
    admin_add_btn: 'उत्पाद जोड़ें', admin_save_btn: 'बदलाव सहेजें',
    admin_about_title: 'हमारे बारे में', admin_about_sub: 'यह जानकारी स्टोर में ग्राहकों को दिखाई देगी',
    admin_brand_title: 'ब्रांड शीर्षक', admin_founded: 'स्थापना वर्ष', admin_story: 'ब्रांड कहानी / विवरण',
    admin_mission: 'हमारा मिशन', admin_cover_img: 'कवर छवि URL', admin_save_about: 'हमारे बारे में सहेजें', admin_saved_about: 'सफलतापूर्वक सहेजा गया! ✓',
    footer_tagline: 'उत्कृष्ट आभूषण · प्यार से हस्तनिर्मित', footer_whatsapp: 'व्हाट्सएप:', footer_rights: '© 2024 KUBERA RATNA उत्कृष्ट आभूषण। सभी अधिकार सुरक्षित।',
    lang_label: 'भाषा', theme_light: 'लाइट', theme_dark: 'डार्क',
  },

  ta: {
    nav_home: 'முகப்பு', nav_collections: 'தொகுப்புகள்', nav_about: 'எங்களைப் பற்றி', nav_contact: 'தொடர்பு', nav_admin: 'நிர்வாகி',
    nav_search_placeholder: 'நகைகள் தேடுங்கள்...',
    hero_eyebrow: 'சிறப்பாக வடிவமைக்கப்பட்டது', hero_title_line1: 'ஒவ்வொரு கூறிலும்', hero_title_line2: 'அழகு',
    hero_subtitle: 'அழகு புன்னகையில் தொடங்கி, ஒவ்வொரு விவரத்திலும் மின்னுகிறது, ஒவ்வொரு அரிய தருணத்திலும் வாழ்கிறது.',
    hero_cta: 'தொகுப்பை ஆராயுங்கள்', hero_cart_btn: 'கார்ட்',
    cat_section_eyebrow: 'வகை மூலம் உலாவுங்கள்', cat_section_title: 'எங்கள் தொகுப்புகள்',
    cat_section_sub: 'பல வகைகளில் நகைகளை ஆராயுங்கள்', cat_pieces: 'துண்டுகள்',
    cat_rings: 'மோதிரங்கள்', cat_bracelets: 'வளையல்கள்', cat_chains: 'சங்கிலிகள்', cat_dollars: 'பதக்கங்கள்',
    cat_necklaces: 'மாலைகள்', cat_bangles: 'வளையல்கள்', cat_earrings: 'காதணிகள்', cat_pendants: 'தாலிகள்',
    cat_mallas: 'மாலைகள்',
    'cat_pooja-items': 'பூஜை பொருட்கள்',
    'cat_gem-stones': 'இரத்தினக் கற்கள்',
    cat_desc_rings: 'அன்பின் அடையாளம்', cat_desc_bracelets: 'மணிக்கட்டு அலங்காரம்', cat_desc_chains: 'பாரம்பரிய சங்கிலி',
    cat_desc_dollars: 'துணிச்சலான பதக்கங்கள்', cat_desc_necklaces: 'அழகிய மாலைகள்', cat_desc_bangles: 'நிரந்தர அழகு',
    cat_desc_earrings: 'முகத்தை அலங்கரிக்கும்', cat_desc_pendants: 'சிறப்பான துண்டுகள்',
    cat_desc_mallas: 'புனித மலர் மாலைகள்',
    'cat_desc_pooja-items': 'தெய்வீக வழிபாட்டு அத்தியாவசியங்கள்',
    'cat_desc_gem-stones': 'விலைமதிப்பற்ற & குணப்படுத்தும் கற்கள்',
    prod_section_eyebrow: 'முழு தொகுப்பு', prod_available: 'கிடைக்கின்றது',
    prod_all: 'அனைத்து நகைகள்', prod_view_all: 'அனைத்தும் காண்க',
    prod_no_results: 'முடிவுகள் இல்லை', prod_no_results_sub: 'வேறு வார்த்தை முயற்சிக்கவும்',
    prod_coming_soon: 'விரைவில் வருகிறது...', prod_coming_soon_sub: 'புதிய துண்டுகள் சேர்க்கப்படுகின்றன',
    prod_add_cart: 'கார்டில் சேர்க்கவும்', prod_add_more: 'மேலும் சேர்க்கவும்', prod_added: 'சேர்க்கப்பட்டது!',
    prod_details: 'விவரங்கள்', prod_in_cart: 'கார்டில் உள்ளது', prod_save: 'சேமிப்பு',
    prod_premium_quality: 'உயர் தரம்', prod_buy_whatsapp: 'வாட்ஸாப் மூலம் வாங்குங்கள்',
    prod_or_cart: 'அல்லது பல துண்டுகளை ஒரே நேரத்தில் ஆர்டர் செய்ய கார்டில் சேர்க்கவும்',
    prod_view_details: 'விவரங்கள் காண்க', prod_off: '% தள்ளுபடி', prod_you_save: 'நீங்கள் சேமிக்கிறீர்கள்',
    cart_title: 'என் கார்ட்', cart_empty: 'கார்ட் காலியாக உள்ளது', cart_empty_sub: 'எங்கள் அழகிய தொகுப்பை கண்டறியுங்கள்',
    cart_browse: 'தொகுப்பை உலாவுங்கள்', cart_items: 'பொருட்கள்', cart_item: 'பொருள்',
    cart_subtotal: 'துணை மொத்தம்', cart_savings: 'மொத்த சேமிப்பு', cart_total: 'மொத்தம்',
    cart_shipping: 'உறுதிப்படுத்தப்படும்', cart_confirm_order: 'ஆர்டர் உறுதிப்படுத்துங்கள்', cart_clear: 'கார்ட் அழிக்கவும்',
    checkout_title: 'உங்கள் ஆர்டரை உறுதிப்படுத்துங்கள்', checkout_sub: 'ஆர்டரை முடிக்க உங்கள் விவரங்களை நிரப்பவும்',
    checkout_order_summary: 'ஆர்டர் சுருக்கம்', checkout_your_details: 'உங்கள் விவரங்கள்',
    checkout_name: 'முழு பெயர் *', checkout_phone: 'தொலைபேசி எண் *', checkout_email: 'மின்னஞ்சல் (விருப்பம்)',
    checkout_address: 'முழு முகவரி *', checkout_city: 'நகரம் *', checkout_pincode: 'அஞ்சல் குறியீடு *', checkout_notes: 'சிறப்பு குறிப்புகள் (விருப்பம்)',
    checkout_name_ph: 'எ.கா. பிரியா சர்மா', checkout_phone_ph: '10 இலக்க மொபைல்',
    checkout_email_ph: 'you@email.com', checkout_address_ph: 'வீட்டு எண், தெரு, பகுதி...',
    checkout_city_ph: 'எ.கா. ஹைதராபாத்', checkout_pincode_ph: '6 இலக்க அஞ்சல் குறியீடு', checkout_notes_ph: 'ஏதாவது சிறப்பு கோரிக்கைகள்...',
    checkout_whatsapp_note: 'உங்கள் ஆர்டர் விவரங்கள் வாட்ஸாப் மூலம் உறுதிப்படுத்தலுக்கு எங்களுக்கு அனுப்பப்படும்.',
    checkout_cancel: 'ரத்து செய்யுங்கள்', checkout_confirm_btn: 'வாட்ஸாப் மூலம் ஆர்டர் உறுதிப்படுத்துங்கள்',
    checkout_err_name: 'பெயர் தேவை', checkout_err_phone: 'சரியான 10 இலக்க தொலைபேசி தேவை',
    checkout_err_address: 'முகவரி தேவை', checkout_err_city: 'நகரம் தேவை', checkout_err_pincode: 'சரியான 6 இலக்க அஞ்சல் குறியீடு தேவை',
    order_confirmed_title: 'ஆர்டர் உறுதிப்படுத்தப்பட்டது!',
    order_confirmed_msg: 'உங்கள் ஆர்டருக்கு நன்றி! உங்கள் விவரங்கள் வாட்ஸாப் மூலம் எங்களுக்கு அனுப்பப்பட்டன.',
    order_confirmed_sub: 'எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும்.',
    order_confirmed_wa: 'வாட்ஸாப் செய்தி அனுப்பப்பட்டது', order_continue: 'ஷாப்பிங் தொடரவும்',
    about_since: 'முதல்', about_title_label: 'எங்கள் கதை',
    home_eyebrow: 'நிறுவப்பட்டது 2004 · சிறந்த நகைகள்', home_tagline: 'ஒவ்வொரு கூறிலும் அழகு',
    home_sub: 'அழகு புன்னகையில் தொடங்கி, ஒவ்வொரு விவரத்திலும் மின்னுகிறது.',
    home_shop: 'ஷாப்', home_shop_desc: 'எங்கள் தொகுப்பை கண்டறியுங்கள்', home_shop_cta: 'கடைக்கு செல்லுங்கள் →',
    home_admin: 'நிர்வாகி', home_admin_desc: 'கேட்டலாக் நிர்வகிக்கவும்', home_admin_cta: 'டாஷ்போர்டு →',
    home_footer: 'சிறந்த நகைகள் · அன்புடன் கைவினைப்பட்டது',
    login_title: 'KUBERA RATNA', login_sub: 'சிறந்த நகைகள்', login_portal: 'நிர்வாகி போர்டல்',
    login_username: 'பயனர் பெயர்', login_password: 'கடவுச்சொல்', login_demo: 'டெமோ:', login_email: 'மின்னஞ்சல்', login_token: 'டோக்கன்',
    login_btn: 'டாஷ்போர்டுக்கு செல்லுங்கள்', login_loading: 'சரிபார்க்கப்படுகிறது...', login_error: 'தவறான தகவல்கள். மீண்டும் முயற்சிக்கவும்.',
    login_back: '← முகப்புக்கு திரும்பவும்',
    admin_products: 'தயாரிப்புகள்', admin_about: 'எங்களைப் பற்றி', admin_logout: 'வெளியேறவும்',
    admin_add_product: 'தயாரிப்பு சேர்க்கவும்', admin_total: 'மொத்தம்', admin_live: 'நேரடி', admin_discounted: 'தள்ளுபடி',
    admin_catalogue: 'தயாரிப்பு பட்டியல்', admin_shown: 'தயாரிப்புகள் காட்டப்படுகின்றன',
    admin_no_products: 'இன்னும் தயாரிப்புகள் இல்லை', admin_no_products_sub: 'மேலே உங்கள் முதல் தயாரிப்பை சேர்க்கவும்',
    admin_edit: 'திருத்தவும்', admin_save: 'சேமிக்கவும்', admin_cancel: 'ரத்து செய்யவும்',
    admin_product_title: 'தயாரிப்பு தலைப்பு *', admin_category: 'வகை *',
    admin_pricing: 'விலை நிர்ணயம் & தள்ளுபடி', admin_orig_price: 'அசல் விலை (₹) *',
    admin_discount_pct: 'தள்ளுபடி % (விருப்பம்)', admin_final_price: 'இறுதி விலை (₹) *',
    admin_auto_calc: '← தள்ளுபடியிலிருந்து தானாக கணக்கிடப்படுகிறது',
    admin_saving_msg: 'சேமிப்பு', admin_description: 'விளக்கம்', admin_media: 'மீடியா (படங்கள் & வீடியோக்கள்)',
    admin_media_sub: 'படங்கள் அல்லது வீடியோக்கள் பதிவேற்ற கிளிக் செய்யவும்', admin_media_formats: 'JPG, PNG, WebP, MP4 ஆதரிக்கப்படுகிறது',
    admin_visibility: 'வாடிக்கையாளர்களுக்கு தெரியும்', admin_visible: 'தயாரிப்பு கடையில் தெரிகிறது', admin_hidden: 'கடையிலிருந்து மறைக்கப்பட்டது',
    admin_add_btn: 'தயாரிப்பு சேர்க்கவும்', admin_save_btn: 'மாற்றங்களை சேமிக்கவும்',
    admin_about_title: 'எங்களைப் பற்றி', admin_about_sub: 'இந்த தகவல் கடையில் வாடிக்கையாளர்களுக்கு தெரியும்',
    admin_brand_title: 'பிராண்ட் தலைப்பு', admin_founded: 'நிறுவப்பட்ட ஆண்டு', admin_story: 'பிராண்ட் கதை / விளக்கம்',
    admin_mission: 'எங்கள் லட்சியம்', admin_cover_img: 'கவர் படம் URL', admin_save_about: 'எங்களைப் பற்றி சேமிக்கவும்', admin_saved_about: 'வெற்றிகரமாக சேமிக்கப்பட்டது! ✓',
    footer_tagline: 'சிறந்த நகைகள் · அன்புடன் கைவினைப்பட்டது', footer_whatsapp: 'வாட்ஸாப்:', footer_rights: '© 2024 KUBERA RATNA சிறந்த நகைகள். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.',
    lang_label: 'மொழி', theme_light: 'ஒளி', theme_dark: 'இருண்ட',
  },

  kn: {
    nav_home: 'ಮುಖಪುಟ', nav_collections: 'ಸಂಗ್ರಹಗಳು', nav_about: 'ನಮ್ಮ ಬಗ್ಗೆ', nav_contact: 'ಸಂಪರ್ಕ', nav_admin: 'ಆಡಳಿತ',
    nav_search_placeholder: 'ಆಭರಣ ಹುಡುಕಿ...',
    hero_eyebrow: 'ವಿಶೇಷವಾಗಿ ತಯಾರಿಸಲಾಗಿದೆ', hero_title_line1: 'ಪ್ರತಿ ಅಂಶದಲ್ಲಿ', hero_title_line2: 'ಸೌಂದರ್ಯ',
    hero_subtitle: 'ಸೌಂದರ್ಯ ಮುಗುಳ್ನಗೆಯಿಂದ ಶುರುವಾಗಿ, ಪ್ರತಿ ವಿವರದಲ್ಲಿ ಹೊಳೆಯುತ್ತದೆ, ಪ್ರತಿ ಅಮೂಲ್ಯ ಕ್ಷಣದಲ್ಲಿ ಜೀವಿಸುತ್ತದೆ.',
    hero_cta: 'ಸಂಗ್ರಹ ಅನ್ವೇಷಿಸಿ', hero_cart_btn: 'ಕಾರ್ಟ್',
    cat_section_eyebrow: 'ವರ್ಗದಿಂದ ಹುಡುಕಿ', cat_section_title: 'ನಮ್ಮ ಸಂಗ್ರಹಗಳು',
    cat_section_sub: 'ವಿವಿಧ ವರ್ಗಗಳಲ್ಲಿ ಆಭರಣ ಶ್ರೇಣಿ ಅನ್ವೇಷಿಸಿ', cat_pieces: 'ತುಂಡುಗಳು',
    cat_rings: 'ಉಂಗುರಗಳು', cat_bracelets: 'ಕಡಗಗಳು', cat_chains: 'ಸರಗಳು', cat_dollars: 'ಪೆಂಡೆಂಟ್‌ಗಳು',
    cat_necklaces: 'ಹಾರಗಳು', cat_bangles: 'ಬಳೆಗಳು', cat_earrings: 'ಕಿವಿ ಓಲೆಗಳು', cat_pendants: 'ಲಾಕೆಟ್‌ಗಳು',
    cat_mallas: 'ಮಾಲೆಗಳು',
    'cat_pooja-items': 'ಪೂಜಾ ಸಾಮಗ್ರಿ',
    'cat_gem-stones': 'ರತ್ನ ಕಲ್ಲುಗಳು',
    cat_desc_rings: 'ಪ್ರೀತಿಯ ಸಂಕೇತ', cat_desc_bracelets: 'ಮಣಿಕಟ್ಟಿನ ಅಲಂಕಾರ', cat_desc_chains: 'ಕ್ಲಾಸಿಕ್ ಸರ',
    cat_desc_dollars: 'ಧೈರ್ಯ ಶೈಲಿ', cat_desc_necklaces: 'ಅದ್ಭುತ ಹಾರಗಳು', cat_desc_bangles: 'ಶಾಶ್ವತ ಸೌಂದರ್ಯ',
    cat_desc_earrings: 'ಮುಖ ಅಲಂಕರಿಸಿ', cat_desc_pendants: 'ವಿಶೇಷ ತುಂಡುಗಳು',
    cat_desc_mallas: 'ಪವಿತ್ರ ಹೂಮಾಲೆಗಳು',
    'cat_desc_pooja-items': 'ದೈವಿಕ ಪೂಜಾ ಅವಶ್ಯಕತೆಗಳು',
    'cat_desc_gem-stones': 'ಅಮೂಲ್ಯ & ಗುಣಪಡಿಸುವ ಕಲ್ಲುಗಳು',
    prod_section_eyebrow: 'ಸಂಪೂರ್ಣ ಸಂಗ್ರಹ', prod_available: 'ಲಭ್ಯ',
    prod_all: 'ಎಲ್ಲಾ ಆಭರಣಗಳು', prod_view_all: 'ಎಲ್ಲ ನೋಡಿ',
    prod_no_results: 'ಯಾವ ಫಲಿತಾಂಶಗಳಿಲ್ಲ', prod_no_results_sub: 'ಬೇರೆ ಪದ ಪ್ರಯತ್ನಿಸಿ',
    prod_coming_soon: 'ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ...', prod_coming_soon_sub: 'ಹೊಸ ತುಂಡುಗಳು ಸೇರಿಸಲಾಗುತ್ತಿದೆ',
    prod_add_cart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ', prod_add_more: 'ಇನ್ನಷ್ಟು ಸೇರಿಸಿ', prod_added: 'ಸೇರಿಸಲಾಗಿದೆ!',
    prod_details: 'ವಿವರಗಳು', prod_in_cart: 'ಕಾರ್ಟ್‌ನಲ್ಲಿ ಇದೆ', prod_save: 'ಉಳಿತಾಯ',
    prod_premium_quality: 'ಪ್ರೀಮಿಯಂ ಗುಣಮಟ್ಟ', prod_buy_whatsapp: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಖರೀದಿಸಿ',
    prod_or_cart: 'ಅಥವಾ ಹಲವು ತುಂಡುಗಳನ್ನು ಒಟ್ಟಾಗಿ ಆರ್ಡರ್ ಮಾಡಲು ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    prod_view_details: 'ವಿವರಗಳು ನೋಡಿ', prod_off: '% ರಿಯಾಯಿತಿ', prod_you_save: 'ನೀವು ಉಳಿಸುತ್ತೀರಿ',
    cart_title: 'ನನ್ನ ಕಾರ್ಟ್', cart_empty: 'ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ', cart_empty_sub: 'ನಮ್ಮ ಅದ್ಭುತ ಸಂಗ್ರಹ ಅನ್ವೇಷಿಸಿ',
    cart_browse: 'ಸಂಗ್ರಹ ನೋಡಿ', cart_items: 'ವಸ್ತುಗಳು', cart_item: 'ವಸ್ತು',
    cart_subtotal: 'ಉಪ-ಮೊತ್ತ', cart_savings: 'ಒಟ್ಟು ಉಳಿತಾಯ', cart_total: 'ಒಟ್ಟು',
    cart_shipping: 'ದೃಢಪಡಿಸಲಾಗುವುದು', cart_confirm_order: 'ಆರ್ಡರ್ ದೃಢಪಡಿಸಿ', cart_clear: 'ಕಾರ್ಟ್ ತೆರವುಗೊಳಿಸಿ',
    checkout_title: 'ನಿಮ್ಮ ಆರ್ಡರ್ ದೃಢಪಡಿಸಿ', checkout_sub: 'ಆರ್ಡರ್ ಪೂರ್ಣಗೊಳಿಸಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ',
    checkout_order_summary: 'ಆರ್ಡರ್ ಸಾರಾಂಶ', checkout_your_details: 'ನಿಮ್ಮ ವಿವರಗಳು',
    checkout_name: 'ಪೂರ್ಣ ಹೆಸರು *', checkout_phone: 'ಫೋನ್ ಸಂಖ್ಯೆ *', checkout_email: 'ಇಮೇಲ್ (ಐಚ್ಛಿಕ)',
    checkout_address: 'ಪೂರ್ಣ ವಿಳಾಸ *', checkout_city: 'ನಗರ *', checkout_pincode: 'ಪಿನ್ ಕೋಡ್ *', checkout_notes: 'ವಿಶೇಷ ಟಿಪ್ಪಣಿಗಳು (ಐಚ್ಛಿಕ)',
    checkout_name_ph: 'ಉದಾ. ಪ್ರಿಯಾ ಶರ್ಮಾ', checkout_phone_ph: '10 ಅಂಕಿ ಮೊಬೈಲ್',
    checkout_email_ph: 'you@email.com', checkout_address_ph: 'ಮನೆ ನಂ, ಬೀದಿ, ಪ್ರದೇಶ...',
    checkout_city_ph: 'ಉದಾ. ಹೈದರಾಬಾದ್', checkout_pincode_ph: '6 ಅಂಕಿ ಪಿನ್ ಕೋಡ್', checkout_notes_ph: 'ಯಾವುದೇ ವಿಶೇಷ ವಿನಂತಿಗಳು...',
    checkout_whatsapp_note: 'ನಿಮ್ಮ ಆರ್ಡರ್ ವಿವರಗಳನ್ನು ದೃಢೀಕರಣಕ್ಕಾಗಿ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನಮಗೆ ಕಳುಹಿಸಲಾಗುವುದು.',
    checkout_cancel: 'ರದ್ದುಗೊಳಿಸಿ', checkout_confirm_btn: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಆರ್ಡರ್ ದೃಢಪಡಿಸಿ',
    checkout_err_name: 'ಹೆಸರು ಅಗತ್ಯ', checkout_err_phone: 'ಮಾನ್ಯ 10 ಅಂಕಿ ಫೋನ್ ಅಗತ್ಯ',
    checkout_err_address: 'ವಿಳಾಸ ಅಗತ್ಯ', checkout_err_city: 'ನಗರ ಅಗತ್ಯ', checkout_err_pincode: 'ಮಾನ್ಯ 6 ಅಂಕಿ ಪಿನ್ ಕೋಡ್ ಅಗತ್ಯ',
    order_confirmed_title: 'ಆರ್ಡರ್ ದೃಢಪಡಿಸಲಾಗಿದೆ!',
    order_confirmed_msg: 'ನಿಮ್ಮ ಆರ್ಡರ್‌ಗೆ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳನ್ನು ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನಮಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.',
    order_confirmed_sub: 'ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
    order_confirmed_wa: 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ', order_continue: 'ಶಾಪಿಂಗ್ ಮುಂದುವರಿಸಿ',
    about_since: 'ಇಂದಿನಿಂದ', about_title_label: 'ನಮ್ಮ ಕಥೆ',
    home_eyebrow: 'ಸ್ಥಾಪಿಸಲಾಯಿತು 2004 · ಅತ್ಯುತ್ತಮ ಆಭರಣ', home_tagline: 'ಪ್ರತಿ ಅಂಶದಲ್ಲಿ ಸೌಂದರ್ಯ',
    home_sub: 'ಸೌಂದರ್ಯ ಮುಗುಳ್ನಗೆಯಿಂದ ಶುರುವಾಗಿ, ಪ್ರತಿ ವಿವರದಲ್ಲಿ ಹೊಳೆಯುತ್ತದೆ.',
    home_shop: 'ಶಾಪ್', home_shop_desc: 'ನಮ್ಮ ಸಂಗ್ರಹ ಕಂಡುಹಿಡಿಯಿರಿ', home_shop_cta: 'ಸ್ಟೋರ್‌ಗೆ ಹೋಗಿ →',
    home_admin: 'ಆಡಳಿತ', home_admin_desc: 'ಕ್ಯಾಟಲಾಗ್ ನಿರ್ವಹಿಸಿ', home_admin_cta: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ →',
    home_footer: 'ಅತ್ಯುತ್ತಮ ಆಭರಣ · ಭಕ್ತಿಯಿಂದ ಕೈಯಿಂದ ತಯಾರಿಸಲಾಗಿದೆ',
    login_title: 'KUBERA RATNA', login_sub: 'ಅತ್ಯುತ್ತಮ ಆಭರಣ', login_portal: 'ಆಡಳಿತ ಪೋರ್ಟಲ್',
    login_username: 'ಬಳಕೆದಾರ ಹೆಸರು', login_password: 'ಪಾಸ್‌ವರ್ಡ್', login_demo: 'ಡೆಮೋ:', login_email: 'ಇಮೇಲ್', login_token: 'ಟೋಕನ್',
    login_btn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ', login_loading: 'ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ...', login_error: 'ತಪ್ಪಾದ ಪ್ರಮಾಣಪತ್ರಗಳು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    login_back: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    admin_products: 'ಉತ್ಪನ್ನಗಳು', admin_about: 'ನಮ್ಮ ಬಗ್ಗೆ', admin_logout: 'ಲಾಗ್ ಔಟ್',
    admin_add_product: 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ', admin_total: 'ಒಟ್ಟು', admin_live: 'ಲೈವ್', admin_discounted: 'ರಿಯಾಯಿತಿ',
    admin_catalogue: 'ಉತ್ಪನ್ನ ಕ್ಯಾಟಲಾಗ್', admin_shown: 'ಉತ್ಪನ್ನಗಳು ತೋರಿಸಲಾಗಿದೆ',
    admin_no_products: 'ಇನ್ನೂ ಯಾವ ಉತ್ಪನ್ನಗಳಿಲ್ಲ', admin_no_products_sub: 'ಮೇಲೆ ನಿಮ್ಮ ಮೊದಲ ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
    admin_edit: 'ಸಂಪಾದಿಸಿ', admin_save: 'ಉಳಿಸಿ', admin_cancel: 'ರದ್ದುಗೊಳಿಸಿ',
    admin_product_title: 'ಉತ್ಪನ್ನ ಶೀರ್ಷಿಕೆ *', admin_category: 'ವರ್ಗ *',
    admin_pricing: 'ಬೆಲೆ ನಿರ್ಧಾರ & ರಿಯಾಯಿತಿ', admin_orig_price: 'ಮೂಲ ಬೆಲೆ (₹) *',
    admin_discount_pct: 'ರಿಯಾಯಿತಿ % (ಐಚ್ಛಿಕ)', admin_final_price: 'ಅಂತಿಮ ಬೆಲೆ (₹) *',
    admin_auto_calc: '← ರಿಯಾಯಿತಿಯಿಂದ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲೆಕ್ಕಿಸಲಾಗಿದೆ',
    admin_saving_msg: 'ಉಳಿತಾಯ', admin_description: 'ವಿವರಣೆ', admin_media: 'ಮೀಡಿಯಾ (ಚಿತ್ರಗಳು & ವೀಡಿಯೋಗಳು)',
    admin_media_sub: 'ಚಿತ್ರಗಳು ಅಥವಾ ವೀಡಿಯೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ', admin_media_formats: 'JPG, PNG, WebP, MP4 ಬೆಂಬಲಿಸಲಾಗಿದೆ',
    admin_visibility: 'ಗ್ರಾಹಕರಿಗೆ ಗೋಚರಿಸುತ್ತದೆ', admin_visible: 'ಉತ್ಪನ್ನ ಅಂಗಡಿಯಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ', admin_hidden: 'ಅಂಗಡಿಯಿಂದ ಮರೆಮಾಡಲಾಗಿದೆ',
    admin_add_btn: 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ', admin_save_btn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    admin_about_title: 'ನಮ್ಮ ಬಗ್ಗೆ', admin_about_sub: 'ಈ ಮಾಹಿತಿ ಅಂಗಡಿಯಲ್ಲಿ ಗ್ರಾಹಕರಿಗೆ ಕಾಣಿಸುತ್ತದೆ',
    admin_brand_title: 'ಬ್ರ್ಯಾಂಡ್ ಶೀರ್ಷಿಕೆ', admin_founded: 'ಸ್ಥಾಪನೆ ವರ್ಷ', admin_story: 'ಬ್ರ್ಯಾಂಡ್ ಕಥೆ / ವಿವರಣೆ',
    admin_mission: 'ನಮ್ಮ ಧ್ಯೇಯ', admin_cover_img: 'ಕವರ್ ಚಿತ್ರ URL', admin_save_about: 'ನಮ್ಮ ಬಗ್ಗೆ ಉಳಿಸಿ', admin_saved_about: 'ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ! ✓',
    footer_tagline: 'ಅತ್ಯುತ್ತಮ ಆಭರಣ · ಪ್ರೀತಿಯಿಂದ ಕೈಯಿಂದ ತಯಾರಿಸಲಾಗಿದೆ', footer_whatsapp: 'ವಾಟ್ಸಾಪ್:', footer_rights: '© 2024 KUBERA RATNA ಅತ್ಯುತ್ತಮ ಆಭರಣ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿವೆ.',
    lang_label: 'ಭಾಷೆ', theme_light: 'ಲೈಟ್', theme_dark: 'ಡಾರ್ಕ್',
  },
};

export const LANG_OPTIONS: { value: Lang; label: string; native: string }[] = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'te', label: 'Telugu', native: 'తెలుగు' },
  { value: 'hi', label: 'Hindi', native: 'हिंदी' },
  { value: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { value: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

type Country = 'IN' | 'US' | 'GB' | 'CA' | 'AU' | 'DE' | 'FR' | 'JP' | 'CN' | 'BR' | 'ZA' | 'AE' | 'SG' | 'IT' | 'ES';

export const COUNTRY_OPTIONS: {
  value: Country;
  label: string;
  native: string;
}[] = [
    { value: 'IN', label: 'India', native: 'भारत' },
    { value: 'US', label: 'United States', native: 'United States' },
    { value: 'GB', label: 'United Kingdom', native: 'United Kingdom' },
    { value: 'CA', label: 'Canada', native: 'Canada' },
    { value: 'AU', label: 'Australia', native: 'Australia' },
    { value: 'DE', label: 'Germany', native: 'Deutschland' },
    { value: 'FR', label: 'France', native: 'France' },
    { value: 'JP', label: 'Japan', native: '日本' },
    { value: 'CN', label: 'China', native: '中国' },
    { value: 'BR', label: 'Brazil', native: 'Brasil' },
    { value: 'ZA', label: 'South Africa', native: 'South Africa' },
    { value: 'AE', label: 'UAE', native: 'الإمارات' },
    { value: 'SG', label: 'Singapore', native: 'Singapore' },
    { value: 'IT', label: 'Italy', native: 'Italia' },
    { value: 'ES', label: 'Spain', native: 'España' },
  ];