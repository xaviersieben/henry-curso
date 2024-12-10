"use client";

import { validateLogin } from "@/helpers/formValidation";
import { login } from "@/services/login.services";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/components/InputFields/InputField";
import ForgotPasswordLink from "@/components/ForgotPasswordLink/ForgotPasswordLink";
import RegisterLink from "@/components/RegisterLink/RegisterLink";
import { LoginErrorsProps } from "@/types";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<LoginErrorsProps>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const errors = validateLogin(formData);
    setFormErrors(errors);
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateLogin(formData);
    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      toast.error("Por favor corrige los errores antes de continuar.");
      return;
    }

    try {
      const response = await login(formData);

      console.log(response);
      // Verificar si la respuesta tiene los valores esperados
      if (response && response.token) {
        const { token, user } = response;
        localStorage.setItem(
          "userSession",
          JSON.stringify({ token, userData: user })
        );
        setCookie(null, "userSession", response.token, {
          path: "/",
          secure: true,
        });
        toast.success("¡Inicio de sesión exitoso!");
        router.push("/dashboard");
      } else {
        throw new Error("No se recibió un token válido.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error al iniciar sesión: ${error.message}`);
        console.error("Login Error:", error.message);
      } else {
        // Si el error no es un objeto de tipo Error, se maneja como un error genérico
        toast.error("Error desconocido al intentar iniciar sesión.");
        console.error("Login Error:", error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
        placeholder="example@hotmail.com"
      />
      <InputField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
        placeholder="****************"
      />
      <button
        type="submit"
        className="bg-[#002D74] rounded-xl text-white py-2 px-20 hover:scale-105 duration-300"
      >
        Iniciar Sesión
      </button>
      <ForgotPasswordLink />
      <RegisterLink />
      <ToastContainer />
    </form>
  );
};

export default LoginForm;
