// Cards.tsx
import React from "react";
import Card from "../Card/Card";
import { IProduct } from "@/types";
import Link from "next/link";

interface CardsProps {
  products: IProduct[];
}

const Cards: React.FC<CardsProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500">No hay productos disponibles.</p>
    );
  }

  return (
    <section className="flex justify-center py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Link
    className="cursor-pointer hover:scale-105 transition-transform duration-200"
    href={`/product/${product.id}`}
    passHref
  >
    <Card {...product} />
  </Link>
);

export default Cards;
