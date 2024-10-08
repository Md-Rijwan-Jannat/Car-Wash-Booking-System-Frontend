import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth/authSlice";
import SlotBookmarkReducer from "./features/user/slotBookmarkSlice";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

// Auth persist
const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);
// Slot booking persist
const persistedSlotBookmarkReducer = persistReducer(
  persistConfig,
  SlotBookmarkReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    slotBookmarks: persistedSlotBookmarkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
