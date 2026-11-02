export interface Paginated<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    path: string;
  };
}

export interface ApiImage {
  id: number;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_featured: boolean;
  products_count: number;
  image?: ApiImage | null;
  secondary_image?: ApiImage | null;
  created_at: string;
  updated_at: string;
}

export interface ProductReview {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  rating: number | null;
  message: string | null;
  status: "Approved";
  created_at: string;
}

export interface ProductNote {
  id: number;
  title: string;
  content: string;
  status: "Public";
  created_at: string;
  updated_at: string;
}

export interface ProductAttributeConfig {
  id: number;
  name: string;
  is_color: boolean;
  values: { id: number; value: string; color_hex: string | null }[];
}

export interface ProductVariant {
  id: number;
  price: number | null;
  discounted_price: number | null;
  stock: number;
  is_active: boolean;
  attributes: {
    attribute_value_id: number;
    attribute: string;
    value: string;
    color_hex: string | null;
  }[];
  images: ApiImage[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discounted_price: number | null;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  average_rating: number | null;
  reviews_count: number;
  categories: Category[];
  featured_image: ApiImage | null;
  // Only present on the single-product response
  gallery?: ApiImage[];
  reviews?: ProductReview[];
  variants?: ProductVariant[];
  notes?: ProductNote[];
  product_attributes?: ProductAttributeConfig[];
  created_at: string;
  updated_at: string;
}

export interface CategoryMeta {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  // Plain URL strings inside the category-products response
  image: string | null;
  secondary_image: string | null;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  reading_time: number;
  is_published: boolean;
  published_at: string | null;
  featured_image: ApiImage | null;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
}

export interface CartLine {
  product_id: number;
  product_variant_id: number | null;
  quantity: number;
}

export interface ValidatePromotionResponse {
  valid: boolean;
  promotion: {
    promotion_id: number;
    type: "discount" | "buy_x_get_y";
    name: string;
    code: string;
    discount_amount: number;
    description: string;
  } | null;
  error: string | null;
  subtotal: number;
}

export interface CheckoutPayload {
  customer: { name: string; email: string; phone: string; address: string };
  items: CartLine[];
  shipping_method: string;
  shipping_cost: number;
  coupon_code?: string;
}

export interface CheckoutResponse {
  message: string;
  order_id: number;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  promotion_applied: { code: string | null; description: string } | null;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ReviewPayload {
  name: string;
  email: string;
  phone?: string;
  rating?: number;
  message?: string;
}
