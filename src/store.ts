// Types
export type Category = 'rings' | 'bracelets' | 'chains' | 'dollars';

export interface MediaItem {
  type: 'image' | 'video';
  url: string; // base64 or object URL
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  media: MediaItem[];
  createdAt: number;
  available: boolean;
}

export interface StoreState {
  products: Product[];
  isAdminLoggedIn: boolean;
  isUserLoggedIn: boolean;
}

// localStorage keys
const STORAGE_KEY = 'lumina_store';

// Default products
const defaultProducts: Product[] = [
  {
    id: '1',
    title: 'Eternal Rose Gold Ring',
    price: 12500,
    description: 'Handcrafted 18k rose gold ring adorned with a brilliant-cut diamond solitaire. A timeless piece that speaks to everlasting love.',
    category: 'rings',
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', name: 'ring1.jpg' }],
    createdAt: Date.now() - 86400000 * 3,
    available: true,
  },
  {
    id: '2',
    title: 'Diamond Pavé Bracelet',
    price: 28000,
    description: 'A luxurious 22k gold bracelet set with 48 pavé-cut diamonds. Versatile enough for daily wear, spectacular for special occasions.',
    category: 'bracelets',
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80', name: 'bracelet1.jpg' }],
    createdAt: Date.now() - 86400000 * 2,
    available: true,
  },
  {
    id: '3',
    title: 'Venetian Gold Chain',
    price: 18700,
    description: 'An intricate 24k gold Venetian chain, hand-linked by master craftsmen. Thirty-two inches of pure elegance.',
    category: 'chains',
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80', name: 'chain1.jpg' }],
    createdAt: Date.now() - 86400000,
    available: true,
  },
  {
    id: '4',
    title: 'Royal Gold Dollar Pendant',
    price: 9500,
    description: 'A statement gold dollar pendant in 22k yellow gold. Perfect as a bold centerpiece for layered necklaces or as a standalone piece.',
    category: 'dollars',
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80', name: 'dollar1.jpg' }],
    createdAt: Date.now(),
    available: true,
  },
];

export function loadStore(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { products: defaultProducts, isAdminLoggedIn: false, isUserLoggedIn: false };
}

export function saveStore(state: Partial<StoreState>) {
  const current = loadStore();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...state }));
}

export function saveProducts(products: Product[]) {
  saveStore({ products });
}
