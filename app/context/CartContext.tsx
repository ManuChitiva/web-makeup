"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { CATALOG_SERVICES } from "../data/services";

const STORAGE_KEY = "camilapalaciosmakeup-services-selection";
const serviceIds = new Set(CATALOG_SERVICES.map((service) => service.id));

type SelectionContextType = {
  items: string[];
  addItem: (serviceId: string) => void;
  removeItem: (serviceId: string) => void;
  clear: () => void;
  hasItem: (serviceId: string) => boolean;
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const SelectionContext = createContext<SelectionContextType | null>(null);

function parseSelection(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string" && serviceIds.has(id)))]
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = parseSelection(window.localStorage.getItem(STORAGE_KEY));
    queueMicrotask(() => {
      setItems(stored);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // La selección sigue funcionando en memoria si el navegador bloquea el almacenamiento.
    }
  }, [items, hydrated]);

  const addItem = useCallback((serviceId: string) => {
    if (!serviceIds.has(serviceId)) return;
    setItems((previous) => previous.includes(serviceId) ? previous : [...previous, serviceId]);
    setIsOpen(true);
  }, []);
  const removeItem = useCallback((serviceId: string) => {
    setItems((previous) => previous.filter((id) => id !== serviceId));
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const hasItem = useCallback((serviceId: string) => items.includes(serviceId), [items]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

  return (
    <SelectionContext.Provider value={{ items, addItem, removeItem, clear, hasItem, totalItems: items.length, isOpen, openCart, closeCart, toggleCart }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useCart(): SelectionContextType {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
