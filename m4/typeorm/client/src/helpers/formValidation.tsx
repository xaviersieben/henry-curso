import { LoginErrorsProps, LoginProps,RegisterErrorsProps,RegisterProps } from "@/types";

export function validateLogin(values: LoginProps): LoginErrorsProps {
  const errors: LoginErrorsProps = {
    email: "", // Inicializamos con valores vacíos
    password: "", // Inicializamos con valores vacíos
  };

  if (!values.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email is invalid";
  
  if (!values.password) errors.password = "Password is required";

  return errors;
}

export function validateRegister(values: RegisterProps): RegisterErrorsProps {
  const errors: RegisterErrorsProps = {
    email: "", // Inicializamos con valores vacíos
    password: "",
    address: "",
    phone: "",
    name: "",
  };

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = "Password must contain at least one special character";
  }

  // Address validation
  if (!values.address) {
    errors.address = "Address is required";
  } else if (values.address.length < 5) {
    errors.address = "Address must be at least 5 characters long";
  }

  // Phone number validation
  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits long";
  }

  // Name validation
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  return errors;
}
