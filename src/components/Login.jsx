import { useState } from "react";
import { useUser } from "../components/useUser"; // Adjust import as needed
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";

const Login = () => {
  const { login, error } = useUser(); // Access login and error state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!email || !password) {
      setMessage("Ambos campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setMessage(""); // Clear previous messages

    // Attempt to log in
    await login(email, password);
    if (!error) {
      // Redirect to profile on successful login
      navigate("/profile");
    } else {
      setMessage("Error al iniciar sesión. Intente nuevamente.");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {error && (
        <p className="form-message" style={{ color: "red" }}>
          {error}
        </p>
      )}{" "}
      {/* Show error message */}
    </div>
  );
};

export default Login;
