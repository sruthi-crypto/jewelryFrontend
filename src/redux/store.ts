import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';
import usersReducer from './usersSlice';
import adminUsersReducer from "./adminUsersSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
    users: usersReducer,
    adminUsers: adminUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
