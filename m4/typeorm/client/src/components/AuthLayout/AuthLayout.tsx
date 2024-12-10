import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageUrl }) => (
  <section className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-blue-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
      <div className="md:w-1/2 px-8 md:px-16">{children}</div>
      <div className="sm:block hidden w-1/2">
        <Image
          className="rounded-2xl"
          src={imageUrl}
          alt="Authentication"
          width={1500}
          height={1500}
        />
      </div>
    </div>
  </section>
);

export default AuthLayout;
