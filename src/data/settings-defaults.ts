// Fallback value for every key in the tenant settings schema (docs/mithayi-settings-schema.ts).
// The storefront shows these until the admin saves a value for the key, so an empty or
// unreachable settings API never leaves a blank page.
//
// Conventions: "|" or a newline inside a text value is a line break, and a heading's
// italic part lives in a separate `*_accent` key.

export interface TextItem {
  text: string;
}
export interface LinkItem {
  label: string;
  url: string;
}
export interface GiftSlide {
  image: string;
  kicker: string;
  title_line_1: string;
  title_line_2: string;
  button_text: string;
  button_url: string;
}
export interface OccasionItem {
  name: string;
  url: string;
  /** moon | bloom | burst | heart | sparkle | asterisk */
  icon: string;
}
export interface TestimonialItem {
  quote: string;
  author: string;
  city: string;
  rating: string;
}
export interface InstagramPhoto {
  image: string;
  alt: string;
  url: string;
}
export interface SocialLink {
  platform: string;
  title: string;
  url: string;
}

export const defaultSettings = {
  // ── Index: hero ──
  hero_image: "/images/hero.jpg",
  hero_image_alt: "An open red and gold box of assorted mithai",
  hero_eyebrow: "Made to share. Made to remember.",
  hero_title: "Some moments|deserve a little",
  hero_title_accent: "more sweetness.",
  hero_description:
    "Thoughtfully crafted mithai and gifts, made for every beautiful moment worth celebrating.",
  hero_primary_button_text: "Shop Mithai",
  hero_primary_button_url: "#collections",
  hero_secondary_button_text: "Explore Gifts",
  hero_secondary_button_url: "#gifting",
  hero_scroll_text: "Scroll to explore",
  hero_vertical_text: "Handcrafted happiness · Est. in Pakistan",

  // ── Index: marquee ──
  marquee_items: [
    { text: "Handmade with heart" },
    { text: "A gift for every story" },
    { text: "Sweeten the moment" },
  ] as TextItem[],

  // ── Index: collections ──
  collections_eyebrow: "The good stuff starts here",
  collections_title: "Find your",
  collections_title_accent: "kind of sweet.",
  collections_description:
    "A little something for every taste, every person, every occasion.",
  collections_card_label: "Collection",

  // ── Index: signature ──
  signature_image: "/images/signature.jpg",
  signature_image_alt:
    "A brass platter of pistachio barfi, kaju katli, rose and gulab jamun",
  signature_badge_text: "Made|with|love",
  signature_eyebrow: "The Mithayi signature",
  signature_title: "Not just mithai.",
  signature_title_accent: "A feeling.",
  signature_description:
    "That first bite. That familiar smile. That instant feeling of home. We take the sweets you’ve always loved and make them feel like a whole new celebration.",
  signature_perks: [
    { text: "Small-batch crafted" },
    { text: "Beautifully gifted" },
    { text: "Made for sharing" },
  ] as TextItem[],
  signature_link_text: "Discover our mithai",
  signature_link_url: "#favourites",

  // ── Index: gifting ──
  gifting_eyebrow: "A little joy, beautifully wrapped",
  gifting_title: "The art of",
  gifting_title_accent: "giving.",
  gifting_slides: [
    {
      image: "/images/gifting-boxes.jpg",
      kicker: "01 / The perfect gesture",
      title_line_1: "Beautiful inside",
      title_line_2: "and out.",
      button_text: "Shop gift boxes",
      button_url: "#collections",
    },
    {
      image: "/images/hero.jpg",
      kicker: "02 / Made for moments",
      title_line_1: "A box full",
      title_line_2: "of wonder.",
      button_text: "Shop hampers",
      button_url: "#collections",
    },
  ] as GiftSlide[],

  // ── Index: festive banner ──
  festive_image: "/images/festive.jpg",
  festive_image_alt: "A green and gold box of festive mithai beside a lantern",
  festive_eyebrow: "For the moments that matter",
  festive_title_line_1: "Every celebration",
  festive_title_line_2_before: "tastes",
  festive_title_accent: "sweeter",
  festive_title_line_3: "together.",
  festive_description:
    "From the first moon sighting to the last dance,|make their day a little more magical.",
  festive_button_text: "Explore festive gifts",
  festive_button_url: "#gifting",

  // ── Index: story ──
  story_image: "/images/story.jpg",
  story_image_alt: "Gold leaf being placed on pistachio barfi by hand",
  story_image_caption: "The beauty is in the details — 001",
  story_eyebrow: "A story worth sharing",
  story_title: "Rooted in|tradition.",
  story_title_accent: "Made for today.",
  story_paragraph_1:
    "Some things never go out of style. The joy of showing up with something sweet. The warmth of a shared table. The memories made in between.",
  story_paragraph_2:
    "At Mithayi, we bring that timeless feeling to life, one lovingly made sweet and thoughtfully wrapped gift at a time.",
  story_signoff: "Made with love, always.",

  // ── Index: best sellers ──
  favourites_eyebrow: "Loved for a reason",
  favourites_title: "Our",
  favourites_title_accent: "favourites.",
  favourites_description: "",
  favourites_button_text: "View all favourites",

  // ── Index: occasions ──
  occasions_eyebrow: "Sweetness for every story",
  occasions_title: "What are we",
  occasions_title_accent: "celebrating?",
  occasions_list: [
    { name: "Eid", url: "#festive", icon: "moon" },
    { name: "Weddings", url: "#gifting", icon: "bloom" },
    { name: "Birthdays", url: "#gifting", icon: "burst" },
    { name: "Anniversaries", url: "#gifting", icon: "heart" },
    { name: "Corporate Gifting", url: "#gifting", icon: "sparkle" },
    { name: "Festive Celebrations", url: "#festive", icon: "asterisk" },
  ] as OccasionItem[],

  // ── Index: testimonials ──
  testimonials_eyebrow: "Kind words, sweet memories",
  testimonials_list: [
    {
      quote:
        "Every box feels like a celebration before you even open it. The mithai is simply unforgettable.",
      author: "Ayesha K.",
      city: "Lahore",
      rating: "5",
    },
  ] as TestimonialItem[],

  // ── Index: instagram ──
  instagram_eyebrow: "Little moments, big feelings",
  instagram_title: "Follow the",
  instagram_title_accent: "sweetness.",
  instagram_handle: "@mithayi",
  instagram_profile_url: "",
  instagram_images: [1, 2, 3, 4, 5].map((n) => ({
    image: `/images/ig-${n}.jpg`,
    alt: `Mithayi on Instagram, photo ${n}`,
    url: "",
  })) as InstagramPhoto[],

  // ── Shop ──
  shop_hero_image: "",
  shop_hero_eyebrow: "The full collection",
  shop_hero_title: "Shop",
  shop_hero_title_accent: "everything sweet.",
  shop_hero_description:
    "Mithai, gift boxes, hampers and more. Find the right one for the moment.",
  shop_result_singular: "treat",
  shop_result_plural: "treats",
  shop_empty_message: "Nothing matched your search. Try adjusting the filters.",

  // ── Cart ──
  cart_hero_eyebrow: "Almost yours",
  cart_hero_title: "Your",
  cart_hero_title_accent: "cart.",
  cart_empty_message: "Your cart is empty.",
  cart_empty_button_text: "Start shopping",

  // ── Checkout ──
  checkout_hero_eyebrow: "Nearly there",
  checkout_hero_title: "Complete your",
  checkout_hero_title_accent: "order.",
  order_success_eyebrow: "Order placed",
  order_success_title: "Thank you,",
  order_success_title_accent: "it’s on its way.",
  /** Empty means "use the message returned by the checkout API" */
  order_success_message: "",

  // ── Shipping ──
  shipping_label: "Standard delivery",
  shipping_description: "Delivered to your address",
  shipping_rate: "350",

  // ── Journal ──
  blog_hero_image: "",
  blog_hero_eyebrow: "The journal",
  blog_hero_title: "Stories worth",
  blog_hero_title_accent: "sharing.",
  blog_hero_description:
    "Gifting ideas, festive guides and the craft behind every sweet.",
  blog_empty_message: "No stories found. Check back soon.",

  // ── FAQs ──
  faqs_hero_image: "",
  faqs_hero_eyebrow: "Good to know",
  faqs_hero_title: "Frequently asked",
  faqs_hero_title_accent: "questions.",
  faqs_hero_description: "",
  faqs_empty_message: "No questions yet. Ask us anything on the contact page.",
  faqs_footer_text: "Still wondering?",
  faqs_footer_link_text: "Get in touch",

  // ── Contact ──
  contact_hero_image: "",
  contact_hero_eyebrow: "Say hello",
  contact_hero_title: "We’d love to",
  contact_hero_title_accent: "hear from you.",
  contact_hero_description:
    "Questions about an order, a gift or a celebration? Send us a note and we will get back to you.",
  contact_form_submit_text: "Send message",
  contact_form_success_message:
    "Thank you for getting in touch. We’ll reply as soon as we can.",

  // ── Global: identity ──
  site_title: "Mithayi | Thoughtfully crafted mithai & gifts",
  site_title_template_suffix: "Mithayi",
  site_description:
    "Thoughtfully crafted mithai and gifts, made for every beautiful moment worth celebrating.",
  site_logo: "",
  site_favicon: "",
  site_share_image: "",
  site_wordmark: "Mithayi",
  site_tagline: "Est. with love",

  // ── Global: announcements and navigation ──
  site_announcements: [
    { text: "A sweeter way to celebrate" },
    { text: "Handcrafted with love in Pakistan" },
    { text: "A sweeter way to celebrate" },
  ] as TextItem[],
  nav_links: [
    { label: "Shop", url: "/products" },
    { label: "Gifting", url: "/#gifting" },
    { label: "Our Story", url: "/#story" },
  ] as LinkItem[],
  nav_search_label: "Search",
  nav_cart_label: "Cart",
  nav_menu_label: "Menu",
  nav_shop_all_label: "Shop all products",
  nav_more_label: "More collections",

  // ── Global: footer ──
  footer_tagline:
    "A little sweetness goes a long way.|Made to share, made to remember.",
  footer_column_1_title: "Explore",
  footer_column_1_links: [
    { label: "Shop all", url: "/products" },
    { label: "Gifting", url: "/#gifting" },
    { label: "Best sellers", url: "/#favourites" },
    { label: "Your cart", url: "/cart" },
  ] as LinkItem[],
  footer_column_2_title: "The little details",
  footer_column_2_links: [
    { label: "Our story", url: "/#story" },
    { label: "Journal", url: "/blog" },
    { label: "FAQs", url: "/faqs" },
    { label: "Contact", url: "/contact" },
    { label: "Back to top", url: "#top" },
  ] as LinkItem[],
  footer_copyright: "© 2026 Mithayi. Made with love.",
  footer_signoff: "The art of sweet gifting",

  // ── Global: contact info and social ──
  contact_email: "",
  contact_phone: "",
  contact_whatsapp: "",
  contact_address: "",
  contact_hours: "",
  social_media_links: [] as SocialLink[],
};

export type Settings = typeof defaultSettings;
export type SettingKey = keyof Settings;
