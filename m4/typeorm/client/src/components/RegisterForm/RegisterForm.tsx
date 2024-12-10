"use client";

import { validateRegister } from "@/helpers/formValidation";
import { register } from "@/services/login.services"; // Actualiza la ruta si es necesario.
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/components/InputFields/InputField"; // Reutiliza el mismo componente de InputField.
import { RegisterErrorsProps } from "@/types";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<RegisterErrorsProps>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const errors = validateRegister(formData);
    setFormErrors(errors);
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateRegister(formData);
    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      toast.error("Por favor corrige los errores antes de continuar.");
      return;
    }

    try {
      const response = await register(formData);

      if (response?.success) {
        toast.success("¡Registro exitoso!");
        router.push("/login");
      } else {
        throw new Error(
          "No se pudo completar el registro."
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error al registrarse: ${error.message}`);
        console.error("Register Error:", error.message);
      } else {
        toast.error("Error desconocido al intentar registrarse.");
        console.error("Register Error:", error);
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
      <InputField
        label="Nombre"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={formErrors.name}
        placeholder="Juan Pérez"
      />
      <InputField
        label="Dirección"
        name="address"
        type="text"
        value={formData.address}
        onChange={handleChange}
        error={formErrors.address}
        placeholder="Calle 123, Ciudad"
      />
      <InputField
        label="Teléfono"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={formErrors.phone}
        placeholder="123-456-7890"
      />
      <button
        type="submit"
        className="bg-[#28a745] rounded-xl text-white py-2 px-20 hover:scale-105 duration-300"
      >
        Registrarse
      </button>
      <ToastContainer />
    </form>
  );
};

export default RegisterForm;
