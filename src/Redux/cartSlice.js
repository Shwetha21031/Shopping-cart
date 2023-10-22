import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalAmount: 0,
    quantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const foundItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (foundItemIndex >= 0) {
        state.cart[foundItemIndex].itemQuantity += 1;
      } else {
        const alt = { ...action.payload, itemQuantity: 1 };
        state.cart = [...state.cart, alt];
      }
      toast.success(`${action.payload.title} added to cart`, {
        autoClose: 1000,
        position: "bottom-left",
      });
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    removeFromCart: (state, action) => {
      const foundItem = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (foundItem >= 0 && state.cart[foundItem].itemQuantity > 1) {
        state.cart[foundItem].itemQuantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
      toast.error(`${action.payload.title} removed from cart`,{
        autoClose: 1000,
        position: "bottom-left"
      })
       localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateTotal: (state, action) => {
      let sum = 0;
      for (let i = 0; i < state.cart.length; i++) {
        sum += state.cart[i].price * state.cart[i].itemQuantity;
      }
      state.totalAmount = sum;
    },
    updateQuantity: (state, action) => {
      let quantity = 0;
      for (let i = 0; i < state.cart.length; i++) {
        quantity += state.cart[i].itemQuantity;
      }
      state.quantity = quantity;
    },

    search: (state, action) => {
      const filteredItem = state.cart.filter(
        (item) =>
          item.title.toLowerCase().includes(action.payload) ||
          item.description.toLowerCase().includes(action.payload)
      );
      state.cart = filteredItem;
    },
    clearCart: (state,action) => {
      state.cart= []
      // Clear cart data in localStorage
      localStorage.removeItem("cart");
    }
  },
});

export default cartSlice.reducer;
export const {
  removeFromCart,
  addToCart,
  updateTotal,
  updateQuantity,
  updateTotals,
  clearCart
} = cartSlice.actions;
