"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import CartHydration from "@/components/CartHydration";

let store: AppStore | null = null;

function getStore() {
  if (!store) {
    store = makeStore();
  }
  return store;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeInstance = getStore();

  return (
    <Provider store={storeInstance}>
      <CartHydration />
      {children}
    </Provider>
  );
}
