import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false } as CartState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(i => i.product.id === action.payload.id);
      if (existing) existing.qty += 1;
      else state.items.push({ product: action.payload, qty: 1 });
    },
    updateQty(state, action: PayloadAction<{ id: string; delta: number }>) {
      const item = state.items.find(i => i.product.id === action.payload.id);
      if (!item) return;
      item.qty += action.payload.delta;
      if (item.qty <= 0) state.items = state.items.filter(i => i.product.id !== action.payload.id);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },
    clearCart(state) { state.items = []; },
    openCart(state)  { state.isOpen = true; },
    closeCart(state) { state.isOpen = false; },
    toggleCart(state){ state.isOpen = !state.isOpen; },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart, openCart, closeCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
