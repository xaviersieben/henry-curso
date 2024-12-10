'use client';

import { userSession } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [userData, setUserData] = useState<userSession | null>(null);
  const pathname = usePathname();

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userSession");
      setUserData(storedUserData ? JSON.parse(storedUserData) : null);
    }
  }, [pathname]);

  // Manejar cierre de sesión
  const handleLogOut = () => {
    localStorage.clear();
    setUserData(null);
  };

  // Renderizar enlaces según el estado de sesión
  const renderLinks = () => {
    if (userData?.token) {
      return (
        <>
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/cart" label="Cart" />
          <NavLink
            href="/login"
            label="Log out"
            onClick={handleLogOut}
            className="bg-[#e19b9b] hover:bg-[#ee7474]"
          />
        </>
      );
    } else {
      return (
        <>
          <NavLink
            href="/login"
            label="Sign in"
            className="bg-[#a6c1ee] hover:bg-[#87acec]"
          />
          <NavLink
            href="/register"
            label="Sign up"
            className="bg-[#9be1c4] hover:bg-[#87ecd3]"
          />
        </>
      );
    }
  };

  // Renderizar menú móvil
  const renderMobileMenu = () => {
    if (userData?.token) {
      return (
        <>
          <MobileLink href="/" label="Home" />
          <MobileLink href="/dashboard" label="Dashboard" />
          <MobileLink href="/cart" label="Cart" />
          <MobileLink href="/login" label="Log out" onClick={handleLogOut} />
        </>
      );
    } else {
      return (
        <>
          <MobileLink href="/" label="Home" />
          <MobileLink href="/login" label="Sign in" />
          <MobileLink href="/register" label="Sign up" />
        </>
      );
    }
  };

  return (
    <header>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/3714/3714797.png"
              alt="logo"
              width={64}
              height={64}
              className="w-16"
            />
            <button className="ml-4 md:hidden text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <input
              type="text"
              className="border border-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Buscar..."
            />
            <NavLink href="/" label="Home" />
            {renderLinks()}
          </div>
        </div>
        <div className="md:hidden mt-4">{renderMobileMenu()}</div>
      </nav>
    </header>
  );
};

// Componente reutilizable para enlaces
interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, className, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-white px-6 py-2 rounded-full ${className}`}
  >
    {label}
  </Link>
);

const MobileLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => (
  <Link href={href} onClick={onClick} className="block px-4 py-2 text-white">
    {label}
  </Link>
);

export default Navbar;
