import AuthLayout from "@/components/AuthLayout/AuthLayout";
import LoginForm from "@/components/LoginForm/LoginForm";

const LoginPageComponent = () => (
  <AuthLayout imageUrl="https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg">
    <h2 className="font-bold text-2xl text-[#002D74]">Iniciar Sesión</h2>
    <p className="text-xs mt-4 text-[#002D74]">
      Accede a tu cuenta fácilmente.
    </p>
    <LoginForm />
  </AuthLayout>
);

export default LoginPageComponent;
