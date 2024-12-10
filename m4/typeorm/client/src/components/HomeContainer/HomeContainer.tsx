// components/HomeContainer.tsx
import React from "react";
import Cards from "../Cards/Cards";
import Slider from "../Slider/Slider";
import announce from "@/helpers/Publicity";
import topRating from "@/helpers/TopRating";
import { getProducts } from "@/services/products.services";

const HomeContainer = async () => {
  try {
    const products = await getProducts();

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Slider announcements={announce} />
        </div>
        <div className="col-span-1 md:col-span-1">
          <Slider announcements={topRating} />
        </div>
        <div className="col-span-1 md:col-span-3">
          <Cards products={products} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering HomeContainer:", error);
    return (
      <p className="text-center text-red-500">Error cargando los datos.</p>
    );
  }
};

export default HomeContainer;
