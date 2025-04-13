import { configureStore } from "@reduxjs/toolkit";
import { eatlyApi } from "./services/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [eatlyApi.reducerPath]: eatlyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(eatlyApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
