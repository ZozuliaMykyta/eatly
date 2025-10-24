"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const CartProducts: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <div>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <h6>{item.price}</h6>
                  </div>
                </div>
                <div>
                  <div>
                    <button>-</button>
                    <span></span>
                    <button>+</button>
                  </div>
                  <h6></h6>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartProducts;
