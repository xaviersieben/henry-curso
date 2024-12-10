import AuthLayout from "@/components/AuthLayout/AuthLayout";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

const RegisterPageComponent = () => (
  <AuthLayout imageUrl="https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
    <h2 className="font-bold text-2xl text-[#002D74]">Registrarse</h2>
    <p className="text-xs mt-4 text-[#002D74]">
      Crea tu cuenta.
    </p>
    <RegisterForm />
  </AuthLayout>
);

export default RegisterPageComponent;
