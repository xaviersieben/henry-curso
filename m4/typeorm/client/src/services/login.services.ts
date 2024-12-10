import { LoginProps, RegisterProps } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL no está configurado en el entorno.");
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function makeRequest<T>(
  endpoint: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  body?: unknown
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorDetails = await res.text();
      return {
        success: false,
        error: `Error ${res.status}: ${errorDetails}`,
      };
    }

    const data = (await res.json()) as T;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function register(userData: RegisterProps) {
  const response = await makeRequest<{ message: string }>(
    "/user/register",
    "POST",
    userData
  );
  if (!response.success) {
    console.error(response.error);
    throw new Error(response.error || "Failed to register");
  }

  return response;
}

export async function login(userData: LoginProps) {
  const response = await makeRequest<{ token: string; user: unknown }>(
    "/user/login",
    "POST",
    userData
  );

  if (!response.success) {
    console.error(response.error);
    throw new Error(response.error || "Failed to login");
  }

  return response.data;
}
