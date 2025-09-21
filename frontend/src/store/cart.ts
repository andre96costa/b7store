import { CartItem } from "@/types/cart-item"
import { create } from "zustand";


type CartState = {
    cart: CartItem[];
    shippingZipcode: string;
    shippingCost: number;
    shippingDays: number;
    selectedAddressId: number | null;
    addItem: (cartItem: CartItem) => void;
    removeItem: (productId: string | number, quantity: number) => void;
    setShippingZipcode: (zipcode: string) => void;
    setShippingDays: (days: number) => void;
    setSelectedAddressId: (id: number | null) => void;
    clearCart: () => void;
    clearShipping: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    shippingZipcode: '',
    shippingCost: 0,
    shippingDays: 0,
    selectedAddressId: null,
    addItem: ({ productId, quantity }) => set(state => {}),
    removeItem: ({ productId }) => set(state => {}),
    updateQuantity: ({ productId, quantity }) => set(state => {}),
    setShippingZipcode: (zipcode) => set(state => {}),
    setShippingDays: (days) => set(state => {}),
    setSelectedAddressId: (id) => set(state => {}),
    clearCart: () => set({ cart:[], shippingZipcode: '', shippingCost: 0, shippingDays: 0, selectedAddressId: null }),
    clearShipping: () => set({ shippingZipcode: '', shippingCost: 0, shippingDays: 0, selectedAddressId: null }),
}));