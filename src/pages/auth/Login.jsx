import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, selectAuth } from "../../redux/slices/authSlice";

import "../../assets/css/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, error } = useSelector(selectAuth);

  // console.log('User object:', user.estado);

  // let loading, error;

  const [credentials, setCredentials] = useState({
    per_login: "48626692",
    password: "123456789",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        navigate("/dashboard"); // Redirigir a la página deseada después del inicio de sesión
      })
      .catch(() => {
        // Manejar errores aquí si es necesario
      });
  };

  useEffect(() => {
    if (user) {
      const { from } = location.state || { from: { pathname: "/dashboard" } };
      navigate(from.pathname);
    }
  }, [user, location.state, navigate]);

  // const handleLogin = () => {
  //   dispatch(login({ username: "user" }));
  //   const { from } = location.state || { from: { pathname: "/dashboard" } };
  //   navigate(from.pathname);
  // };

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
                <input type="checkbox" />
                Recordarme
              </label>
              <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit" disabled={loading}
              onClick={handleSubmit}
              className="login-button"
            >
              {loading ? 'Logging in...' : 'Login'}
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
    </div>
  );
};

export default Login;
