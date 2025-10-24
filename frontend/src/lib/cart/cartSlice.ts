import { ICartProducte } from "@/interfaces/ICartInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem extends ICartProducte {
  quantity: number;
}

interface ICartstate {
  items: ICartItem[];
  quantity: number;
  totalPrice: number;
}

const initialState: ICartstate = {
  items: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      const subTotal = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalPrice = subTotal;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
