"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { hydrate } from "@/lib/cart/cartSlice";

export default function CartHydration() {
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector((state) => state.cart.isHydrated);

  useEffect(() => {
    if (!isHydrated) {
      dispatch(hydrate());
    }
  }, [dispatch, isHydrated]);

  return null;
}
