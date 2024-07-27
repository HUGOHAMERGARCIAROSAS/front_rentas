import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, selectAuth } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../assets/css/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useSelector(selectAuth);

  const [credentials, setCredentials] = useState({
    per_login: "",
    password: ""
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setCredentials({ ...credentials, per_login: savedUsername });
      setRememberMe(true);
    }
    console.log(credentials);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginPromise = dispatch(loginUser(credentials)).unwrap();

      toast.promise(
        loginPromise,
        {
          pending: "Iniciando sesión...",
          success: "¡Inicio de sesión exitoso!",
          error: "Error al iniciar sesión",
        },
        {
          position: "top-center",
        }
      );

      await loginPromise;

      if (rememberMe) {
        localStorage.setItem("username", credentials.per_login);
      } else {
        localStorage.removeItem("username");
      }

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Usuario no encontrado o credenciales incorrectas.");
      } else {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const { from } = location.state || { from: { pathname: "/dashboard" } };
      navigate(from.pathname);
    }
  }, [user, location.state, navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-content">
          <img src="/images/login/mdvlh.png" />
          <h1>INICIAR SESIÓN</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Usuario"
                className="input"
                name="per_login"
                value={credentials.per_login}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Contraseña"
                className="input"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                Recordarme
              </label>
              <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="login-button"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      <div className="login-image">
        <div className="overlay">
          <h2>Sistema de Administración Tributaria</h2>
          <p className="login-description">
            El Servicio de Administración Tributaria tiene la responsabilidad de
            aplicar la legislación fiscal con el fin de que las personas físicas
            y morales contribuyan proporcional y equitativamente al gasto
            público, de fiscalizar a los contribuyentes para que cumplan con las
            disposiciones tributarias, de facilitar e incentivar el cumplimiento
            voluntario de dichas disposiciones, y de generar y proporcionar la
            información necesaria para el diseño y la evaluación de la política
            tributaria.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
