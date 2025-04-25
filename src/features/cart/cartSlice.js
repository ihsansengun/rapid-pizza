import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  /*cart: [
    {
      pizzaId: 12,
      name: "Mediterranean Tr",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 320,
    },
  ],*/
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // Check if the item is already in the cart
      const existingItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );

      if (existingItem) {
        // If the item exists, increase its quantity and update the total price
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice += action.payload.totalPrice;
      } else {
        // If it's a new item, add it to the cart
        state.cart.push(action.payload);
      }
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getUserName = (state) => state.user.username;

// check reselect library for more optimised way

export const getCurrentQuantityByID = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
