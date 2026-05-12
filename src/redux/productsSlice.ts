import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { DEFAULT_CATEGORIES, type AboutUs, type MediaItem, type Product, type StoreContent } from "./types";
import type { RootState } from "./store";

interface BackendProduct {
  id: string;
  productName: string;
  description: string;
  price: number;
  discountPercentage?: number;
  images?: string[];
  category: string;
  isActive: boolean;
  // quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SiteContentResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

interface ProductsState {
  items: Product[];
  storeContent: StoreContent;
  status: "idle" | "loading" | "succeeded" | "failed";
  contentStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Minimal fallback - content is fetched from backend /site-content
const defaultAboutUs: AboutUs = {
  eyebrow: "About Us",
  title: "",
  description: "",
  mission: "",
  since: "",
  images: [],
  highlights: [],
};

const defaultStoreContent: StoreContent = {
  aboutUs: defaultAboutUs,
  footer: {
    logoUrl: "",
    brandName: "KUBERA RATNA",
    tagline: "Fine Jewellery · Handcrafted with Love",
    rightsText: "© 2024 KUBERA RATNA Fine Jewellery. All rights reserved.",
    madeInLabel: "Made with love in India",
    ctaLabel: "Chat on WhatsApp",
    ctaHref: "https://wa.me/917032716188",
    linkGroups: [
      {
        id: "collections",
        title: "Collections",
        links: [
          { id: "collections-necklaces", label: "Necklaces", href: "#" },
          { id: "collections-rings", label: "Rings", href: "#" },
          { id: "collections-bangles", label: "Bangles", href: "#" },
          { id: "collections-earrings", label: "Earrings", href: "#" },
          { id: "collections-chains", label: "Chains", href: "#" },
          { id: "collections-pendants", label: "Pendants", href: "#" },
        ],
      },
      {
        id: "help",
        title: "Help",
        links: [
          { id: "help-faq", label: "FAQ", href: "#" },
          { id: "help-shipping", label: "Shipping Policy", href: "#" },
          { id: "help-returns", label: "Return Policy", href: "#" },
          { id: "help-size-guide", label: "Size Guide", href: "#" },
          { id: "help-care", label: "Care Instructions", href: "#" },
        ],
      },
    ],
    contacts: [
      {
        id: "contact-whatsapp",
        type: "whatsapp",
        label: "WhatsApp",
        value: "+91 7032716188",
        href: "https://wa.me/917032716188",
      },
      {
        id: "contact-address",
        type: "address",
        label: "Address",
        value: "Hyderabad, Telangana\nIndia - 500001",
      },
    ],
    socials: [
      { id: "social-facebook", platform: "facebook", label: "Facebook", href: "#" },
      { id: "social-instagram", platform: "instagram", label: "Instagram", href: "#" },
      { id: "social-youtube", platform: "youtube", label: "YouTube", href: "#" },
      { id: "social-twitter", platform: "twitter", label: "Twitter", href: "#" },
    ],
  },
};

function normalizeStoreContent(content?: Partial<StoreContent>): StoreContent {
  return {
    aboutUs: {
      ...defaultStoreContent.aboutUs,
      ...(content?.aboutUs ?? {}),
      images: content?.aboutUs?.images ?? defaultStoreContent.aboutUs.images,
      highlights: content?.aboutUs?.highlights ?? defaultStoreContent.aboutUs.highlights,
    },
    footer: {
      ...defaultStoreContent.footer,
      ...(content?.footer ?? {}),
      linkGroups: content?.footer?.linkGroups ?? defaultStoreContent.footer.linkGroups,
      contacts: content?.footer?.contacts ?? defaultStoreContent.footer.contacts,
      socials: content?.footer?.socials ?? defaultStoreContent.footer.socials,
    },
  };
}

function isStoreContent(value: unknown): value is Partial<StoreContent> {
  return (
    typeof value === "object" &&
    value !== null &&
    (("aboutUs" in value && typeof (value as any).aboutUs === "object") ||
      ("footer" in value && typeof (value as any).footer === "object"))
  );
}

function extractStoreContent(value: unknown): Partial<StoreContent> | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  if (isStoreContent(value)) {
    return {
      aboutUs: (value as Partial<StoreContent>).aboutUs,
      footer: (value as Partial<StoreContent>).footer,
    };
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const content = extractStoreContent(item);
      if (content) {
        return content;
      }
    }
  }

  return undefined;
}

function pickStoreContent(response: unknown): Partial<StoreContent> | undefined {
  if (!response || typeof response !== "object") {
    return undefined;
  }

  const maybeResponse = response as SiteContentResponse;

  // The API may return the content directly, or wrapped inside { data: [...] }
  const directContent = extractStoreContent(maybeResponse);
  if (directContent) {
    return directContent;
  }

  return extractStoreContent(maybeResponse.data);
}

function detectMediaType(url: string): MediaItem["type"] {
  const normalizedUrl = url.toLowerCase();

  if (
    normalizedUrl.includes("/video/upload/") ||
    normalizedUrl.endsWith(".mp4") ||
    normalizedUrl.endsWith(".webm") ||
    normalizedUrl.endsWith(".mov") ||
    normalizedUrl.endsWith(".m4v") ||
    normalizedUrl.endsWith(".avi")
  ) {
    return "video";
  }

  return "image";
}

function normalizeMedia(images?: string[]): MediaItem[] {
  return (images ?? []).map((url, index) => ({
    type: detectMediaType(url),
    url,
    name: `image-${index + 1}`,
  }));
}

function normalizeCategory(category?: string) {
  const normalized = (category || DEFAULT_CATEGORIES[0]).trim().toLowerCase();
  return normalized;
}

function normalizeProduct(product: BackendProduct): Product {
  return {
    id: product.id,
    title: product.productName,
    price: Number(product.price),
    originalPrice: product.discountPercentage
      ? Math.round(Number(product.price) / (1 - product.discountPercentage / 100))
      : Number(product.price),
    discountPercent: product.discountPercentage || undefined,
    description: product.description || "",
    category: normalizeCategory(product.category) as Product["category"],
    media: normalizeMedia(product.images),
    createdAt: product.createdAt ? new Date(product.createdAt).getTime() : Date.now(),
    available: product.isActive,
    // quantity: product.quantity ?? 0,
  };
}

function toBackendPayload(product: Partial<Product>) {
  return {
    productName: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercent ?? 0,
    images: (product.media ?? []).map(item => item.url),
    category: normalizeCategory(product.category),
    isActive: product.available,
    // quantity: product.quantity ?? 0,
  };
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await api("/products");
  return (response.data as BackendProduct[]).map(normalizeProduct);
});

export const fetchStoreContent = createAsyncThunk("products/fetchStoreContent", async () => {
  const response = await api("/site-content");
  return normalizeStoreContent(pickStoreContent(response));
});

export const saveStoreContent = createAsyncThunk(
  "products/saveStoreContent",
  async (content: StoreContent) => {
    // Only send aboutUs and footer, without id/key
    const payload = {
      aboutUs: content.aboutUs,
      footer: content.footer,
    };

    const response = await api("/site-content", {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return normalizeStoreContent(pickStoreContent(response));
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id" | "createdAt">) => {
    const response = await api("/products", {
      method: "POST",
      body: JSON.stringify(toBackendPayload(product)),
    });

    return normalizeProduct(response.data as BackendProduct);
  }
);

export const updateProduct = createAsyncThunk("products/updateProduct", async (product: Product) => {
  const response = await api(`/products/${product.id}`, {
    method: "PATCH",
    body: JSON.stringify(toBackendPayload(product)),
  });

  return normalizeProduct(response.data as BackendProduct);
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string) => {
  await api(`/products/${id}`, { method: "DELETE" });
  return id;
});

export const toggleAvailability = createAsyncThunk(
  "products/toggleAvailability",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const product = state.products.items.find(item => item.id === id);

    if (!product) {
      throw new Error("Product not found");
    }

    const response = await api(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(toBackendPayload({ ...product, available: !product.available })),
    });

    return normalizeProduct(response.data as BackendProduct);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    storeContent: defaultStoreContent,
    status: "idle",
    contentStatus: "idle",
    error: null,
  } as ProductsState,
  reducers: {
    updateStoreContent(state, action: PayloadAction<StoreContent>) {
      state.storeContent = normalizeStoreContent(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load products";
      })
      .addCase(fetchStoreContent.pending, state => {
        state.contentStatus = "loading";
      })
      .addCase(fetchStoreContent.fulfilled, (state, action) => {
        state.contentStatus = "succeeded";
        state.storeContent = action.payload;
      })
      .addCase(fetchStoreContent.rejected, (state, action) => {
        state.contentStatus = "failed";
        state.error = action.error.message || "Failed to load site content";
      })
      .addCase(saveStoreContent.pending, state => {
        state.contentStatus = "loading";
      })
      .addCase(saveStoreContent.fulfilled, (state, action) => {
        state.contentStatus = "succeeded";
        state.storeContent = action.payload;
      })
      .addCase(saveStoreContent.rejected, (state, action) => {
        state.contentStatus = "failed";
        state.error = action.error.message || "Failed to save site content";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
      })
      .addCase(toggleAvailability.fulfilled, (state, action) => {
        state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addMatcher(
        action => action.type.startsWith("products/") && action.type.endsWith("/rejected"),
        (state, action: { error?: { message?: string } }) => {
          state.error = action.error?.message || "Product request failed";
        }
      );
  },
});

export const { updateStoreContent } = productsSlice.actions;
export default productsSlice.reducer;
