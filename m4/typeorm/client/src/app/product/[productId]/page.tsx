"use client";

import { getProductById } from "@/services/products.services";
import { IProduct, userSession } from "@/types";
import Image from "next/image";
//import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailProduct: React.FC<{ params: { productId: string } }> = ({
  params,
}) => {
  //const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [userData, setUserData] = useState<userSession | null>(null);

  // Cargar datos del producto y del usuario
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await getProductById(params.productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details.");
      }
    };

    const loadUserData = () => {
      if (typeof window !== "undefined") {
        const userDataString = localStorage.getItem("userSession");
        if (userDataString) {
          try {
            setUserData(JSON.parse(userDataString));
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }
      }
    };

    fetchProductData();
    loadUserData();
  }, [params.productId]);

  // Añadir producto al carrito
  const handleAddToCart = () => {
    if (!userData?.token) {
      toast.warning("You must be logged in to add products to the cart.");
      return;
    }

    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as IProduct[];
    const productExists = storedCart.some(
      (cartItem) => cartItem.id === product?.id
    );

    if (productExists) {
      toast.error("This product is already in your cart.");
    } else {
      const updatedCart = [...storedCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product added to your cart.");
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section: Product Image */}
        <div className="overflow-hidden">
          <Image
            src={product.image}
            alt={`Image of ${product.name}`}
            className="w-full rounded shadow-lg"
            width={64}
            height={64}
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="px-4 py-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <a
            href="#"
            className="block mt-2 text-sm uppercase font-medium text-white bg-blue-500 py-1 px-2 rounded hover:opacity-90"
          >
            Official Store
          </a>
          <p className="mt-4 text-xl text-red-600 font-bold">
            Price: ${product.price}
          </p>

          <h2 className="mt-6 text-lg font-semibold">About this item:</h2>
          <p className="mt-2 text-sm text-gray-700">{product.description}</p>

          <ul className="mt-6 space-y-2">
            <li>
              <span className="font-semibold">Available:</span> {product.stock}
            </li>
            <li>
              <span className="font-semibold">Shipping Area:</span> All over the
              world
            </li>
            <li>
              <span className="font-semibold">Shipping Fee:</span> Free
            </li>
          </ul>

          <div className="mt-6">
            {userData?.token ? (
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            ) : (
              <p className="mt-4 text-red-500">
                Please{" "}
                <a href="/login" className="underline">
                  log in
                </a>{" "}
                to make a purchase.
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DetailProduct;
