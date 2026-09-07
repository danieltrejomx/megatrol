import { createContext, useContext, useState, type ReactNode } from 'react';
import { parsePresentations, type Product } from '../data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedPresentation?: string;
  selectedAroma?: string;
  unitPrice: number;
  activeImage: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, presentation?: string, aroma?: string) => void;
  removeFromCart: (itemId: string | number) => void;
  updateQuantity: (itemId: string | number, quantity: number) => void;
  updateItemVariant: (itemId: string | number, newPresentation?: string, newAroma?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const resolveUnitPrice = (product: Product, presentation?: string): number => {
  if (presentation && product.presentationPrices?.[presentation] !== undefined) {
    const p = product.presentationPrices[presentation];
    if (typeof p === 'number') return p;
  }
  return product.price;
};

const resolveActiveImage = (product: Product, presentation?: string, aroma?: string): string => {
  if (aroma && product.aromaImages?.[aroma]) {
    return product.aromaImages[aroma];
  }
  if (presentation && product.presentationImages?.[presentation]) {
    return product.presentationImages[presentation];
  }
  return product.image;
};

const makeItemKey = (productId: number, presentation?: string, aroma?: string): string => {
  return `${productId}_${presentation || 'default'}_${aroma || 'default'}`;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, presentation?: string, aroma?: string) => {
    const presentations = parsePresentations(product.presentation);
    const finalPres = presentation || (presentations.length > 0 ? presentations[0] : undefined);
    const finalAroma = aroma || (product.aromas && product.aromas.length > 0 ? product.aromas[0] : undefined);
    const unitPrice = resolveUnitPrice(product, finalPres);
    const activeImage = resolveActiveImage(product, finalPres, finalAroma);
    const key = makeItemKey(product.id, finalPres, finalAroma);

    setItems(prev => {
      const existing = prev.find(i => i.id === key || (i.product.id === product.id && i.selectedPresentation === finalPres && i.selectedAroma === finalAroma));
      if (existing) {
        return prev.map(i =>
          i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, {
        id: key,
        product,
        quantity,
        selectedPresentation: finalPres,
        selectedAroma: finalAroma,
        unitPrice,
        activeImage
      }];
    });
  };

  const updateItemVariant = (itemId: string | number, newPresentation?: string, newAroma?: string) => {
    setItems(prev => {
      const target = prev.find(i => i.id === String(itemId) || i.product.id === itemId);
      if (!target) return prev;

      const finalPres = newPresentation !== undefined ? newPresentation : target.selectedPresentation;
      const finalAroma = newAroma !== undefined ? newAroma : target.selectedAroma;
      const newKey = makeItemKey(target.product.id, finalPres, finalAroma);
      const unitPrice = resolveUnitPrice(target.product, finalPres);
      const activeImage = resolveActiveImage(target.product, finalPres, finalAroma);

      const duplicate = prev.find(i => i.id === newKey && i.id !== target.id);
      if (duplicate) {
        return prev
          .filter(i => i.id !== target.id)
          .map(i => i.id === duplicate.id ? { ...i, quantity: i.quantity + target.quantity } : i);
      }

      return prev.map(i => {
        if (i.id === target.id) {
          return {
            ...i,
            id: newKey,
            selectedPresentation: finalPres,
            selectedAroma: finalAroma,
            unitPrice,
            activeImage
          };
        }
        return i;
      });
    });
  };

  const removeFromCart = (itemId: string | number) => {
    setItems(prev => prev.filter(i => i.id !== String(itemId) && i.product.id !== itemId));
  };

  const updateQuantity = (itemId: string | number, quantity: number) => {
    if (quantity < 1) { removeFromCart(itemId); return; }
    setItems(prev => prev.map(i => (i.id === String(itemId) || i.product.id === itemId) ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.unitPrice ?? i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, updateItemVariant, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
