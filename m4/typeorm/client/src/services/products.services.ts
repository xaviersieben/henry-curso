// services/product.service.ts
import { IProduct } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NODE_ENV === "development" && {
          "ngrok-skip-browser-warning": "true",
        }),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Hubo un problema al conectar con la API.");
  }
}

export async function getProducts(): Promise<IProduct[]> {
  return fetchApi<IProduct[]>("/product");
}

export async function getProductById(id: string): Promise<IProduct> {
  return fetchApi<IProduct>(`/products/${id}`);
}
