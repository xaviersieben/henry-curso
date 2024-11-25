import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite cualquier dominio HTTPS
        pathname: "/**", // Permite cualquier ruta
      },
    ],
  },
};

export default nextConfig;
