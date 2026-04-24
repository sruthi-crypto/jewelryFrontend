export const DEFAULT_CATEGORIES = [
  'gem-stones',
  'rings',
  'bracelets',
  'chains',
  'pendants',
  'necklaces',
  'earrings',
  'pooja-items',
  'mallas',
  'yantras',
] as const;

export type Category = (typeof DEFAULT_CATEGORIES)[number] | string;

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  category: Category;
  media: MediaItem[];
  createdAt: number;
  available: boolean;
  // quantity: number;
}

export interface AboutUs {
  eyebrow: string;
  title: string;
  description: string;
  mission: string;
  since: string;
  images: {
    id: string;
    url: string;
    alt: string;
  }[];
  highlights: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  id: string;
  platform: "facebook" | "instagram" | "youtube" | "twitter" | "custom";
  label: string;
  href: string;
}

export interface FooterContactItem {
  id: string;
  type: "whatsapp" | "phone" | "email" | "address";
  label: string;
  value: string;
  href?: string;
}

export interface FooterContent {
  logoUrl?: string;
  brandName: string;
  tagline: string;
  rightsText: string;
  madeInLabel: string;
  ctaLabel: string;
  ctaHref: string;
  linkGroups: FooterLinkGroup[];
  contacts: FooterContactItem[];
  socials: FooterSocialLink[];
}

export interface StoreContent {
  aboutUs: AboutUs;
  footer: FooterContent;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
}
