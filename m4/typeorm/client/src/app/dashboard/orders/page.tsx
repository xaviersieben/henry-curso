'use client';

import { getOrder } from "@/services/orders.services";
import { IOrders, userSession } from "@/types";
import React, { useEffect, useState, useCallback } from "react";

const Orders: React.FC = () => {
  const [userData, setUserData] = useState<userSession | null>(null);
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper para obtener datos del usuario
  const fetchUserData = useCallback(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userDataString = localStorage.getItem("userSession");
      if (userDataString) {
        try {
          const parsedUserData: userSession = JSON.parse(userDataString);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing userSession from localStorage", error);
        }
      }
    }
  }, []);

  // Obtener órdenes del usuario autenticado
  const fetchOrders = useCallback(async () => {
    if (!userData?.token) return;

    setLoading(true);
    try {
      const fetchedOrders = await getOrder(userData.token);
      setOrders(fetchedOrders.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [userData?.token]);

  // Efecto para cargar datos del usuario al montar el componente
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Efecto para cargar órdenes cuando cambie el token del usuario
  useEffect(() => {
    if (userData?.token) {
      fetchOrders();
    }
  }, [userData?.token, fetchOrders]);

  return (
    <div className="w-full min-h-screen bg-gray-300 border-2 border-black py-10 md:py-20 px-3">
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="mt-4">
            <div className="bg-green-300 flex flex-col border p-4 md:p-8 rounded shadow-xl m-4 space-y-4">
              <div className="flex flex-row space-x-4">
                <p className="font-bold">Order ID:</p>
                <p>{order.id}</p>
              </div>
              <div className="flex flex-row space-x-4">
                <p className="font-bold">Date:</p>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-row space-x-4">
                <p className="font-bold">Status:</p>
                <p>{order.status}</p>
              </div>
              <div>
                <p className="font-bold">Products:</p>
                <ul className="list-disc pl-6">
                  {order.products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders to show</p>
      )}
    </div>
  );
};

export default Orders;
