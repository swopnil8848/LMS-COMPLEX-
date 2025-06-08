// store.ts or store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // adjust path

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
