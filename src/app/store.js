import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoapi";
import { cryptoNewsApi } from "../services/cryptonewsapi";
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
