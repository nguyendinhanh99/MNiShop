import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import cartReducer from "./slices/cart";
import purchaseReducer from './slices/purchaseSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    purchase: purchaseReducer, // Lưu ý đổi tên thành purchaseReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
