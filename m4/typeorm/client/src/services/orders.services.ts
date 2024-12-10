import { IOrders } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Interfaz para respuestas API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Helper para generar cabeceras comunes
const createHeaders = (token: string): HeadersInit => ({
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
  Authorization: token,
});

// Cliente genérico para solicitudes API
async function apiClient<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, options);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `API error: ${response.status} - ${
          errorBody.message || response.statusText
        }`
      );
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in API call:", error.message);
      throw new Error(
        error.message || "An unexpected error occurred during the API request."
      );
    } else {
      console.error("Unexpected error in API call:", error);
      throw new Error("An unexpected error occurred during the API request.");
    }
  }
}

// Crear una orden
export async function createOrder(
  products: number[],
  token: string
): Promise<ApiResponse<IOrders>> {
  return apiClient<ApiResponse<IOrders>>("/orders", {
    method: "POST",
    headers: createHeaders(token),
    body: JSON.stringify({ products }),
  });
}

// Obtener órdenes del usuario
export async function getOrder(token: string): Promise<ApiResponse<IOrders[]>> {
  return apiClient<ApiResponse<IOrders[]>>("/users/orders", {
    method: "GET",
    cache: "no-cache",
    headers: createHeaders(token),
  });
}
