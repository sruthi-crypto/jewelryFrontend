import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product, StoreState } from './store';
import { loadStore, saveProducts, saveStore } from './store';

interface AppContextType {
  state: StoreState;
  loginAdmin: (user: string, pass: string) => boolean;
  loginUser: (user: string, pass: string) => boolean;
  logout: () => void;
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(loadStore);

  useEffect(() => {
    saveStore({ products: state.products });
  }, [state.products]);

  const loginAdmin = useCallback((user: string, pass: string) => {
    if (user === 'admin' && pass === 'admin123') {
      setState(s => ({ ...s, isAdminLoggedIn: true }));
      return true;
    }
    return false;
  }, []);

  const loginUser = useCallback((user: string, pass: string) => {
    if (user === 'user' && pass === 'user123') {
      setState(s => ({ ...s, isUserLoggedIn: true }));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setState(s => ({ ...s, isAdminLoggedIn: false, isUserLoggedIn: false }));
  }, []);

  const addProduct = useCallback((p: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...p,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setState(s => {
      const products = [...s.products, newProduct];
      saveProducts(products);
      return { ...s, products };
    });
  }, []);

  const updateProduct = useCallback((updated: Product) => {
    setState(s => {
      const products = s.products.map(p => p.id === updated.id ? updated : p);
      saveProducts(products);
      return { ...s, products };
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState(s => {
      const products = s.products.filter(p => p.id !== id);
      saveProducts(products);
      return { ...s, products };
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, loginAdmin, loginUser, logout, addProduct, updateProduct, deleteProduct }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
