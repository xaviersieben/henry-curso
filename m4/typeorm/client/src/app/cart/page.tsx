"use client";

import { createOrder } from "@/services/orders.services";
import { IProduct, userSession } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState<userSession | null>(null);

  const router = useRouter();

  // Cargar datos de usuario
  const fetchUserData = useCallback(() => {
    const userDataString = localStorage.getItem("userSession");
    if (userDataString) {
      try {
        const parsedUserData: userSession = JSON.parse(userDataString);
        setUserData(parsedUserData);
        if (!parsedUserData.token) router.push("/login");
      } catch (error) {
        console.error("Error parsing userSession from localStorage:", error);
      }
    }
  }, [router]);

  // Cargar carrito de compras
  const fetchCartData = useCallback(() => {
    const storedCartString = localStorage.getItem("cart") || "[]";
    try {
      const storedCart: IProduct[] = JSON.parse(storedCartString);
      setCart(storedCart);
      const totalPrice = storedCart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchCartData();
  }, [fetchUserData, fetchCartData]);

  const handleCheckout = async () => {
    if (!userData?.token) return toast.error("User not authenticated.");

    try {
      const uniqueProductIds = Array.from(
        new Set(cart.map((product) => product.id))
      );
      await createOrder(uniqueProductIds, userData.token);

      toast.success("Order placed successfully!", { theme: "colored" });
      setCart([]);
      setTotal(0);
      localStorage.setItem("cart", "[]");
    } catch (error: unknown) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center px-5">
        {/* Tabla de encabezados */}
        <div className="grid grid-cols-4 gap-4 w-full bg-gray-200 py-2 px-4 rounded-t-lg font-bold">
          <span>Item</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Subtotal</span>
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-4 gap-4 w-full px-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <React.Fragment key={item.id}>
                <div className="border p-2 rounded">{item.name}</div>
                <div className="border p-2 rounded">1</div>
                <div className="border p-2 rounded">${item.price}</div>
                <div className="border p-2 rounded">${item.price}</div>
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-4 text-center py-4">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* Total y botón de checkout */}
        <div className="w-full flex flex-col items-end py-4 px-4 bg-gray-100 rounded-b-lg">
          <p className="font-bold">Total: ${total}</p>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 mt-4"
          >
            Checkout
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Cart;
