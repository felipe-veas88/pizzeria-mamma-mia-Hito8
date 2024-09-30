import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../components/useUser";

function Navbar() {
  const [total, setTotal] = useState(0);
  const { token, logout } = useUser();
  const navigate = useNavigate();
  const loadTotal = () => {
    const savedTotal = localStorage.getItem("total");
    if (savedTotal) {
      setTotal(Number(savedTotal));
    }
  };

  useEffect(() => {
    loadTotal();

    const handleStorageChange = (e) => {
      if (e.key === "total") {
        loadTotal();
      }
    };

    const handleCustomTotalUpdate = () => {
      loadTotal();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartTotalUpdated", handleCustomTotalUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartTotalUpdated", handleCustomTotalUpdate);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>{" "}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cart">🛒 Total: ${total / 100}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
