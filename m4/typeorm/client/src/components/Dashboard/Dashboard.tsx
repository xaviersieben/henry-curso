"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { userSession } from "@/types";

const Dashboard = () => {
  const [userData, setUserData] = useState<userSession | null>(null);
  const [menuOpen, setMenuOpen] = useState(true);

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const storedUserData = localStorage.getItem("userSession");
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        }
      } catch (error) {
        console.error("Error reading user data from localStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  // Componente del menú lateral
  const Sidebar = () => (
    <aside
      className={`${
        menuOpen ? "w-64" : "w-20"
      } bg-blue-600 h-screen fixed top-0 left-0 transition-all duration-300 z-10`}
    >
      <div className="relative flex items-center justify-between p-4">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/9966/9966194.png"
          alt="Logo"
          width={40}
          height={40}
          className={`transition-transform duration-500 ${
            menuOpen && "rotate-[360deg]"
          }`}
        />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-blue-700 p-2 rounded-full hover:bg-blue-800"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/128/54/54623.png"
            alt="Toggle Menu"
            width={20}
            height={20}
            priority
          />
        </button>
      </div>
      <ul className="mt-4">
        <MenuItem href="/dashboard/" label="Profile" />
        <MenuItem href="/dashboard/orders" label="Orders" />
      </ul>
    </aside>
  );

  // Componente de ítem del menú
  const MenuItem = ({ href, label }: { href: string; label: string }) => (
    <li className="my-2">
      <Link
        href={href}
        className="block p-3 text-white hover:bg-blue-700 rounded-lg transition-all duration-200"
      >
        {label}
      </Link>
    </li>
  );

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`flex-grow min-h-screen ml-${
          menuOpen ? "64" : "20"
        } transition-all duration-300 bg-gray-100 p-6`}
      >
        <h1 className="text-2xl font-bold text-gray-700">
          Bienvenido, {userData?.userData?.name || "Invitado"} 👋
        </h1>
        <p className="text-gray-600">¡Explora tu panel de control!</p>
      </main>
    </div>
  );
};

export default Dashboard;
