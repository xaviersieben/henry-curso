import Link from "next/link";

const RegisterLink = () => (
  <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
    <p>¿No tienes cuenta?</p>
    <Link
      href="/register"
      className="py-2 px-5 bg-green-300 border rounded-xl hover:scale-110 duration-300"
    >
      Regístrate
    </Link>
  </div>
);

export default RegisterLink;
