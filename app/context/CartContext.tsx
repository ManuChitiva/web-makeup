"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "camilapalaciosmakeup-cart";

function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is CartItem =>
        row != null &&
        typeof row === "object" &&
        "productId" in row &&
        "quantity" in row &&
        typeof (row as CartItem).productId === "string" &&
        typeof (row as CartItem).quantity === "number" &&
        (row as CartItem).quantity >= 1
    );
  } catch {
    return [];
  }
}

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getQuantity: (productId: string) => number;
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(parseStoredCart(localStorage.getItem(CART_STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [items, hydrated]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const getQuantity = useCallback(
    (productId: string) =>
      items.find((i) => i.productId === productId)?.quantity ?? 0,
    [items]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        getQuantity,
        totalItems,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
