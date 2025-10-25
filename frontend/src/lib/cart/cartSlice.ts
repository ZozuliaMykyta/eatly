import { ICartProducts } from "@/interfaces/ICartProducts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизированная функция для работы с localStorage
const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : defaultValue;
  }
  return defaultValue;
};

interface ICartItem extends ICartProducts {
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
  quantity: number;
  totalPrice: number;
  isHydrated: boolean;
}

const initialState: ICartState = {
  items: [],
  quantity: 0,
  totalPrice: 0,
  isHydrated: false,
};

const saveCartToLocalStorage = (state: ICartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
    localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate: (state) => {
      const cartItems = getFromLocalStorage<ICartItem[]>("cartItems", []);
      const totalPrice = getFromLocalStorage<number>("totalPrice", 0);

      state.items = cartItems;
      state.totalPrice = totalPrice;
      state.isHydrated = true;
    },
    addItem: (state, action: PayloadAction<ICartProducts>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToLocalStorage(state);
    },
    calculateTotal: (state) => {
      const subTotal = state.items
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
      state.totalPrice = parseFloat(subTotal);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        cartSlice.caseReducers.calculateTotal(state);
        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        cartSlice.caseReducers.calculateTotal(state);
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  hydrate,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
