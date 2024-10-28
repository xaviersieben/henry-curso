import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import Appointments from "./views/Appointments/Appointments";
import CreateAppointmentForm from "./views/Appointments/CreateAppointment";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

function App() {
  const user = useSelector((state) => state.user.userData, shallowEqual);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />

        <Route
          path="/create-appointment"
          element={
            user ? (
              <CreateAppointmentForm user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirige cualquier ruta no existente a la página de inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
