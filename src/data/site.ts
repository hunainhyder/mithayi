import type { NavLink } from "@/types";

export const announcements = [
  "A sweeter way to celebrate",
  "Handcrafted with love in Pakistan",
  "A sweeter way to celebrate",
];

export const navLinks: NavLink[] = [
  { label: "Shop", href: "/products", hasMenu: true },
  { label: "Gifting", href: "/#gifting" },
  { label: "Our Story", href: "/#story" },
];

export const marqueeItems = [
  "Handmade with heart",
  "A gift for every story",
  "Sweeten the moment",
];

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Shop all", href: "#collections" },
      { label: "Gifting", href: "#gifting" },
      { label: "Best sellers", href: "#favourites" },
    ],
  },
  {
    title: "The little details",
    links: [
      { label: "Our story", href: "#story" },
      { label: "Collections", href: "#collections" },
      { label: "Back to top", href: "#top" },
    ],
  },
];
