import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      const existingProduct = state.items.find((item) => item.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter((item) => item.id !== productId);
    },

    clearCart: (state) => {
      state.items = [];
    },

    removeSelectedFromCart: (state, action) => {
      const selectedIds = action.payload;

      state.items = state.items.filter(
        (item) => !selectedIds.includes(item.id),
      );
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  removeSelectedFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
