export interface NavLink {
  label: string;
  href: string;
  hasMenu?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  href: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  blurb: string;
  price: number;
  rating: number;
  category: string;
  badge: string;
  image: string;
}

export type OccasionIcon =
  | "moon"
  | "bloom"
  | "burst"
  | "heart"
  | "sparkle"
  | "asterisk";

export interface Occasion {
  id: string;
  name: string;
  href: string;
  icon: OccasionIcon;
}

export interface GiftSlide {
  id: string;
  kicker: string;
  title: string[];
  cta: string;
  href: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  city: string;
}
